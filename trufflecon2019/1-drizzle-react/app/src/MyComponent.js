import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";

const addr = '0x2cfb04529afed0ceeb3e7518130e1843276c829b'

export default () => (
  <div className="App">
    <ToastContainer />
    <h1>Drizzle Event Example - React</h1>

    <div className="section">
      <h2>ERC20 Token</h2>
      <div>
        <strong>Balance of {addr}: </strong>
        <ContractData 
          contract="ERC20Token" 
          method="balanceOf" 
          methodArgs={[addr]} />
      </div>
      <div>
        <strong>Transfer</strong>
        <ContractForm 
          contract="ERC20Token" 
          method="transfer" />
      </div>
    </div>
  </div>
);
