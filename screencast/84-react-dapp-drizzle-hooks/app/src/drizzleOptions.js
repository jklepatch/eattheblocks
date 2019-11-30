import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import ComplexStorage from "./contracts/ComplexStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [SimpleStorage, ComplexStorage, TutorialToken],
  events: {
    SimpleStorage: ["StorageSet"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
