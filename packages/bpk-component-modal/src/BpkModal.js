import { Portal } from 'bpk-react-utils';
import React, { PropTypes } from 'react';

import BpkModalScrim from './BpkModalScrim';
import BpkModalDialog from './BpkModalDialog';

const BpkModal = (props) => {
  const { isOpen, onClose, target, ...rest } = props;

  delete rest.onClose;

  return (
    <Portal isOpen={isOpen} onClose={onClose} target={target}>
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
  target: PropTypes.element,
};

BpkModal.defaultProps = {
  target: null,
};

export default BpkModal;
