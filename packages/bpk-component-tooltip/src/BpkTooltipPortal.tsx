/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { cloneElement, Component } from 'react';
import type { ReactNode, ReactElement } from 'react';

import { createPopper } from '@popperjs/core';

import { Portal, cssModules } from '../../bpk-react-utils';

import BpkTooltip from './BpkTooltip';
import { TOOLTIP_TYPES } from './constants';

import type { TooltipProps } from './BpkTooltip';

import * as STYLES from './BpkTooltip.module.scss';

const getClassName = cssModules(STYLES);

const hasTouchSupport = () =>
  !!(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );

export type Props = TooltipProps & {
  /**
   * Tooltips are invisible to assistive technologies such as screen readers.
   * To improve accessibility, `ariaLabel` is required to describe the content of the tooltip to assistive technologies.
   * The label will be used on the `target` element, so any existing `aria-label` attached to `target` will be overridden.
   */
  ariaLabel: string;
  /**
   * "target" should be a DOM element with a "ref" attached to it.
   */
  target: ReactElement<any>;
  children: ReactNode | string;
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
  hideOnTouchDevices?: boolean;
  portalStyle?: object;
  portalClassName?: string;
  renderTarget: null | (() => null | HTMLElement);
  /**
   * Please refer to the [documentation](https://popper.js.org/docs/v2/modifiers/) for the underlying positioning library "Popper.js".
   * You can achieve various behaviours such as allowing the tooltip to overflow the viewport etc.
   */
  popperModifiers?: object[];
};

type State = {
  isOpen: boolean;
};

class BpkTooltipPortal extends Component<Props, State> {
  popper?: ReturnType<typeof createPopper> | null;

  targetRef?: Element | null;

  static defaultProps = {
    // Disabling as the rule doesn't work when types are defined in a different file
    /* eslint-disable react/default-props-match-prop-types */
    className: null,
    padded: true,
    type: TOOLTIP_TYPES.light,
    /* eslint-enable */
    placement: 'bottom',
    hideOnTouchDevices: true,
    portalStyle: null,
    portalClassName: null,
    renderTarget: null,
    popperModifiers: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.popper = null;
    this.targetRef = null;
  }

  componentDidMount() {
    if (this.targetRef) {
      const ref = this.targetRef;

      ref.addEventListener('focusin', this.openTooltip);
      ref.addEventListener('focusout', this.closeTooltip);
      ref.addEventListener('mouseenter', this.openTooltip);
      ref.addEventListener('mouseleave', this.closeTooltip);
    }
  }

  componentWillUnmount() {
    if (this.targetRef) {
      const ref = this.targetRef;

      ref.addEventListener('focusin', this.openTooltip);
      ref.addEventListener('focusout', this.closeTooltip);
      ref.removeEventListener('mouseenter', this.openTooltip);
      ref.removeEventListener('mouseleave', this.closeTooltip);
    }
  }

  onOpen = (
    tooltipElement: HTMLElement,
    targetElement?: HTMLElement | null | undefined,
  ) => {
    // The default modifiers for the popper
    // Note that GPU acceleration should be disabled otherwise Popper will use `translate3d`
    // which can cause blurriness in Safari and Chrome.
    const stdModifiers = [
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: false,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ];

    this.popper = createPopper(targetElement as HTMLElement, tooltipElement, {
      placement: this.props.placement,
      modifiers: this.props.popperModifiers
        ? [...this.props.popperModifiers, ...stdModifiers]
        : stdModifiers,
    });

    this.popper.update();
  };

  beforeClose = (done: () => void | null) => {
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
      ariaLabel,
      children,
      hideOnTouchDevices,
      padded,
      placement,
      popperModifiers,
      portalClassName,
      portalStyle,
      renderTarget,
      target,
      ...rest
    } = this.props;

    const classNames = [getClassName('bpk-tooltip-portal')];
    const renderPortal = !hasTouchSupport() || !hideOnTouchDevices;

    const targetWithAccessibilityProps = cloneElement(target, {
      tabIndex: '0',
      'aria-label': ariaLabel,
    });

    if (portalClassName) {
      classNames.push(portalClassName);
    }

    return (
      <>
        {targetWithAccessibilityProps}
        {renderPortal && (
          <Portal
            target={targetWithAccessibilityProps}
            targetRef={(targetRef) => {
              this.targetRef = targetRef;
            }}
            isOpen={this.state.isOpen}
            onOpen={this.onOpen}
            onClose={this.closeTooltip}
            style={portalStyle}
            renderTarget={renderTarget}
            // TODO: className to be removed
            // eslint-disable-next-line @skyscanner/rules/forbid-component-props
            className={classNames.join(' ')}
          >
            <BpkTooltip padded={padded} {...rest}>
              {children}
            </BpkTooltip>
          </Portal>
        )}
      </>
    );
  }
}

export default BpkTooltipPortal;
