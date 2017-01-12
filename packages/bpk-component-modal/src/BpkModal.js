import Portal from 'react-portal';
import React, { PropTypes } from 'react';

import BpkModalScrim from './BpkModalScrim';
import BpkModalDialog from './BpkModalDialog';

const PortalToBpkModal = (props) => {
  /* eslint-disable no-unused-vars */
  const { closePortal, ...rest } = props;
  /* eslint-enable */

  return (
    <div>
      <BpkModalScrim />
      <BpkModalDialog {...rest} />
    </div>
  );
};

PortalToBpkModal.propTypes = {
  closePortal: PropTypes.func,
};

const BpkModal = (props) => {
  const { isOpen, onClose, ...rest } = props;

  return (
    <Portal isOpened={isOpen} onClose={onClose} closeOnEsc>
      <PortalToBpkModal onClose={onClose} {...rest} />
    </Portal>
  );
};

BpkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BpkModal;
