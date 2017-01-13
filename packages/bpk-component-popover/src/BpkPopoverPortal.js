import Tether from 'tether';
import Portal from 'react-portal';
import focusStore from 'a11y-focus-store';
import focusScope from 'a11y-focus-scope';
import { toPortalChild } from 'bpk-react-utils';
import React, { PropTypes, Component } from 'react';

import './bpk-popover.scss';
import BpkPopover from './BpkPopover';

const BpkPopoverPortalChild = toPortalChild(BpkPopover);

class BpkPopoverPortal extends Component {
  constructor() {
    super();

    this.tether = null;

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.beforeClose = this.beforeClose.bind(this);
    this.getTargetRef = this.getTargetRef.bind(this);
  }

  onClose() {
    if (this.props.isOpen) {
      this.props.onClose();
    }
  }

  onOpen(popoverElement) {
    this.initTether(popoverElement);

    focusStore.storeFocus();
    focusScope.scopeFocus(popoverElement);
  }

  getTargetRef(ref) {
    this.targetElement = ref;
  }

  beforeClose(popoverElement, removeFromDOM) {
    this.destroyTether();
    focusScope.unscopeFocus();
    focusStore.restoreFocus();
    removeFromDOM();
  }

  destroyTether() {
    this.tether.destroy();
    this.tether = null;
  }

  initTether(popoverElement) {
    this.tether = new Tether({
      classPrefix: 'bpk-popover-tether',
      element: popoverElement,
      target: this.targetElement,
      ...this.props.tetherOptions,
    });

    this.tether.position();
  }

  render() {
    const { target, isOpen, ...rest } = this.props;

    delete rest.onClose;
    delete rest.tetherOptions;

    return (
      <div className="bpk-popover-target" ref={this.getTargetRef}>
        {target}
        <Portal
          isOpened={isOpen}
          onClose={this.onClose}
          onOpen={this.onOpen}
          beforeClose={this.beforeClose}
          closeOnEsc
          closeOnOutsideClick
        >
          <BpkPopoverPortalChild onClose={this.onClose} {...rest} />
        </Portal>
      </div>
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
