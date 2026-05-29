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

import type { ReactNode } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
import BpkLink from '../../bpk-component-link';
import BpkNavigationBar, {
  BAR_STYLES,
} from '../../bpk-component-navigation-bar';
import { TransitionInitialMount, cssModules } from '../../bpk-react-utils';

import STYLES from './BpkModalInner.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  id: string;
  children: ReactNode;
  wide?: boolean;
  isIphone: boolean;
  showHeader?: boolean;
  fullScreenOnMobile?: boolean;
  fullScreen?: boolean;
  padded?: boolean;
  dialogRef: (ref: HTMLElement | null | undefined) => void;
  onClose?: () => void;
  className?: string | null;
  contentClassName?: string | null;
  title?: string | null;
  closeLabel?: string;
  closeText?: string | null;
  modalStyle?: ModalStyle;
  /**
   * The accessory view allows for icons and actions to be placed in front of the main title inside the modal header. To be used with `BpkNavigationBarButtonLink`
   */
  accessoryView?: ReactNode;
  ariaLabel?: string // optional aria label for scenario when header is disabled
};

export const MODAL_STYLING = {
  default: 'default',
  surfaceContrast: 'surface-contrast',
};
export type ModalStyle = (typeof MODAL_STYLING)[keyof typeof MODAL_STYLING];

const BpkModalInner = ({
  accessoryView = null,
  ariaLabel,
  children,
  className = null,
  closeLabel = '',
  closeText = null,
  contentClassName = null,
  dialogRef,
  fullScreen = false,
  fullScreenOnMobile = true,
  id,
  isIphone,
  modalStyle = MODAL_STYLING.default,
  onClose = () => null,
  padded = true,
  showHeader = true,
  title = null,
  wide = false,
}: Props) => {
  const classNames = [getClassName('bpk-modal')];
  const contentClassNames = [getClassName('bpk-modal__content')];
  const navigationStyles = [getClassName('bpk-modal__navigation')];

  classNames.push(getClassName(`bpk-modal__modal-style--${modalStyle}`));

  if (wide) {
    classNames.push(getClassName('bpk-modal--wide'));
  }
  if (className) {
    classNames.push(className);
  }

  if (fullScreen || isIphone) {
    classNames.push(getClassName('bpk-modal--full-screen'));
  } else if (fullScreenOnMobile) {
    classNames.push(getClassName('bpk-modal--full-screen-mobile'));
  }

  if (padded) {
    contentClassNames.push(getClassName('bpk-modal__content--padded'));
  }

  if (contentClassName) {
    contentClassNames.push(contentClassName);
  }

  const headingId = `bpk-modal-heading-${id}`;

  const accessoryViewFinal = accessoryView ? (
    <span className={getClassName('bpk-modal__accessory-view')}>
      {accessoryView}
    </span>
  ) : null;

  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-modal--appear')}
      appearActiveClassName={getClassName('bpk-modal--appear-active')}
      transitionTimeout={300}
    >
      <section
        id={id}
        tabIndex={-1}
        role="dialog"
        aria-labelledby={showHeader ? headingId : undefined}
        aria-label={!showHeader ? ariaLabel : undefined}
        className={classNames.join(' ')}
        ref={dialogRef}
      >
        {showHeader && (
          <header className={getClassName('bpk-modal__header')}>
            <BpkNavigationBar
              barStyle={
                modalStyle === MODAL_STYLING.surfaceContrast
                  ? BAR_STYLES.onDark
                  : BAR_STYLES.default
              }
              id={headingId}
              className={navigationStyles.join(' ')}
              title={
                <h2
                  id={headingId}
                  className={getClassName('bpk-modal__heading')}
                >
                  {title}
                </h2>
              }
              leadingButton={accessoryViewFinal}
              trailingButton={
                closeText ? (
                  <BpkLink
                    as="button"
                    onClick={onClose}
                    alternate={modalStyle === MODAL_STYLING.surfaceContrast}
                  >
                    {closeText}
                  </BpkLink>
                ) : (
                  <BpkCloseButton
                    label={closeLabel}
                    onClick={onClose}
                    onDark={modalStyle === MODAL_STYLING.surfaceContrast}
                  />
                )
              }
            />
          </header>
        )}
        <div className={contentClassNames.join(' ')}>{children}</div>
      </section>
    </TransitionInitialMount>
  );
};

export default BpkModalInner;
