import React from 'react'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      accountAddress: null,
      todoAddress: null
    };
  };

  async componentDidMount(){
    const [ accountAddress ] = await this.props.web3.eth.getAccounts();
    const { address: todoAddress } = this.props.todo;
    this.setState({ accountAddress, todoAddress });
  }

  render() {
    return <div>{this.state.accountAddress}, {this.state.todoAddress}</div>;
  }
};

export default App;