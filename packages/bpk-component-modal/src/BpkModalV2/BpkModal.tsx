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
import { useEffect, useRef } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../../bpk-component-close-button';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import { cssModules, withDefaultProps } from '../../../bpk-react-utils';

import STYLES from './BpKModal.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  id: string | undefined;
  ariaLabelledby: string;
  children: ReactNode;
  closeLabel: string;
  fullScreenOnDesktop?: boolean;
  isOpen: boolean;
  noFullScreenOnMobile?: boolean;
  onClose: () => void | null;
  padded?: boolean;
  showHeader: boolean;
  title?: string | null;
  wide?: boolean;
};

const Header = ({
  closeLabel,
  onClose,
  title,
}: {
  closeLabel: string;
  onClose: () => void | null;
  title?: string | null;
}) => {
  if (title) {
    return (
      <div className={getClassName('bpk-modal__header-title')}>
        <div className={getClassName('bpk-modal__header-title-container')}>
          <Heading>{title}</Heading>
        </div>
        <BpkCloseButton label={closeLabel} onClick={onClose} />
      </div>
    );
  }
  return (
    <div className={getClassName('bpk-modal__button-container')}>
      <BpkCloseButton label={closeLabel} onClick={onClose} />
    </div>
  );
};

const Heading = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.label1,
  tagName: 'h2',
  className: getClassName('bpk-modal__title'),
});

type DialogProps = {
  isDialogOpen: boolean;
};

// TODO: this check if the browser support the HTML dialog element. We can remove it once we drop support as a business for Safari 14
const dialogSupported = typeof HTMLDialogElement === 'function';

const setPageProperties = ({ isDialogOpen }: DialogProps) => {
  document.body.style.overflowY = isDialogOpen ? 'hidden' : 'visible';

  if (!dialogSupported) {
    document.body.style.position = isDialogOpen ? 'fixed' : 'relative';
    document.body.style.width = isDialogOpen ? '100%' : 'auto';
  }
};

export const BpkModalV2 = (props: Props) => {
  const {
    ariaLabelledby,
    children,
    closeLabel,
    fullScreenOnDesktop,
    id,
    isOpen,
    noFullScreenOnMobile,
    onClose,
    padded,
    showHeader,
    title,
    wide,
  } = props;

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal?.();

      const dialog = document.getElementById(`${id}`);
      if (dialog) {
        dialog.addEventListener('click', (event: Event) => {
          const { target } = event;

          if (target instanceof HTMLElement && target.id === `${id}`) {
            ref.current?.close?.();
          }
        });
      }
    } else {
      ref.current?.close?.();
    }

    setPageProperties({ isDialogOpen: isOpen });
    return () => setPageProperties({ isDialogOpen: false });
  }, [id, isOpen]);

  const classNames = getClassName(
    'bpk-modal',
    fullScreenOnDesktop && 'bpk-modal--full-screen-desktop',
    noFullScreenOnMobile && 'bpk-modal--no-full-screen-mobile',
    wide && 'bpk-modal--wide',
  );

  const contentClassNames = getClassName(
    'bpk-modal__container',
    fullScreenOnDesktop && 'bpk-modal__container--full-screen-desktop',
    padded && 'bpk-modal__container--padded',
  );

  return isOpen ? (
    <div
      className={getClassName(
        'bpk-modal-wrapper',
        dialogSupported ? '' : 'bpk-modal-polyfill',
      )}
    >
      {!dialogSupported && (
        <div
          id={`${id}-polyfill`}
          className={getClassName('bpk-modal-backdrop')}
          data-open={isOpen}
        />
      )}
      <dialog
        id={id}
        className={classNames}
        onClose={onClose}
        aria-labelledby={ariaLabelledby}
        data-open={isOpen}
        ref={ref}
      >
        {showHeader && (
          <Header title={title} closeLabel={closeLabel} onClose={onClose} />
        )}
        <div className={contentClassNames}>{children}</div>
      </dialog>
    </div>
  ) : null;
};
