import React, { PropTypes } from 'react'

import './bpk-select.scss'

const BpkSelect = ({ name, value, onChange, options, disabled }) => {
  return (
    <select className='bpk-select' name={name} value={value} onChange={onChange} disabled={disabled}>
      {options.map((option) =>
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.name}
        </option>
      )}
    </select>
  )
}

BpkSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ),
  disabled: PropTypes.bool
}

BpkSelect.defaultProps = {
  disabled: false
}

export default BpkSelect
