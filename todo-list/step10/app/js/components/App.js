import React from 'react'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      accounts: [],
      address: null,
    };
  }

  async componentDidMount(){
    const { accounts, todo } = this.props;
    const { address } = todo;
    this.setState({ accounts, address });
  }

  render() {
    return <div>{this.state.accounts[0]}, {this.state.address}</div>;
  }
}

export default App;