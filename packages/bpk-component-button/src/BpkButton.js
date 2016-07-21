import React, { PropTypes } from 'react'
import './bpk-button.scss'

const BpkButton = ({ children, disabled, href, submit, secondary, selected, large, link, onClick }) => {
  const classNames = [ 'bpk-button' ]

  secondary ? classNames.push('bpk-button--secondary') : null
  selected ? classNames.push('bpk-button--selected') : null
  large ? classNames.push('bpk-button--large') : null
  link ? classNames.push('bpk-button--link') : null

  const className = classNames.join(' ')

  if (href) {
    return <a
      href={href}
      className={className}
      children={children}
      onClick={onClick}
    />
  }

  return <button
    type={submit ? 'submit' : 'button'}
    disabled={disabled}
    className={className}
    children={children}
    onClick={onClick}
  />
}

BpkButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string,
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
  disabled: false,
  submit: false,
  secondary: false,
  selected: false,
  large: false,
  link: false,
  onClick: null
}

export default BpkButton
