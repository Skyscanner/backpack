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

/* @flow */

import Popper from '@skyscanner/popper.js';
import PropTypes from 'prop-types';
import React, { Component, type Node } from 'react';
import { Portal, cssModules } from 'bpk-react-utils';

import BpkTooltip, {
  propTypes as tooltipPropTypes,
  defaultProps as tooltipDefaultProps,
  type TooltipProps,
} from './BpkTooltip';
import { ARROW_ID } from './constants';
import STYLES from './BpkTooltip.css';

const getClassName = cssModules(STYLES);

const hasTouchSupport = () =>
  !!(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch))
  );

export type Props = {
  ...$Exact<TooltipProps>,
  target: Node,
  children: Node,
  placement: 'top' | 'right' | 'bottom' | 'left' | 'auto',
  hideOnTouchDevices: boolean,
  padded: boolean,
  portalStyle: ?Object, // eslint-disable-line react/forbid-prop-types
  portalClassName: ?string,
  popperModifiers: ?Object,
};

type State = {
  isOpen: boolean,
};

class BpkTooltipPortal extends Component<Props, State> {
  popper: ?Popper;

  targetRef: ?HTMLElement;

  static propTypes = {
    ...tooltipPropTypes,
    target: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(Popper.placements),
    hideOnTouchDevices: PropTypes.bool,
    padded: PropTypes.bool,
    portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    portalClassName: PropTypes.string,
    popperModifiers: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    ...tooltipDefaultProps,
    placement: 'bottom',
    hideOnTouchDevices: true,
    padded: true,
    portalStyle: null,
    portalClassName: null,
    popperModifiers: null,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.popper = null;
    this.targetRef = null;
  }

  componentDidMount() {
    if (this.targetRef) {
      const ref = this.targetRef;

      ref.addEventListener('mouseenter', this.openTooltip);
      ref.addEventListener('mouseleave', this.closeTooltip);
    }
  }

  componentWillUnmount() {
    if (this.targetRef) {
      const ref = this.targetRef;

      ref.removeEventListener('mouseenter', this.openTooltip);
      ref.removeEventListener('mouseleave', this.closeTooltip);
    }
  }

  onOpen = (tooltipElement: HTMLElement, targetElement: HTMLElement) => {
    this.popper = new Popper(targetElement, tooltipElement, {
      placement: this.props.placement,
      modifiers: {
        ...this.props.popperModifiers,
        arrow: {
          element: `#${ARROW_ID}`,
        },
      },
    });

    this.popper.scheduleUpdate();
  };

  beforeClose = (done: () => mixed) => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    done();
  };

  openTooltip = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeTooltip = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const {
      padded,
      target,
      children,
      placement,
      hideOnTouchDevices,
      portalClassName,
      portalStyle,
      popperModifiers,
      ...rest
    } = this.props;

    const classNames = [getClassName('bpk-tooltip-portal')];
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

export default BpkTooltipPortal;
