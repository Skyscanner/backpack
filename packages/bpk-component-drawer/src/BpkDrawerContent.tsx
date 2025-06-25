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

import type { CSSProperties, ReactNode, RefObject } from 'react';

import { Transition } from 'react-transition-group';

import { animations } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkCloseButton from '../../bpk-component-close-button';
import { BpkButtonLink } from '../../bpk-component-link';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkDrawerContent.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: ReactNode,
  dialogRef: () => RefObject<HTMLElement>,
  onCloseAnimationComplete: () => void,
  onClose: () => void
  id: string,
  title: string,
  width?: string,
  className?: string | null,
  contentClassName?: string,
  closeLabel?: string,
  closeText?: string,
  isDrawerShown?: boolean,
  hideTitle?: boolean,
  closeOnScrimClick?: boolean,
  isIphone?: boolean,
  isIpad?: boolean,
  padded?: boolean,
  mobileModalDisplay?: boolean,
};

const BpkDrawerContent = ({
  children,
  className,
  closeLabel,
  closeOnScrimClick = true, // Unused from withScrim scrim HOC
  closeText,
  contentClassName,
  dialogRef,
  hideTitle = false,
  id,
  isDrawerShown = true,
  isIpad = false, // Unused from withScrim scrim HOC
  isIphone = false, // Unused from withScrim scrim HOC
  mobileModalDisplay = false,
  onClose,
  onCloseAnimationComplete,
  padded,
  title,
  width,
  ...rest
}: Props) => {

  const drawerClassNames = [getClassName('bpk-drawer')];
  const headerClassNames = [getClassName('bpk-drawer__heading')];
  const contentClassNames = [getClassName('bpk-drawer__content')];

  if (className) {
    drawerClassNames.push(className);
  }

  if (hideTitle) {
    headerClassNames.push(getClassName('bpk-drawer__heading--visually-hidden'));
  }

  if (padded) {
    contentClassNames.push(getClassName('bpk-drawer__content--padded'));
  }

  if (contentClassName) {
    contentClassNames.push(contentClassName);
  }

  const headingId = `bpk-drawer-heading-${id}`;

  return (
    <Transition
      timeout={{
        enter: 0,
        exit: parseInt(animations.durationSm, 10),
      }}
      appear
      enter={false}
      exit
      in={isDrawerShown}
      onExited={onCloseAnimationComplete}
    >
      {(status: string) => (
        <section
          id={id}
          tabIndex={-1}
          role="dialog"
          key="dialog"
          aria-labelledby={headingId}
          style={
            {
              '--dynamic-width': width,
            } as CSSProperties
          }
          className={[
            drawerClassNames.join(' '),
            getClassName(`bpk-drawer--${status}`, mobileModalDisplay ? `bpk-drawer__modal-mobile-view--${status}` : undefined),
          ].join(' ')}
          ref={dialogRef}
          {...rest}
        >
          <header className={getClassName('bpk-drawer__header')}>
            <h2 id={headingId} className={headerClassNames.join(' ')}>
              {title}
            </h2>
            &nbsp;
            {closeText ? (
              <BpkButtonLink onClick={onClose}>{closeText}</BpkButtonLink>
            ) : (
              <div className={getClassName('bpk-drawer__close-button')}>
                // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                // @ts-expect-error TS(2322) FIXME: Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                <BpkCloseButton label={closeLabel} onClick={onClose} />
              </div>
            )}
          </header>
          <div className={contentClassNames.join(' ')}>{children}</div>
        </section>
      )}
    </Transition>
  );
};

export default BpkDrawerContent;
