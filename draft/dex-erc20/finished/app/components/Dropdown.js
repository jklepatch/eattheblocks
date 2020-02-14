import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownVisible: false
    };
  }

  toggleDropdown = () => {
    this.setState({dropdownVisible: !this.state.dropdownVisible});
  }

  selectItem = (item) => {
    this.setState({dropdownVisible: !this.state.dropdownVisible});
    this.props.onSelect(item);
  }

  render() {
    const { className, items, activeItem } = this.props;
    const { dropdownVisible } = this.state;

    return (
      <div className={`dropdown ${className}`}>
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button" 
          onClick={this.toggleDropdown}
        >
          {activeItem.label}
        </button>
        <div className={`dropdown-menu ${dropdownVisible ? 'visible' : ''}`}>
          {items && items.map((item, i) => ( 
            <a 
              className={`dropdown-item ${item.value == activeItem.value ? 'active' : null}`} 
              href="#"
              key={i}
              onClick={() => this.selectItem(item.value)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.string,
  items: PropTypes.array,
  activeItem: PropTypes.object,
  onSelect: PropTypes.func,
  className: PropTypes.string
};

export default Dropdown;
