import { Component } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html'
})
export class VotesComponent {
  //votes = [
  //  {name: 'Increase shareholder dividends', voteFor: 10, voteAgainst: 2, finished: true}, 
  //  {name: 'Launch new product', voteFor: 2, voteAgainst: 1, finished: false}
  //]

  votes = []

  constructor(private web3Service: Web3Service) {}

  onNgInit() {
    this.votes = this.web3Service.getVotes();
  }

}
