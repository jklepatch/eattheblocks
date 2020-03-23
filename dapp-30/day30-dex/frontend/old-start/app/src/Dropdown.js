import React from 'react';

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
          <a 
            className={`dropdown-item ${item.value == activeItem.value ? 'active' : null}`} 
            href="#"
            key={i}
            onClick={() => selectItem(item.value)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
