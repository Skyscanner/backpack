import React, { Component, PropTypes } from 'react';

import { Portal } from 'bpk-react-utils';
import Tether, { getArrowPositionCallback } from 'bpk-tether';

import BpkTooltip from './BpkTooltip';
import { ARROW_ID } from './constants';

class BpkTooltipPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.tether = null;

    this.onOpen = this.onOpen.bind(this);
    this.openTooltip = this.openTooltip.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
  }

  onOpen(tooltipElement, targetElement) {
    this.tether = new Tether({
      classPrefix: 'bpk-tooltip-tether',
      element: tooltipElement,
      target: targetElement,
      ...this.props.tetherOptions,
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
    const { padded, target, children, ...rest } = this.props;

    delete rest.tetherOptions;

    return (
      <Portal
        target={target}
        targetRef={(targetRef) => {
          targetRef.addEventListener('mouseenter', this.openTooltip);
          targetRef.addEventListener('mouseleave', this.closeTooltip);
        }}
        isOpen={this.state.isOpen}
        onOpen={this.onOpen}
      >
        <BpkTooltip padded={padded} {...rest}>
          { children }
        </BpkTooltip>
      </Portal>
    );
  }
}

BpkTooltipPortal.propTypes = {
  target: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  tetherOptions: PropTypes.shape({
    attachment: PropTypes.string,
    targetAttachment: PropTypes.string,
    offset: PropTypes.string,
    constraints: PropTypes.array,
  }),
};

BpkTooltipPortal.defaultProps = {
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
