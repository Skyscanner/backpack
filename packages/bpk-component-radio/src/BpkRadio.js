import React, { PropTypes } from 'react'

import './bpk-radio.scss'

const BpkRadio = (props) => {
  const classNames = [ 'bpk-radio' ]

  props.disabled ? classNames.push('bpk-radio--disabled') : null

  return (
    <label className={classNames.join(' ')}>
      <input
        type='radio'
        className='bpk-radio__input'
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

BpkRadio.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
}

BpkRadio.defaultProps = {
  id: null,
  label: null,
  value: null,
  checked: false,
  disabled: false
}

export default BpkRadio
