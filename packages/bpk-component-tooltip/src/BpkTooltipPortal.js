/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import Popper from 'popper.js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Portal, cssModules } from 'bpk-react-utils';

import BpkTooltip from './BpkTooltip';
import { ARROW_ID } from './constants';
import STYLES from './BpkTooltip.scss';

const getClassName = cssModules(STYLES);

const hasTouchSupport = () =>
  !!(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch))
  );

class BpkTooltipPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.popper = null;
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
    this.popper = new Popper(targetElement, tooltipElement, {
      placement: this.props.placement,
      modifiers: {
        arrow: {
          element: `#${ARROW_ID}`,
        },
      },
    });

    this.popper.scheduleUpdate();
  }

  beforeClose(done) {
    this.popper.destroy();
    this.popper = null;

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
    const {
      padded,
      target,
      children,
      placement,
      hideOnTouchDevices,
      portalClassName,
      portalStyle,
      ...rest
    } = this.props;
    const renderPortal = !hasTouchSupport() || !hideOnTouchDevices;

    if (portalClassName) {
      classNames.push(portalClassName);
    }

    return renderPortal ? (
      <Portal
        target={target}
        targetRef={targetRef => {
          this.targetRef = targetRef;
        }}
        isOpen={this.state.isOpen}
        onOpen={this.onOpen}
        onClose={this.closeTooltip}
        style={portalStyle}
        className={classNames.join(' ')}
      >
        <BpkTooltip padded={padded} {...rest}>
          {children}
        </BpkTooltip>
      </Portal>
    ) : (
      target
    );
  }
}

BpkTooltipPortal.propTypes = {
  target: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(Popper.placements),
  hideOnTouchDevices: PropTypes.bool,
  padded: PropTypes.bool,
  portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  portalClassName: PropTypes.string,
};

BpkTooltipPortal.defaultProps = {
  placement: 'bottom',
  hideOnTouchDevices: true,
  padded: true,
  portalStyle: null,
  portalClassName: null,
};

export default BpkTooltipPortal;
