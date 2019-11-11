import React, { useState, useEffect } from 'react';
import withBlockchain from './withBlockchain.js';

function TokenMetadata({drizzle, drizzleState}) {
  const [nameKey, setNameKey] = useState(undefined);
  const [symbolKey, setSymbolKey] = useState(undefined);
  const [decimalsKey, setDecimalsKey] = useState(undefined);
  const [supplyKey, setSupplyKey] = useState(undefined);
  let name, supply, result;

  useEffect(() => {
    const nameKey = drizzle.contracts.ERC20Token.methods.name.cacheCall();
    const symbolKey = drizzle.contracts.ERC20Token.methods.symbol.cacheCall();
    const decimalsKey = drizzle.contracts.ERC20Token.methods.decimals.cacheCall();
    const supplyKey = drizzle.contracts.ERC20Token.methods.totalSupply.cacheCall();
    setNameKey(nameKey);
    setSymbolKey(symbolKey);
    setDecimalsKey(decimalsKey);
    setSupplyKey(supplyKey);
  });

  result = nameKey && drizzleState.contracts.ERC20Token.name[nameKey];
  name = result && result.value;

  result = supplyKey && drizzleState.contracts.ERC20Token.totalSupply[supplyKey];
  supply = result && result.value;

  return (
    <ul>
      <li>Name: {name}</li>
      <li>Total supply: {supply && supply.toString()} tokens</li>
    </ul>
  );
}


export default withBlockchain(TokenMetadata);
