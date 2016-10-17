import React, { PropTypes } from 'react'
import './bpk-button.scss'

const BpkButton = (props) => {
  const classNames = [ 'bpk-button' ]

  props.secondary ? classNames.push('bpk-button--secondary') : null
  props.selected ? classNames.push('bpk-button--selected') : null
  props.large ? classNames.push('bpk-button--large') : null
  props.link ? classNames.push('bpk-button--link') : null
  props.className ? classNames.push(props.className) : null

  const className = classNames.join(' ')

  if (props.href) {
    return <a
      href={props.href}
      className={className}
      children={props.children}
      onClick={props.onClick}
    />
  }

  return <button
    type={props.submit ? 'submit' : 'button'}
    disabled={props.disabled}
    className={className}
    children={props.children}
    onClick={props.onClick}
  />
}

BpkButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  submit: PropTypes.bool,
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  large: PropTypes.bool,
  link: PropTypes.bool,
  onClick: PropTypes.func
}

BpkButton.defaultProps = {
  href: null,
  className: null,
  disabled: false,
  submit: false,
  secondary: false,
  selected: false,
  large: false,
  link: false,
  onClick: null
}

export default BpkButton
