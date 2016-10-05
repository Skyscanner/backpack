import React, { PropTypes } from 'react'
import CloseIcon from 'bpk-component-icon/sm/close'
import { withButtonAlignment } from 'bpk-component-icon'

const CloseButtonIcon = withButtonAlignment(CloseIcon)

const BpkModalCloseButton = (props) => (
  <button
    type='button'
    title={props.label}
    onClick={props.onClick}
    aria-label={props.label}
    className='bpk-modal__dialog-close-button'
  >
    <CloseButtonIcon className='bpk-modal__dialog-close-icon' />
  </button>
)

BpkModalCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string
}

BpkModalCloseButton.defaultProps = {
  label: null
}

export default BpkModalCloseButton
