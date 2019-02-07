import Web3 from 'web3';
const votes = [
    {name: 'Increase shareholder dividends', voteFor: 10, voteAgainst: 2, finished: true}, 
    {name: 'Launch new product', voteFor: 2, voteAgainst: 1, finished: false}
];

export class Web3Service { 
  constructor() {
    //web3 = new Web3('http://localhost:9545');
  }

  newVote() {
  }

  getVotes() {
    return votes;
  }

  vote() {
    //@TODO
  }
}
