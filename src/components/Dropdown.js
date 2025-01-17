import React from 'react';
import './Dropdown.css';

function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="dropdown">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;

