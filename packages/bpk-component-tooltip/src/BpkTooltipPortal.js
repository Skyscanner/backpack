import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Portal } from 'bpk-react-utils';
import Tether, { getArrowPositionCallback, applyRTLTransforms } from 'bpk-tether';

import BpkTooltip from './BpkTooltip';
import { ARROW_ID } from './constants';

const hasTouchSupport = () => !!(
  (typeof window !== 'undefined') &&
    (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch))
);

class BpkTooltipPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.tether = null;
    this.targetRef = null;

    this.onOpen = this.onOpen.bind(this);
    this.openTooltip = this.openTooltip.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
  }

  componentDidMount() {
    if (this.targetRef) {
      this.targetRef.addEventListener('mouseenter', this.openTooltip);
      this.targetRef.addEventListener('mouseleave', this.closeTooltip);
    }
  }

  componentWillUnmount() {
    if (this.targetRef) {
      this.targetRef.removeEventListener('mouseenter', this.openTooltip);
      this.targetRef.removeEventListener('mouseleave', this.closeTooltip);
    }
  }

  onOpen(tooltipElement, targetElement) {
    this.tether = new Tether({
      classPrefix: 'bpk-tooltip-tether',
      element: tooltipElement,
      target: targetElement,
      ...applyRTLTransforms(this.props.tetherOptions),
    });

    this.tether.on('position', getArrowPositionCallback(tooltipElement, ARROW_ID, 'bpk-tooltip-tether'));

    this.tether.position();
  }

  beforeClose(done) {
    this.tether.destroy();
    this.tether = null;

    done();
  }

  openTooltip() {
    this.setState({
      isOpen: true,
    });
  }

  closeTooltip() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { padded, target, children, hideOnTouchDevices, ...rest } = this.props;
    const renderPortal = !hasTouchSupport() || !hideOnTouchDevices;

    delete rest.tetherOptions;

    return (
      renderPortal ? (
        <Portal
          target={target}
          targetRef={(targetRef) => { this.targetRef = targetRef; }}
          isOpen={this.state.isOpen}
          onOpen={this.onOpen}
          onClose={this.closeTooltip}
        >
          <BpkTooltip padded={padded} {...rest}>
            { children }
          </BpkTooltip>
        </Portal>
      )
      : target
    );
  }
}

BpkTooltipPortal.propTypes = {
  target: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  hideOnTouchDevices: PropTypes.bool,
  padded: PropTypes.bool,
  tetherOptions: PropTypes.shape({
    attachment: PropTypes.string,
    targetAttachment: PropTypes.string,
    offset: PropTypes.string,
    constraints: PropTypes.array,
  }),
};

BpkTooltipPortal.defaultProps = {
  hideOnTouchDevices: true,
  padded: true,
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

export default BpkTooltipPortal;
