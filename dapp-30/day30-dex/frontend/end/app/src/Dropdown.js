import React, { useState } from 'react';

function Dropdown({onSelect, activeItem, items, className}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const selectItem = (item) => {
    setDropdownVisible(!dropdownVisible);
    onSelect(item);
  }

  return (
    <div className={`dropdown ${className}`}>
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        onClick={toggleDropdown}
      >
        {activeItem.label}
      </button>
      <div className={`dropdown-menu ${dropdownVisible ? 'visible' : ''}`}>
        {items && items.map((item, i) => ( 
          <button 
            className={`dropdown-item ${item.value === activeItem.value ? 'active' : null}`} 
            key={i}
            onClick={() => selectItem(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
