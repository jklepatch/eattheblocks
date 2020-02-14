import * as React from "react";
import * as ReactDOM from "react-dom";
import * as eth from './ethereum';

import App from "./App";

ReactDOM.render(
  <App web3={eth.web3} todo={eth.todo} />,
  document.getElementById("app")
);
