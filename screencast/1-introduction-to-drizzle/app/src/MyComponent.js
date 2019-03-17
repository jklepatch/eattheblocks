import React from 'react';
import { 
  AccountData, 
  ContractData,
  ContractForm
} from 'drizzle-react-components';

const MyComponent = () => (
  <div>
    <h2>Balance of first account</h2>
    <AccountData accountIndex={0} units={"ether"} precision={3} />

    <h2>getData()</h2>
    <ContractData contract="Storage" method="getData" />

    <h2>setData()</h2>
    <ContractForm 
      contract="Storage" 
      method="setData" 
      labels={['new value of `data`']} />

  </div>
);

export default MyComponent;
