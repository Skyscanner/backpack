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

/* @flow strict */

import type { CSSProperties, ReactNode, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { animations } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkButtonLink } from '../../bpk-component-link';
import { isDeviceIpad, isDeviceIphone, BpkDialogWrapper, cssModules } from '../../bpk-react-utils';

// Reuse Drawer content styles for layout and animations
import STYLES from './BpkDrawerContent.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  id: string,
  children: ReactNode;
  isOpen: boolean,
  onClose?: (
    arg0?: TouchEvent | MouseEvent | KeyboardEvent,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void;
  title: string,
  getApplicationElement: () => HTMLElement | null,
  width?: string,
  renderTarget?: null | HTMLElement | (() => null | HTMLElement),
  dialogRef?: (ref: HTMLElement | null | undefined) => void,
  className?: string,
  contentClassName?: string,
  closeLabel?: string | null,
  closeText?: string,
  hideTitle?: boolean,
  isIpad?: boolean,
  isIphone?: boolean,
  padded?: boolean,
  mobileModalDisplay?: boolean,
  containerClassName?: string,
  // New optional flags to better align with dialog-based behavior
  closeOnEscPressed?: boolean,
  closeOnScrimClick?: boolean,
};

const BpkDrawer = ({
  children,
  className = undefined,
  closeLabel = null,
  closeOnEscPressed = true,
  closeOnScrimClick = true,
  closeText = undefined,
  containerClassName = undefined,
  contentClassName = undefined,
  dialogRef,
  // Deprecated/no-op with dialog-based implementation, kept for backwards compatibility
  getApplicationElement,
  hideTitle = false,
  id,
  isIpad = isDeviceIpad(), // Unused but preserved for backwards compatibility
  isIphone = isDeviceIphone(), // Unused but preserved for backwards compatibility
  isOpen,
  mobileModalDisplay = false,
  onClose,
  padded = true,
  // Deprecated/no-op with dialog-based implementation, kept for backwards compatibility
  renderTarget = null,
  title,
  width = '90%',
}: Props) => {

  const [exiting, setExiting] = useState(false);
  const contentRef = useRef<HTMLElement | null>(null);

  // Keep previous behavior: call consumer onClose after exit animation completes
  const animationTimeout = parseInt(animations.durationSm, 10) || 240;

  useEffect(() => {
    if (isOpen) {
      setExiting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (dialogRef) {
      dialogRef(contentRef.current);
    }
    // run only when ref changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef.current]);

  const handleClose = (
    e?: TouchEvent | MouseEvent | KeyboardEvent | SyntheticEvent<HTMLDialogElement, Event>,
    meta?: { source: 'ESCAPE' | 'DOCUMENT_CLICK' }
  ) => {
    setExiting(true);
    window.setTimeout(() => {
      onClose && onClose(e as any, meta);
      setExiting(false);
    }, animationTimeout);
  };

  const headingId = `bpk-drawer-heading-${id}`;

  const drawerClassNames = [getClassName('bpk-drawer')];
  const headerClassNames = [getClassName('bpk-drawer__heading')];
  const contentsClassNames = [getClassName('bpk-drawer__content')];

  if (className) drawerClassNames.push(className);
  if (hideTitle) headerClassNames.push(getClassName('bpk-drawer__heading--visually-hidden'));
  if (padded) contentsClassNames.push(getClassName('bpk-drawer__content--padded'));
  if (contentClassName) contentsClassNames.push(contentClassName);

  // Mirror previous transition states for exit only
  const statusClass = exiting ? 'bpk-drawer--exiting' : 'bpk-drawer--entered';
  const mobileModalStatus = exiting ? 'bpk-drawer__modal-mobile-view--exiting' : 'bpk-drawer__modal-mobile-view--entered';

  return (
    <BpkDialogWrapper
      ariaLabelledby={headingId}
      id={id}
      isOpen={isOpen}
      onClose={(arg0, arg1) => handleClose(arg0 as any, arg1)}
      exiting={exiting}
      dialogClassName={containerClassName}
      closeOnEscPressed={closeOnEscPressed}
      closeOnScrimClick={closeOnScrimClick}
      timeout={{ appear: 0, exit: animationTimeout }}
    >
      <section
        style={{ '--dynamic-width': width } as CSSProperties}
        className={[
          drawerClassNames.join(' '),
          getClassName(statusClass, mobileModalDisplay ? mobileModalStatus : undefined),
        ].join(' ')}
        ref={(el) => { contentRef.current = el; }}
      >
        <header className={getClassName('bpk-drawer__header')}>
          <h2 id={headingId} className={headerClassNames.join(' ')}>
            {title}
          </h2>
          &nbsp;
          {closeText ? (
            <BpkButtonLink onClick={() => handleClose()}>{closeText}</BpkButtonLink>
          ) : (
            <div className={getClassName('bpk-drawer__close-button')}>
              <BpkCloseButton label={closeLabel || ''} onClick={() => handleClose()} />
            </div>
          )}
        </header>
        <div className={contentsClassNames.join(' ')}>{children}</div>
      </section>
    </BpkDialogWrapper>
  );
}

export default BpkDrawer;
