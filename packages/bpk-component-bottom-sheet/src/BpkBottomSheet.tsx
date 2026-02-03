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
import type { SyntheticEvent, ReactNode } from 'react';
import { useCallback, useState } from 'react';

import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
import BpkLink from '../../bpk-component-link';
import BpkNavigationBar from '../../bpk-component-navigation-bar';
import { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';        
import BpkVisuallyHidden from '../../bpk-component-visually-hidden';
import { BpkDialogWrapper, cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

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
  top?: PaddingType,
  start?: PaddingType,
  end?: PaddingType,
  bottom?: PaddingType,
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
    arg0?:
      | TouchEvent
      | MouseEvent
      | KeyboardEvent
      | SyntheticEvent<HTMLDialogElement, Event>,
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

const getContentStyles = (paddingStyles: PaddingStyles): string => {
  const { 
    bottom = PADDING_TYPE.lg,
    end, 
    start = PADDING_TYPE.lg, 
    top = PADDING_TYPE.none 
  } = paddingStyles;
  
  const classNames = ['bpk-bottom-sheet--content'];

  // Add padding classes for each side if not 'none'
  if (top !== PADDING_TYPE.none) {
    classNames.push(`bpk-bottom-sheet--padding-${top}-top`);
  }

  if (bottom !== PADDING_TYPE.none) {
    classNames.push(`bpk-bottom-sheet--padding-${bottom}-bottom`);
  }

  if (start !== PADDING_TYPE.none) {
    classNames.push(`bpk-bottom-sheet--padding-${start}-start`);
  }

  // Handle end padding: use explicit 'end' value or fallback to 'start' value
  const endPadding = end || start;
  if (endPadding && endPadding !== PADDING_TYPE.none) {
    classNames.push(`bpk-bottom-sheet--padding-${endPadding}-end`);
  }

  return getClassName(...classNames);
};

const BpkBottomSheet = ({
  actionText = '',
  children,
  closeLabel = '',
  closeOnEscPressed = false,
  closeOnScrimClick = false,
  id,
  isAboveMobile,
  isOpen,
  onAction = () => null,
  onClose,
  paddingStyles = {
    top: PADDING_TYPE.none,
    start: PADDING_TYPE.lg,
    end: PADDING_TYPE.lg,
    bottom: PADDING_TYPE.lg
  },
  title = '',
  wide = false,
  ...ariaProps
}: Props & {
  isAboveMobile: boolean;
}) => {
  const [exiting, setExiting] = useState(false);

  const animationTimeout = 240;

  const handleClose = useCallback(
    (
      arg0?:
        | TouchEvent
        | MouseEvent
        | KeyboardEvent
        | SyntheticEvent<HTMLDialogElement, Event>,
      arg1?: {
        source: 'ESCAPE' | 'DOCUMENT_CLICK';
      },
    ) => {
      const timeoutDuration = isAboveMobile ? 0 : animationTimeout;

      setExiting(true);
      setTimeout(() => {
        onClose(arg0, arg1);
        setExiting(false);
      }, timeoutDuration);
    },
    [isAboveMobile, onClose],
  );

  const headingId = `bpk-bottom-sheet-heading-${id}`;
  const hiddenTitleId = `bpk-bottom-sheet-title-hidden-${id}`;
  const showHiddenTitle = !title && 'ariaLabel' in ariaProps;
  const dialogClassName = getClassName(
    'bpk-bottom-sheet',
    wide && 'bpk-bottom-sheet--wide',
  );

  const contentStyle = getContentStyles(paddingStyles);

  return (
    <BpkDialogWrapper
      {...ariaProps}
      dialogClassName={dialogClassName}
      id={id}
      isOpen={isOpen}
      onClose={handleClose}
      exiting={exiting}
      transitionClassNames={{
        appear: getClassName('bpk-bottom-sheet--appear'),
        appearActive: getClassName('bpk-bottom-sheet--appear-active'),
        exit: getClassName('bpk-bottom-sheet--exit'),
      }}
      closeOnEscPressed={closeOnEscPressed}
      closeOnScrimClick={closeOnScrimClick}
      timeout={{
        appear: animationTimeout,
        exit: isAboveMobile ? 0 : animationTimeout,
      }}
      {...getDataComponentAttribute('BottomSheet')}
    >
      <>
        <header className={getClassName('bpk-bottom-sheet--header-wrapper')}>
          <BpkNavigationBar
            id={showHiddenTitle ? hiddenTitleId : headingId}
            title={title}
            titleTextStyle={TEXT_STYLES.label1}
            titleTagName={title ? 'h2' : 'span'}
            className={getClassName('bpk-bottom-sheet--header')}
            leadingButton={
              <BpkCloseButton label={closeLabel} onClick={handleClose} />
            }
            trailingButton={
              actionText && onAction ? (
                <BpkLink as="button" onClick={onAction}>{actionText}</BpkLink>
              ) : null
            }
          />
          {/* Visually hidden title required for Android TalkBack to announce ariaLabel on BottomSheet open when no visible title provided */}
          {showHiddenTitle && (
            <BpkVisuallyHidden as="h2">
              <span id={hiddenTitleId}>{ariaProps.ariaLabel}</span>
            </BpkVisuallyHidden>
          )}
        </header>
        <div className={contentStyle}>{children}</div>
      </>
    </BpkDialogWrapper>
  );
};

const BpkBottomSheetWithBreakpoint = (props: Props) => (
  <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
    {(isAboveMobile: boolean) => (
      <BpkBottomSheet {...props} isAboveMobile={isAboveMobile} />
    )}
  </BpkBreakpoint>
);

export default BpkBottomSheetWithBreakpoint;
