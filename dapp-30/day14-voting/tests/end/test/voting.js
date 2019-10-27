const { expectRevert, time } = require('@openzeppelin/test-helpers');
const Voting = artifacts.require('Voting');

contract('Voting', (accounts) => {
  let voting = null;
  const admin = accounts[0];
  const voter1 = accounts[1];
  const voter2 = accounts[2];
  const voter3 = accounts[3];
  const nonVoter = accounts[4];
  before(async () => {
    voting = await Voting.deployed();
  });

  it('should add voters', async () => {
    await voting.addVoters([voter1, voter2, voter3]);
    const results = await Promise.all(
      [voter1, voter2, voter3].map(voter =>
        voting.voters(voter)
      )
    );
    results.forEach(result => assert(result === true));
  });

  it('should create a new ballot', async () => {
    await voting.createBallot(
      'Ballot 1',
      ['Choice 1', 'Choice 2', 'Choice 3'],
      5,
      {from: admin}
    );
    const ballot = await voting.ballots(0);
    assert(ballot.name === 'Ballot 1');
  });

  it('should NOT create a new ballot if not admin', async () => {
    await expectRevert(
      voting.createBallot(
        'Ballot 2',
        ['Choice 1', 'Choice 2', 'Choice 3'],
        5,
        {from: voter1}
      ),
      'only admin'
    );
  });

  it('should NOT vote if not a voter', async () => {
    await voting.createBallot(
      'Ballot 3',
      ['Choice 1', 'Choice 2', 'Choice 3'],
      5,
      {from: admin}
    );
    await expectRevert(
      voting.vote(1, 0, {from: nonVoter}),
      'only voters can vote'
    );
  });

  it('should NOT vote after ballot end', async () => {
    await voting.createBallot(
      'Ballot 4',
      ['Choice 1', 'Choice 2', 'Choice 3'],
      5,
      {from: admin}
    );
    await time.increase(5001);
    await expectRevert(
      voting.vote(2, 0, {from: voter1}),
      'can only vote until ballot end date'
    );
  });

  it('should vote', async () => {
    await voting.createBallot(
      'Ballot 5',
      ['Choice 1', 'Choice 2', 'Choice 3'],
      5,
      {from: admin}
    );
    await voting.vote(3, 0, {from: voter1}),
    await voting.vote(3, 0, {from: voter2}),
    await voting.vote(3, 1, {from: voter3}),
    await time.increase(5001);
    const results = await voting.results(3); 
    assert(results[0].votes === '2');
    assert(results[1].votes === '1');
    assert(results[2].votes === '0');
  });
});
