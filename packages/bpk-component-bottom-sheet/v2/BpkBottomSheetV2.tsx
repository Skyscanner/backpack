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
import type { ReactNode } from "react";
import { useState } from "react";

import BpkBreakpoint, { BREAKPOINTS } from "../../bpk-component-breakpoint";
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkButtonLink } from '../../bpk-component-link';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
import BpkDialogWrapper from "../../bpk-dialog-utils";
import { cssModules } from "../../bpk-react-utils";
import BpkNavigationBar from "../../bpk-component-navigation-bar";

import STYLES from './BpkBottomSheetV2.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  actionText?: string;
  ariaLabelledby: string;
  children: ReactNode;
  closeLabel?: string;
  closeOnEscPressed?: boolean;
  closeOnScrimClick?: boolean;
  id: string;
  onAction?: () => void;
  onClose: (
    arg0?: Event | KeyboardEvent | MouseEvent | PointerEvent,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void;
  title?: string;
  wide?: boolean;
  isOpen: boolean;
}

export const BpkBottomSheetV2 = ({
  actionText = '',
  ariaLabelledby,
  children,
  closeLabel = '',
  closeOnEscPressed = false,
  closeOnScrimClick = false,
  id,
  isOpen,
  onAction = () => null,
  onClose,
  title = '',
  wide = false
}: Props) => {
  const [exiting, setExiting] = useState(false);

  const animationTimeout = 240;

  const handleClose = (
    timeout: number,
    arg0?: Event | KeyboardEvent | MouseEvent | PointerEvent,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => {
    setExiting(true)
    setTimeout(() => {
      onClose(arg0, arg1)
      setExiting(false)
    }, timeout)
  }

  const headingId = `bpk-bottom-sheet-v2-heading-${id}`;
  const dialogClassName = getClassName(
    'bpk-bottom-sheet-v2',
    wide && 'bpk-bottom-sheet-v2--wide'
    );

    return <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
      {(isAboveMobile: boolean) =>
      <BpkDialogWrapper
      ariaLabelledby={ariaLabelledby}
      dialogClassName={dialogClassName}
      id={id}
      isOpen={isOpen}
      onClose={(
        arg0?: Event | KeyboardEvent | MouseEvent | PointerEvent,
        arg1?: {
          source: 'ESCAPE' | 'DOCUMENT_CLICK';
        }) => handleClose( isAboveMobile ? 0 : animationTimeout, arg0, arg1)}
      exiting={exiting}
      transitionClassNames={{
        appear: getClassName('bpk-bottom-sheet-v2--appear'),
        appearActive: getClassName('bpk-bottom-sheet-v2--appear-active'),
        exit: getClassName('bpk-bottom-sheet-v2--exit')
      }}
      closeOnEscPressed={closeOnEscPressed}
      closeOnScrimClick={closeOnScrimClick}
      timeout={{appear: animationTimeout, exit: isAboveMobile ? 0 : animationTimeout}}
      >
      <>
        <header className={getClassName('bpk-bottom-sheet-v2--header')}>
          <BpkNavigationBar
            id={headingId}
            className={getClassName('bpk-bottom-sheet-v2--navigation')}
            title={title &&
              <h2
                id={headingId}
                className={getClassName('bpk-bottom-sheet-v2--heading')}
              >
                {title}
              </h2>
            }
            leadingButton={
              <BpkCloseButton
                className={getClassName('bpk-bottom-sheet-v2--close-button')}
                label={closeLabel}
                onClick={(
                  arg0?: Event | KeyboardEvent | MouseEvent | PointerEvent,
                  arg1?: {
                    source: 'ESCAPE' | 'DOCUMENT_CLICK';
                  }) => handleClose( isAboveMobile ? 0 : animationTimeout, arg0, arg1)}
              />
            }
            trailingButton={
              actionText && onAction ? (
                <BpkButtonLink
                  className={getClassName('bpk-bottom-sheet-v2--action-button')}
                  onClick={onAction}
                >
                  {actionText}
                </BpkButtonLink>
              ) :
              <div
                className={getClassName('bpk-bottom-sheet-v2--action-button')}
              />
            }
          />
        </header>
        <div className={getClassName('bpk-bottom-sheet-v2--content')}>{children}</div>
    </>
    </BpkDialogWrapper>
  }
  </BpkBreakpoint>
}
