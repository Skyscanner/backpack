import { Portal } from 'bpk-react-utils';
import React, { PropTypes } from 'react';

import BpkModalScrim from './BpkModalScrim';
import BpkModalDialog from './BpkModalDialog';

const BpkModal = (props) => {
  const { isOpen, onClose, ...rest } = props;

  delete rest.onClose;

  return (
    <Portal isOpen={isOpen} onClose={onClose}>
      <div>
        <BpkModalScrim />
        <BpkModalDialog onClose={onClose} {...rest} />
      </div>
    </Portal>
  );
};

BpkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BpkModal;
