import Portal from 'react-portal'
import React, { PropTypes } from 'react'

import BpkModalScrim from './BpkModalScrim'
import BpkModalDialog from './BpkModalDialog'

const PortalToBpkModal = ({ closePortal, ...rest }) => (
  <div>
    <BpkModalScrim />
    <BpkModalDialog onClose={closePortal} {...rest} />
  </div>
)

const BpkModal = ({ isOpen, onClose, ...rest }) => (
  <Portal isOpened={isOpen} onClose={onClose} closeOnEsc>
    <PortalToBpkModal {...rest} />
  </Portal>
)

BpkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default BpkModal
