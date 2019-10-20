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
    await voting.addVoters([voter1, voter2, voter3], {from: admin});
    const result1 = await voting.voters(voter1);
    const result2 = await voting.voters(voter2);
    const result3 = await voting.voters(voter3);
    assert(result1 === true);
    assert(result2 === true);
    assert(result3 === true);
  });

  it('should create ballot', async () => {
    await voting.createBallot(
      'ballot1',
      ['choice1', 'choice2', 'choice3'], 
      5, 
      {from: admin}
    );
    //ballots mapping is not public, we cant check that ballot was actually created :(
  });

  it('should NOT let non-admin create ballot', async () => {
    await expectRevert(
      voting.createBallot(
        'Ballot2',
        ['choice1', 'choice2', 'choice3'], 
        10, 
        {from: nonVoter}
      ),
      'only admin'
    );
  });

  it('should NOT let non-voters vote', async () => {
    await voting.createBallot(
      'Ballot2',
      ['choice1', 'choice2', 'choice3'], 
      10, 
      {from: admin}
    );
    await expectRevert(
      voting.vote(1, 1, {from: nonVoter}),
      'only voters can vote'
    );
  });

  it('should NOT let voters vote after end of ballot', async () => {
    await voting.createBallot(
      'Ballot3',
      ['choice1', 'choice2', 'choice3'], 
      1, 
      {from: admin}
    );
    await time.increase(1001);
    await expectRevert(
     voting.vote(2, 1, {from: voter1}),
      'can only vote until ballot end date'
    );
  });

  it('should NOT let voters vote twice', async () => {
    await voting.createBallot(
      'Ballot4',
      ['choice1', 'choice2', 'choice3'], 
      2, 
      {from: admin}
    );
    await voting.vote(3, 1, {from: voter1});
    await expectRevert(
      voting.vote(3, 1, {from: voter1}),
      'voter can only vote once for a ballot'
    );
  });

  it('should vote', async () => {
    await voting.createBallot(
      'Ballot5',
      ['choice1', 'choice2', 'choice3'], 
      2, 
      {from: admin}
    );
    await voting.vote(4, 1, {from: voter1});
    await voting.vote(4, 1, {from: voter2});
    await voting.vote(4, 2, {from: voter3});
    await time.increase(2001);
    const result = await voting.results(4);
    assert(result[1].votes === '2');
    assert(result[2].votes === '1');
  });
});
