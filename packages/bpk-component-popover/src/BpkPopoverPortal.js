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
import focusStore from 'a11y-focus-store';
import focusScope from 'a11y-focus-scope';
import { Portal, cssModules } from 'bpk-react-utils';

import STYLES from './BpkPopover.css';
import BpkPopover, {
  propTypes as popoverPropTypes,
  defaultProps as popoverDefaultProps,
  type Props as PopoverProps,
} from './BpkPopover';
import { ARROW_ID } from './constants';

const getClassName = cssModules(STYLES);

export type Props = {
  ...$Exact<PopoverProps>,
  target: (() => HTMLElement) | Node,
  isOpen: boolean,
  placement: ?('top' | 'right' | 'bottom' | 'left'),
  portalStyle: ?Object,
  portalClassName: ?string,
  renderTarget: ?() => HTMLElement,
  popperModifiers: ?Object,
};

class BpkPopoverPortal extends Component<Props> {
  popper: ?Popper;

  previousTargetElement: ?HTMLElement;

  static propTypes = {
    ...popoverPropTypes,
    target: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    portalClassName: PropTypes.string,
    renderTarget: PropTypes.func,
    popperModifiers: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    ...popoverDefaultProps,
    placement: 'bottom',
    portalStyle: null,
    portalClassName: null,
    renderTarget: null,
    popperModifiers: null,
  };

  constructor() {
    super();

    this.popper = null;
    this.previousTargetElement = null;
  }

  onRender = (popoverElement: HTMLElement, targetElement: ?HTMLElement) => {
    this.position(popoverElement, targetElement);
  };

  beforeClose = (done: () => void) => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
      this.previousTargetElement = null;
    }

    focusScope.unscopeFocus();
    focusStore.restoreFocus();

    done();
  };

  position(popoverElement: HTMLElement, targetElement: ?HTMLElement) {
    if (!targetElement) {
      return;
    }

    const targetElementHasChanged =
      targetElement !== this.previousTargetElement;

    if (targetElementHasChanged && this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    if (!this.popper) {
      this.popper = new Popper(targetElement, popoverElement, {
        placement: this.props.placement,
        onCreate: () => {
          if (targetElement) {
            targetElement.focus();
          }
          focusStore.storeFocus();
          focusScope.scopeFocus(popoverElement);
        },
        modifiers: {
          ...this.props.popperModifiers,
          arrow: {
            element: `#${ARROW_ID}`,
          },
        },
      });
    }

    this.previousTargetElement = targetElement;

    if (this.popper) {
      this.popper.scheduleUpdate();
    }
  }

  render() {
    const {
      target,
      isOpen,
      onClose,
      placement,
      portalStyle,
      portalClassName,
      renderTarget,
      popperModifiers,
      ...rest
    } = this.props;

    const classNames = [getClassName('bpk-popover-portal')];

    if (portalClassName) {
      classNames.push(portalClassName);
    }

    return (
      <Portal
        beforeClose={this.beforeClose}
        className={classNames.join(' ')}
        isOpen={isOpen}
        onClose={onClose}
        onRender={this.onRender}
        style={portalStyle}
        renderTarget={renderTarget}
        target={target}
      >
        <BpkPopover onClose={onClose} {...rest} />
      </Portal>
    );
  }
}

export default BpkPopoverPortal;
