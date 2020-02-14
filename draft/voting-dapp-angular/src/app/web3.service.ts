//import {Observable} from 'rxjs/Observable';
//import * as Web3 from 'web3';
import Web3 from 'web3';
import { Injectable } from '@angular/core';
import EventFactoryArtifact from '../../build/contracts/EventFactory.json';

@Injectable()
export class Web3Service {
  private accounts;
  private web3;
  private eventFactory;
  public ready;

  constructor() {
    this.setWeb3Provider();
    this.ready = new Promise(async(resolve, reject) => {
      if(typeof this.accounts !== 'undefined') return resolve(undefined);
      try {
        this.accounts = await this.web3.eth.getAccounts();
        resolve(undefined);
      } catch(_e) {
        reject();
      }
    });
  }

  private setWeb3Provider(): any {
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3('http://localhost:9545');
      this.eventFactory = this.getContract(EventFactoryArtifact);
    }
  }

  private getContract(artifact): any { 
    const networks = Object.keys(artifact.networks);
    const network = networks[networks.length - 1];
    const { address } = artifact.networks[network];
    return new this.web3.eth.Contract(artifact.abi, address);
  }

  createEvent(name: string, description: string): any {
    return this.eventFactory.methods
      .createEvent(name, description)
      .send({from: this.accounts[0], gas: 400000});
  }

  getEvents(): any {
    return this.eventFactory.methods
      .getEvents()
      .call({from: this.accounts[0]});
  }

  getEvent(): any {
    //return this.eventFactory.methods
    //  .getEvent()
    //  .call({from: this.accounts[0]});
  }

  getVotes(): any {}
}
