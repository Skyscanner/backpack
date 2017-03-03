import React, { Component, PropTypes } from 'react';

import { Portal } from 'bpk-react-utils';
import Tether, { getArrowPositionCallback } from 'bpk-tether';

import BpkTooltip from './BpkTooltip';
import { ARROW_ID } from './constants';

class BpkTooltipPortalPortal extends Portal {
  componentDidMount() {
    super.componentDidMount();

    const target = this.getTargetElement();
    target.addEventListener('mouseenter', this.props.onMouseEnter);
    target.addEventListener('mouseleave', this.props.onMouseLeave);
  }
}

class BpkTooltipPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.tether = null;

    this.onOpen = this.onOpen.bind(this);
    this.beforeClose = this.beforeClose.bind(this);

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
  }

  onOpen(popoverElement, targetElement) {
    this.tether = new Tether({
      classPrefix: 'bpk-tooltip-tether',
      element: popoverElement,
      target: targetElement,
      ...this.props.tetherOptions,
    });

    this.tether.on('position', getArrowPositionCallback(popoverElement, ARROW_ID, 'bpk-tooltip-tether'));

    this.tether.position();
  }

  beforeClose(done) {
    this.tether.destroy();
    this.tether = null;

    done();
  }

  openPopover() {
    this.setState({
      isOpen: true,
    });
  }

  closePopover() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { padded, target, children } = this.props;

    return (
      <BpkTooltipPortalPortal
        target={target}
        isOpen={this.state.isOpen}
        onMouseEnter={this.openPopover}
        onMouseLeave={this.closePopover}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
      >
        <BpkTooltip padded={padded}>
          { children }
        </BpkTooltip>
      </BpkTooltipPortalPortal>
    );
  }
}

BpkTooltipPortal.propTypes = {
  target: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
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
