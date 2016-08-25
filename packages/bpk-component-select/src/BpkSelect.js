import React, { PropTypes } from 'react'

import './bpk-select.scss'

const BpkSelect = ({ id, name, value, onChange, options, valid, disabled }) => {
  const classNames = [ 'bpk-select' ]

  valid === false ? classNames.push('bpk-select--invalid') : null

  return (
    <select className={classNames.join(' ')} id={id} name={name} value={value} onChange={onChange} disabled={disabled}>
      {options.map((option) =>
        <option
          key={option.value}
          value={option.value}
          hidden={option.hidden}
          disabled={option.disabled}
        >{option.name}</option>
      )}
    </select>
  )
}

BpkSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      hidden: PropTypes.bool,
      disabled: PropTypes.bool
    })
  ),
  valid: PropTypes.bool,
  disabled: PropTypes.bool
}

BpkSelect.defaultProps = {
  valid: null,
  disabled: false
}

export default BpkSelect
