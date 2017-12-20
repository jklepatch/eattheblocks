pragma solidity ^0.4.4;

contract Parent {
  string parentVar = "parentVar";
}

contract Kid1 is Parent {
  string kid1Var = "kid1Var";
}

contract Kid2 is Parent {
  string kid2Var = "kid2Var";
}

contract MyContract is Kid1, Kid2 {
  string myContractVar = "myContractVar";

  function getMyContractVar() constant returns(string) {
    return myContractVar;
  }

  function getKid1Var() constant returns(string) {
    return kid1Var;
  }

  function getKid2Var() constant returns(string) {
    return kid2Var;
  }

  function getParentVar() constant returns(string) {
    return parentVar;
  }
}
