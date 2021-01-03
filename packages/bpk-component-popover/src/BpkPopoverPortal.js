/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* @flow strict */

import Popper from '@skyscanner/popper.js';
import PropTypes from 'prop-types';
import React, { Component, type Node } from 'react';
import focusStore from 'a11y-focus-store';
import { Portal, cssModules } from 'bpk-react-utils';

import keyboardFocusScope from './keyboardFocusScope';
import STYLES from './BpkPopover.scss';
import BpkPopover, {
  propTypes as popoverPropTypes,
  defaultProps as popoverDefaultProps,
  type Props as PopoverProps,
} from './BpkPopover';
import { ARROW_ID } from './constants';

const getClassName = cssModules(STYLES);

export type Props = {
  ...$Exact<PopoverProps>,
  target: (() => ?HTMLElement) | Node,
  isOpen: boolean,
  placement: ?('top' | 'right' | 'bottom' | 'left'),
  portalStyle: ?Object,
  portalClassName: ?string,
  renderTarget: ?() => ?HTMLElement,
  popperModifiers: ?Object,
};

export const propTypes = {
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

export const defaultProps = {
  ...popoverDefaultProps,
  placement: 'bottom',
  portalStyle: null,
  portalClassName: null,
  renderTarget: null,
  popperModifiers: null,
};

class BpkPopoverPortal extends Component<Props> {
  popper: ?typeof Popper;

  suppressRestoreFocus: boolean;

  previousTargetElement: ?HTMLElement;

  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor() {
    super();

    this.popper = null;
    this.previousTargetElement = null;
  }

  onRender = (popoverElement: HTMLElement, targetElement: ?HTMLElement) => {
    this.position(popoverElement, targetElement);
  };

  // The order of events here is as follows:
  // - `onClose` is called by `Portal`
  // - The consumer changes `isOpen` to `false`
  // - `beforeClose` is called by `Portal`
  // - `beforeClose` calls the `done` callback which closes the `Portal`

  // `onClose` is called by the `Portal` to inform the consumer that `isOpen` should be made false.
  // Before we pass this information to the consumer, we want to note if restoring focus should be suppressed
  onClose = (event: Object, information: { source: string }) => {
    // If the user has clicked outside the popover then we don't want focus to be restored
    // otherwise it will be stolen back from the element they clicked on.
    // Here we suppress restoring focus before the consumer is told about the close and updates state.
    this.suppressRestoreFocus = information.source === 'DOCUMENT_CLICK';

    if (this.props.onClose) {
      this.props.onClose(event, information);
    }
  };

  // `beforeClose` is called by the `Portal` when `isOpen` is changed to false.
  // As a result, `onClose` is called first, followed by `beforeClose`.
  beforeClose = (done: () => void) => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
      this.previousTargetElement = null;
    }

    keyboardFocusScope.unscopeFocus();
    if (!this.suppressRestoreFocus) {
      focusStore.restoreFocus();
      this.suppressRestoreFocus = false;
    }

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

    // Note that GPU acceleration should be disabled otherwise Popper will use `translate3d`
    // which can cause blurriness in Safari and Chrome.
    if (!this.popper) {
      this.popper = new Popper(targetElement, popoverElement, {
        placement: this.props.placement,
        onCreate: () => {
          if (targetElement) {
            targetElement.focus();
          }
          focusStore.storeFocus();
          keyboardFocusScope.scopeFocus(popoverElement);
        },
        modifiers: {
          ...this.props.popperModifiers,
          computeStyle: {
            gpuAcceleration: false,
          },
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
        onClose={this.onClose}
        onRender={this.onRender}
        style={portalStyle}
        renderTarget={renderTarget}
        target={target}
      >
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkPopover onClose={this.onClose} {...rest} />
      </Portal>
    );
  }
}

export default BpkPopoverPortal;
