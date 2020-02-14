import PropTypes from 'prop-types';
import React, { Component } from 'react'; 
import Dropdown from '../components/Dropdown';

class Header extends Component {
  formatAccount(account, i) {
    return `(${i}) ${account && account.slice(0, 8)}...`;
  }

  renderAccounts() {
    const { user, selection, selectAccount } = this.props;
    return (
      <Dropdown 
        items={user.accounts.map((account, i) => ({
          label: this.formatAccount(account, i),
          value: account
        }))} 
        activeItem={{
          label: this.formatAccount(
            selection.account, 
            user.accounts.indexOf(selection.account)), 
          value: selection.account
        }}
        onSelect={selectAccount}
      />
    );
  }

  renderTokens() {
    const { tokens, selection, selectToken } = this.props;

    return (
      <Dropdown 
        className="ml-3"
        items={tokens.map((token) => ({
          label: token.symbol,
          value: token
        }))} 
        activeItem={{
          label: selection.token.symbol,
          value: selection.token
        }}
        onSelect={selectToken}
      />
    );
  }

  render() {
    const { contracts } = this.props;

    return (
      <header id="header" className="card">
        <div className="row">
          <div className="col-sm-3 flex">
            {this.renderAccounts()}
            {this.renderTokens()}
          </div>
          <div className="col-sm-9">
            <h1 className="header-title">
              DimDex - <span className="contract-address">Contract address: <span className="address">{contracts.dex.options.address}</span></span>
            </h1>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  contracts: PropTypes.object,
  tokens: PropTypes.array,
  user: PropTypes.object,
  selection: PropTypes.object,
  selectAccount: PropTypes.func.isRequired,
  selectToken: PropTypes.func.isRequired,
};

export default Header;
