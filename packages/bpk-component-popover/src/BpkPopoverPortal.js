import focusStore from 'a11y-focus-store';
import focusScope from 'a11y-focus-scope';
import { Portal } from 'bpk-react-utils';
import React, { PropTypes, Component } from 'react';

import './bpk-popover.scss';
import BpkPopover from './BpkPopover';
import Tether from './TetherWrapper';
import { ARROW_ID } from './constants';

// For compat with various IE browsers who haven't implemented classList yet.
// See http://youmightnotneedjquery.com/#has_class.
const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }

  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
};

const getArrowPositionCallback = (popoverElement = {}) => {
  let arrowElement = null;

  if (popoverElement.querySelector) {
    arrowElement = popoverElement.querySelector(`#${ARROW_ID}`);
  }

  if (arrowElement === null) {
    return () => null;
  }

  return (props) => {
    const { top, left, targetPos } = props;

    const shouldApplyLeftOffset =
      hasClass(popoverElement, 'bpk-popover-tether-element-attached-top')
      || hasClass(popoverElement, 'bpk-popover-tether-element-attached-bottom');

    if (shouldApplyLeftOffset) {
      const leftOffset = (targetPos.left + (targetPos.width / 2)) - left;

      arrowElement.style.top = '';
      arrowElement.style.left = `${leftOffset}px`;
    } else {
      const topOffset = (targetPos.top + (targetPos.height / 2)) - top;

      arrowElement.style.top = `${topOffset}px`;
      arrowElement.style.left = '';
    }
  };
};

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

    this.tether.on('position', getArrowPositionCallback(popoverElement));

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
