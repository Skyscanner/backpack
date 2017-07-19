/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Portal, cssModules } from 'bpk-react-utils';
import Tether, { getArrowPositionCallback, applyRTLTransforms } from 'bpk-tether';

import BpkTooltip from './BpkTooltip';
import { ARROW_ID } from './constants';
import STYLES from './BpkTooltipPortal.scss';

const getClassName = cssModules(STYLES);

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
    const classNames = [getClassName('bpk-tooltip-portal')];
    const { padded, target, children, hideOnTouchDevices, className, ...rest } = this.props;
    const renderPortal = !hasTouchSupport() || !hideOnTouchDevices;

    if (className) { classNames.push(className); }

    delete rest.tetherOptions;

    return (
      renderPortal ? (
        <Portal
          target={target}
          targetRef={(targetRef) => { this.targetRef = targetRef; }}
          isOpen={this.state.isOpen}
          onOpen={this.onOpen}
          onClose={this.closeTooltip}
          className={classNames.join(' ')}
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
  className: PropTypes.string,
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
  className: null,
};

export default BpkTooltipPortal;
