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
import type { SyntheticEvent, ReactNode } from "react";
import { useState } from "react";

import BpkBreakpoint, { BREAKPOINTS } from "../../bpk-component-breakpoint";
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkButtonLink } from '../../bpk-component-link';
import BpkNavigationBar from "../../bpk-component-navigation-bar";
import { TEXT_STYLES } from "../../bpk-component-text/src/BpkText";
import { BpkDialogWrapper, cssModules } from "../../bpk-react-utils";

import STYLES from './BpkBottomSheet.module.scss';

const getClassName = cssModules(STYLES);

export const PADDING_TYPE = {
  none: 'none',
  base: 'base',
  lg: 'lg',
  xxl: 'xxl',
  xxxl: 'xxxl'
}

export type PaddingType = (typeof PADDING_TYPE)[keyof typeof PADDING_TYPE];

export type PaddingStyles = {
  top: PaddingType,
  start: PaddingType,
  end?: PaddingType
}

interface CommonProps {
  actionText?: string;
  children: ReactNode;
  closeLabel?: string;
  closeOnEscPressed?: boolean;
  closeOnScrimClick?: boolean;
  id: string;
  onAction?: () => void;
  onClose: (
    arg0?: TouchEvent | MouseEvent | KeyboardEvent | SyntheticEvent<HTMLDialogElement, Event>,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void;
  title?: string;
  wide?: boolean;
  isOpen: boolean;
  paddingStyles?: PaddingStyles;
}

export type Props = CommonProps & ({ ariaLabelledby: string } | { ariaLabel: string; });

const BpkBottomSheet = ({
  actionText = '',
  children,
  closeLabel = '',
  closeOnEscPressed = false,
  closeOnScrimClick = false,
  id,
  isOpen,
  onAction = () => null,
  onClose,
  paddingStyles = {
    top: PADDING_TYPE.lg,
    start: PADDING_TYPE.lg,
  },
  title = '',
  wide = false,
  ...ariaProps
}: Props) => {
  const [exiting, setExiting] = useState(false);

  const animationTimeout = 240;

  const handleClose = (
    timeout: number,
    arg0?: TouchEvent | MouseEvent | KeyboardEvent | SyntheticEvent<HTMLDialogElement, Event>,
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

  const headingId = `bpk-bottom-sheet-heading-${id}`;
  const dialogClassName = getClassName(
    'bpk-bottom-sheet',
    wide && 'bpk-bottom-sheet--wide'
  );

  const contentStyle = getClassName(
    'bpk-bottom-sheet--content',
    paddingStyles.top !== PADDING_TYPE.none && `bpk-bottom-sheet--padding-${paddingStyles.top}-top`,
    paddingStyles.start !== PADDING_TYPE.none && `bpk-bottom-sheet--padding-${paddingStyles.start}-start`,
    ((paddingStyles.end && paddingStyles.end !== PADDING_TYPE.none) || (!paddingStyles.end && paddingStyles.start && paddingStyles.start !== PADDING_TYPE.none))
      && `bpk-bottom-sheet--padding-${paddingStyles.end || paddingStyles.start}-end`
  );

  return <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
    {(isAboveMobile: boolean) =>
      <BpkDialogWrapper
        {...ariaProps}
        dialogClassName={dialogClassName}
        id={id}
        isOpen={isOpen}
        onClose={(
          arg0?: TouchEvent | MouseEvent | KeyboardEvent | SyntheticEvent<HTMLDialogElement, Event>,
          arg1?: {
            source: 'ESCAPE' | 'DOCUMENT_CLICK';
          }) => handleClose(isAboveMobile ? 0 : animationTimeout, arg0, arg1)}
        exiting={exiting}
        transitionClassNames={{
          appear: getClassName('bpk-bottom-sheet--appear'),
          appearActive: getClassName('bpk-bottom-sheet--appear-active'),
          exit: getClassName('bpk-bottom-sheet--exit')
        }}
        closeOnEscPressed={closeOnEscPressed}
        closeOnScrimClick={closeOnScrimClick}
        timeout={{ appear: animationTimeout, exit: isAboveMobile ? 0 : animationTimeout }}
      >
        <>
          <header className={getClassName('bpk-bottom-sheet--header-wrapper')}>
            <BpkNavigationBar
              id={headingId}
              title={title}
              titleTextStyle={TEXT_STYLES.label1}
              titleTagName={title ? "h2" : "span"}
              className={getClassName('bpk-bottom-sheet--header')}
              leadingButton={
                <BpkCloseButton
                  label={closeLabel}
                  onClick={(
                    arg0?: TouchEvent | MouseEvent | KeyboardEvent | SyntheticEvent<HTMLDialogElement, Event>,
                    arg1?: {
                      source: 'ESCAPE' | 'DOCUMENT_CLICK';
                    }) => handleClose(isAboveMobile ? 0 : animationTimeout, arg0, arg1)}
                />
              }
              trailingButton={
                actionText && onAction ? (
                  <BpkButtonLink
                    onClick={onAction}
                  >
                    {actionText}
                  </BpkButtonLink>
                ) :
                  null
              }
            />
          </header>
          <div className={contentStyle}>{children}</div>
        </>
      </BpkDialogWrapper>
    }
  </BpkBreakpoint>
}

export default BpkBottomSheet;
