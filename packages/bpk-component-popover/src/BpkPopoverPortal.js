import focusStore from 'a11y-focus-store';
import focusScope from 'a11y-focus-scope';
import { Portal } from 'bpk-react-utils';
import React, { PropTypes, Component } from 'react';
import Tether, { getArrowPositionCallback } from 'bpk-tether';

import './bpk-popover.scss';
import BpkPopover from './BpkPopover';
import { ARROW_ID } from './constants';

class BpkPopoverPortal extends Component {
  constructor() {
    super();

    this.tether = null;

    this.onOpen = this.onOpen.bind(this);
    this.beforeClose = this.beforeClose.bind(this);
  }

  onOpen(popoverElement, targetElement) {
    this.tether = new Tether({
      classPrefix: 'bpk-popover-tether',
      element: popoverElement,
      target: targetElement,
      ...this.props.tetherOptions,
    });

    this.tether.on('position', getArrowPositionCallback(popoverElement, ARROW_ID, 'bpk-popover-tether'));

    this.tether.position();
    // setTimeout(() => {
    //   this.tether.position();
    // });

    focusStore.storeFocus();
    focusScope.scopeFocus(popoverElement);
  }

  beforeClose(done) {
    this.tether.destroy();
    this.tether = null;

    focusScope.unscopeFocus();
    focusStore.restoreFocus();

    done();
  }

  render() {
    const { target, isOpen, onClose, ...rest } = this.props;

    delete rest.onClose;
    delete rest.tetherOptions;

    return (
      <Portal
        target={target}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
      >
        <BpkPopover onClose={onClose} {...rest} />
      </Portal>
    );
  }
}

BpkPopoverPortal.propTypes = {
  target: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tetherOptions: PropTypes.shape({
    attachment: PropTypes.string,
    targetAttachment: PropTypes.string,
    offset: PropTypes.string,
    constraints: PropTypes.array,
  }),
};

BpkPopoverPortal.defaultProps = {
  tetherOptions: {
    attachment: 'top center',
    constraints: [
      {
        to: 'window',
        attachment: 'together',
        pin: true,
      },
    ],
  },
};

export default BpkPopoverPortal;
