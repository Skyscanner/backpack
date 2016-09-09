import React, { PropTypes } from 'react'

import './bpk-checkbox.scss'

const BpkCheckbox = (props) => {
  const classNames = [ 'bpk-checkbox' ]

  props.disabled ? classNames.push('bpk-checkbox--disabled') : null

  return (
    <label className={classNames.join(' ')}>
      <input
        type='checkbox'
        className='bpk-checkbox__input'
        name={props.name}
        onChange={props.onChange}
        id={props.id}
        value={props.value || props.name}
        checked={props.checked}
        disabled={props.disabled}
      />
      {props.label ? ` ${props.label}` : null}
    </label>
  )
}

BpkCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
}

BpkCheckbox.defaultProps = {
  id: null,
  label: null,
  value: null,
  checked: false,
  disabled: false
}

export default BpkCheckbox
