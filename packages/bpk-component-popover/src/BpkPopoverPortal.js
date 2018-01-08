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

import focusStore from 'a11y-focus-store';
import focusScope from 'a11y-focus-scope';
import { Portal, cssModules } from 'bpk-react-utils';
import PropTypes from 'prop-types';
import React, { Component, type Node } from 'react';
import Tether, {
  getArrowPositionCallback,
  applyRTLTransforms,
} from 'bpk-tether';

import STYLES from './bpk-popover.scss';
import BpkPopover, { type Props as PopoverProps } from './BpkPopover';
import { ARROW_ID } from './constants';

const getClassName = cssModules(STYLES);

const onOpen = (popoverElement, targetElement) => {
  // If the target element does _not_ exist, the Portal does not open
  // Therefore we also shouldn't store and scope the focus
  if (targetElement) {
    targetElement.focus();
    focusStore.storeFocus();
    focusScope.scopeFocus(popoverElement);
  }
};

export type Props = {
  ...$Exact<PopoverProps>,
  target: Function | Node,
  isOpen: boolean,
  onClose: Function,
  tetherOptions: Object,
  portalStyle: ?Object,
  portalClassName: ?string,
  renderTarget: ?() => HTMLElement,
};

class BpkPopoverPortal extends Component<Props> {
  tether: ?Tether;

  static propTypes = {
    ...BpkPopover.propTypes,
    target: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
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
    renderTarget: PropTypes.func,
  };

  static defaultProps = {
    ...BpkPopover.defaultProps,
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
    renderTarget: null,
  };

  constructor() {
    super();

    this.tether = null;
  }

  onRender = (popoverElement: HTMLElement, targetElement: ?HTMLElement) => {
    this.position(popoverElement, targetElement);
  };

  beforeClose = (done: () => void) => {
    if (this.tether) {
      this.tether.destroy();
      this.tether = null;
    }

    focusScope.unscopeFocus();
    focusStore.restoreFocus();

    done();
  };

  position(popoverElement: HTMLElement, targetElement: ?HTMLElement) {
    if (!targetElement) {
      return;
    }

    const options = {
      classPrefix: 'bpk-popover-tether',
      element: popoverElement,
      target: targetElement,
      ...applyRTLTransforms(this.props.tetherOptions),
    };

    if (!this.tether) {
      this.tether = new Tether(options);
      this.tether.on(
        'position',
        getArrowPositionCallback(
          popoverElement,
          ARROW_ID,
          'bpk-popover-tether',
        ),
      );
    } else {
      this.tether.setOptions(options);
    }

    if (this.tether) {
      this.tether.position();
    }
  }

  render() {
    const {
      target,
      isOpen,
      onClose,
      portalStyle,
      portalClassName,
      renderTarget,
      tetherOptions,
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
        onOpen={onOpen}
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
