import Tether from 'tether';
import focusStore from 'a11y-focus-store';
import focusScope from 'a11y-focus-scope';
import { Portal } from 'bpk-react-utils';
import React, { PropTypes, Component } from 'react';

import './bpk-popover.scss';
import BpkPopover from './BpkPopover';

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

    if (this.props.fullScreenOnMobile) {
      popoverElement.classList.add('bpk-popover-tether-element--full-screen-on-mobile');
    }

    this.tether.position();

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
    const { target, isOpen, onClose, fullScreenOnMobile, ...rest } = this.props;

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
        <BpkPopover onClose={onClose} fullScreenOnMobile={fullScreenOnMobile} {...rest} />
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
  fullScreenOnMobile: PropTypes.bool,
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
  fullScreenOnMobile: false,
};

export default BpkPopoverPortal;
