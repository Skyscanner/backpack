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

import type { CSSProperties, MutableRefObject, ReactNode, Ref } from 'react';
import { useCallback, useRef } from 'react';

import { Transition } from 'react-transition-group';

import { animations } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
import BpkLink from '../../bpk-component-link';
import { cssModules } from '../../bpk-react-utils';

import type { SecondaryPanelProps } from './types';

import STYLES from './BpkDrawerContent.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: ReactNode,
  dialogRef: Ref<HTMLElement>,
  onCloseAnimationComplete: () => void,
  onClose: () => void
  id: string,
  title: ReactNode,
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
  secondaryPanel?: SecondaryPanelProps,
};

const BpkDrawerContent = ({
  children,
  className,
  closeLabel,
  closeOnScrimClick = true,
  closeText,
  contentClassName,
  dialogRef,
  hideTitle = false,
  id,
  isDrawerShown = true,
  isIpad = false,
  isIphone = false,
  mobileModalDisplay = false,
  onClose,
  onCloseAnimationComplete,
  padded,
  secondaryPanel,
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

  if (secondaryPanel?.isOpen) {
    drawerClassNames.push(getClassName('bpk-drawer--dual-panel'));
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

  const drawerHeader = (
    <header className={getClassName('bpk-drawer__header')}>
      <h2 id={headingId} className={headerClassNames.join(' ')}>
        {title}
      </h2>
      {closeText ? (
        <BpkLink as="button" onClick={onClose}>{closeText}</BpkLink>
      ) : (
        <div className={getClassName('bpk-drawer__close-button')}>
          <BpkCloseButton label={closeLabel} onClick={onClose} />
        </div>
      )}
    </header>
  );

  const nodeRef = useRef<HTMLElement | null>(null);
  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      nodeRef.current = el;
      const consumerRef = dialogRef;
      if (typeof consumerRef === 'function') {
        consumerRef(el);
      } else if (consumerRef) {
        (consumerRef as MutableRefObject<HTMLElement | null>).current = el;
      }
    },
    [dialogRef],
  );

  return (
    <Transition
      nodeRef={nodeRef}
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
          ref={setRefs}
          {...rest}
        >
          {secondaryPanel?.isOpen ? (
            <div className={getClassName('bpk-drawer__panels')}>
              <div className={getClassName('bpk-drawer__primary')}>
                {drawerHeader}
                <div className={contentClassNames.join(' ')}>{children}</div>
              </div>
              <div
                role="complementary"
                aria-label={secondaryPanel.ariaLabel}
                className={getClassName('bpk-drawer__secondary')}
                data-testid="secondary-panel"
              >
                {secondaryPanel.title ? (
                  <header className={getClassName('bpk-drawer__header')}>
                    <h2 className={getClassName('bpk-drawer__heading')}>
                      {secondaryPanel.title}
                    </h2>
                    <div className={getClassName('bpk-drawer__close-button')}>
                      <BpkCloseButton label={secondaryPanel.closeLabel ?? closeLabel} onClick={secondaryPanel.onClose} />
                    </div>
                  </header>
                ) : (
                  <div className={getClassName('bpk-drawer__secondary-close')}>
                    <BpkCloseButton label={secondaryPanel.closeLabel ?? closeLabel} onClick={secondaryPanel.onClose} />
                  </div>
                )}
                <div className={getClassName('bpk-drawer__secondary-content')}>
                  {secondaryPanel.children}
                </div>
              </div>
            </div>
          ) : (
            <>
              {drawerHeader}
              <div className={contentClassNames.join(' ')}>{children}</div>
            </>
          )}
        </section>
      )}
    </Transition>
  );
};

export default BpkDrawerContent;
