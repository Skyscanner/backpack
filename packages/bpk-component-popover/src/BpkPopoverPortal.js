import focusStore from 'a11y-focus-store';
import focusScope from 'a11y-focus-scope';
import { Portal } from 'bpk-react-utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tether, { getArrowPositionCallback, applyRTLTransforms } from 'bpk-tether';

import './bpk-popover.scss';
import BpkPopover from './BpkPopover';
import { ARROW_ID } from './constants';

const onOpen = (popoverElement) => {
  focusStore.storeFocus();
  focusScope.scopeFocus(popoverElement);
};

class BpkPopoverPortal extends Component {
  constructor() {
    super();

    this.tether = null;

    this.onRender = this.onRender.bind(this);
    this.beforeClose = this.beforeClose.bind(this);
  }

  onRender(popoverElement, targetElement) {
    this.position(popoverElement, targetElement);
  }

  beforeClose(done) {
    this.tether.destroy();
    this.tether = null;

    focusScope.unscopeFocus();
    focusStore.restoreFocus();

    done();
  }

  position(popoverElement, targetElement) {
    const options = {
      classPrefix: 'bpk-popover-tether',
      element: popoverElement,
      target: targetElement,
      ...applyRTLTransforms(this.props.tetherOptions),
    };

    if (!this.tether) {
      this.tether = new Tether(options);
      this.tether.on('position', getArrowPositionCallback(popoverElement, ARROW_ID, 'bpk-popover-tether'));
    } else {
      this.tether.setOptions(options);
    }

    this.tether.position();
  }

  render() {
    const {
      target,
      isOpen,
      onClose,
      portalStyle,
      portalClassName,
      ...rest
    } = this.props;

    const classNames = ['bpk-popover-portal'];

    if (portalClassName) { classNames.push(portalClassName); }

    delete rest.onClose;
    delete rest.tetherOptions;

    return (
      <Portal
        target={target}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onRender={this.onRender}
        beforeClose={this.beforeClose}
        style={portalStyle}
        className={classNames.join(' ')}
      >
        <BpkPopover onClose={onClose} {...rest} />
      </Portal>
    );
  }
}

BpkPopoverPortal.propTypes = {
  target: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tetherOptions: PropTypes.shape({
    attachment: PropTypes.string,
    targetAttachment: PropTypes.string,
    offset: PropTypes.string,
    constraints: PropTypes.array,
  }),
  portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  portalClassName: PropTypes.string,
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
  portalStyle: null,
  portalClassName: null,
};

export default BpkPopoverPortal;
