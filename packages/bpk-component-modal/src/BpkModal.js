import Portal from 'react-portal';
import React, { PropTypes, Component } from 'react';
import { toPortalChild } from 'bpk-react-utils';

import BpkModalScrim from './BpkModalScrim';
import BpkModalDialog from './BpkModalDialog';

const BpkModalChild = toPortalChild(props => (
  <div>
    <BpkModalScrim />
    <BpkModalDialog {...props} />
  </div>
));

class BpkModal extends Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    if (this.props.isOpen) {
      this.props.onClose();
    }
  }
  render() {
    const { isOpen, ...rest } = this.props;

    delete rest.onClose;

    return (
      <Portal isOpened={isOpen} onClose={this.onClose} closeOnEsc>
        <BpkModalChild onClose={this.onClose} {...rest} />
      </Portal>
    );
  }
}

BpkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BpkModal;
