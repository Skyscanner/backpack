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

/*
This is the component for the tooltip that is displayed to users.

The actual component that developers create (i.e. the default export from this package) is BpkTooltipPortal.
*/

import type { ReactNode, ReactElement } from 'react';
import { cloneElement, useRef, useState } from 'react';

import {
  arrow,
  flip,
  FloatingArrow,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';

import { surfaceHighlightDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { TransitionInitialMount, cssModules } from '../../bpk-react-utils';

import { ARROW_ID, TOOLTIP_TYPES } from './constants';

import type { Placement } from '@floating-ui/react';

import STYLES from './BpkTooltip.module.scss';

const getClassName = cssModules(STYLES);

// The stroke width is used to set the border width of the arrow.
const strokeWidth = 1;

export type Props = {
  id: string;
  children: ReactNode | string;
  type?: (typeof TOOLTIP_TYPES)[keyof typeof TOOLTIP_TYPES];
  padded?: boolean;
  target: ReactElement<any>;
  ariaLabel: string;
  hideOnTouchDevices?: boolean;
  placement?: Placement;
  isOpen?: boolean;
};

// This function is to ensure the arrow alignment when used on the top and bottom
// doesn't look clipped away from the tooltip. This is due to our use of box-shadows that makes it look floating away,
// so we need to compensate slightly to make it look as one.
const getArrowAlignment = (placement: Placement) => {
  if (placement.includes('bottom')) {
    return { bottom: '98%' };
  }
  if (placement.includes('top')) {
    return { top: '98%' };
  }
  return undefined;
};

const BpkTooltip = ({
  ariaLabel,
  children,
  hideOnTouchDevices = true,
  id,
  isOpen = false,
  padded = true,
  placement = 'bottom',
  target,
  type = TOOLTIP_TYPES.light,
  ...rest
}: Props) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);
  const arrowRef = useRef(null);

  const { context, floatingStyles, refs } = useFloating({
    open: isOpenState,
    onOpenChange: setIsOpenState,
    placement,
    middleware: [
      offset(8),
      flip({ crossAxis: true }),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, {
    mouseOnly: true,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([hover]);

  const targetWithAccessibilityProps = cloneElement(target, {
    ...getReferenceProps(),
    ref: refs.setReference,
    tabIndex: '0',
    'aria-label': ariaLabel,
  });

  const classNames = getClassName('bpk-tooltip');

  const innerClassNames = getClassName(
    'bpk-tooltip__inner',
    type === TOOLTIP_TYPES.dark && 'bpk-tooltip__inner--dark',
    padded && 'bpk-tooltip__inner--padded',
  );

  const arrowClassNames = getClassName(
    'bpk-tooltip__arrow',
    type === TOOLTIP_TYPES.dark && 'bpk-tooltip__arrow--dark',
  );

  return (
    <>
      {targetWithAccessibilityProps}
      {isOpenState && (
        <div
          className={getClassName('bpk-tooltip--container')}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <TransitionInitialMount
            appearClassName={getClassName('bpk-tooltip--appear')}
            appearActiveClassName={getClassName('bpk-tooltip--appear-active')}
            transitionTimeout={200}
          >
            <section
              id={id}
              tabIndex={-1}
              role="dialog"
              className={classNames}
              aria-label={ariaLabel}
              {...rest}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                id={ARROW_ID}
                className={arrowClassNames}
                role="presentation"
                stroke={surfaceHighlightDay}
                strokeWidth={strokeWidth}
                style={getArrowAlignment(context.placement)}
              />
              <div className={innerClassNames}>{children}</div>
            </section>
          </TransitionInitialMount>
        </div>
      )}
    </>
  );
};

export default BpkTooltip;
