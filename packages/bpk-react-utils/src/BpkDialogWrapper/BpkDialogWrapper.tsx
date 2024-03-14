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
import { useEffect, useRef, useState } from "react";
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import CSSTransition from 'react-transition-group/CSSTransition';

import cssModules from '../cssModules';

import STYLES from './BpkDialogWrapper.module.scss';

const getClassName = cssModules(STYLES);

export interface Props {
  ariaLabelledby: string;
  children: ReactNode;
  closeOnEscPressed?: boolean;
  closeOnScrimClick?: boolean;
  dialogClassName?: string;
  id: string | undefined;
  isOpen: boolean;
  onClose: (
    arg0?: TouchEvent | MouseEvent | KeyboardEvent | SyntheticEvent<HTMLDialogElement, Event>,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
) => void | null;
  exiting?: boolean;
  transitionClassNames?: {
    appear?: string,
    appearActive?: string,
    exit?: string
  };
  timeout?: {appear?: number, exit?: number};
};

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

export const BpkDialogWrapper = (props: Props) => {
  const {
    ariaLabelledby,
    children,
    closeOnEscPressed = false,
    closeOnScrimClick = false,
    dialogClassName = '',
    exiting = false,
    id,
    isOpen,
    onClose,
    timeout = {appear: 0, exit: 0},
    transitionClassNames = {}
  } = props;

  const ref = useRef<HTMLDialogElement>(null);
  const [dialogTarget, setDialogTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = document.getElementById(`${id}`);
    const dialogWithPolyfill = document.getElementById(`${id}-polyfill`);

    const handleBackdropClick = (modal: HTMLElement | null) => {
      if (closeOnScrimClick && modal) {
        modal.addEventListener('click', (event: MouseEvent | PointerEvent) => {
          const { target } = event;

          if (target === modal) {
            onClose(event, {source: "DOCUMENT_CLICK"});
            event.stopPropagation();
          }
        });
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscPressed
        && event.key === 'Escape'
        && (!dialogWithPolyfill || event.target === dialogWithPolyfill)) {
        onClose(event, {source: "ESCAPE"});
      }
      event.stopPropagation();
    };

    if (isOpen) {
      // There is a bug on older versions of browser using chromium (chrome, firefox, edge >114) where the dialog got an open attribute even before it is opened.
      // Therefore, when trying to open it, it crashes and log an error mentioning the dialog has already an open attribute.
      ref.current?.removeAttribute('open');
      ref.current?.showModal?.();

      if (dialogWithPolyfill) {
        setDialogTarget(dialogWithPolyfill);
        handleBackdropClick(dialogWithPolyfill);
        window.addEventListener('keydown', handleKeyDown);
      } else {
        setDialogTarget(dialog);
      }
      handleBackdropClick(dialog);
    } else {
      ref.current?.close?.();
    }

    setPageProperties({ isDialogOpen: isOpen });
    return () => {
      setPageProperties({ isDialogOpen: false })
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id, isOpen, onClose, closeOnEscPressed, closeOnScrimClick]);

  return isOpen ? (
    <div
      className={getClassName(
        'bpk-dialog-wrapper',
        !dialogSupported && 'bpk-dialog-wrapper--polyfill',
      )}
    >
      {!dialogSupported && (
        <div
          id={`${id}-polyfill`}
          className={getClassName('bpk-dialog-wrapper--backdrop')}
          data-open={isOpen}
        />
      )}
      <CSSTransition
        classNames={transitionClassNames}
        in={!exiting}
        appear={!exiting}
        exit={exiting}
        timeout={timeout}
      >
        <dialog
          id={id}
          className={getClassName('bpk-dialog-wrapper--container', dialogClassName)}
          onCancel={(e) => {
            e.preventDefault();
            if (closeOnEscPressed && (!dialogTarget || e.target === dialogTarget)) {
              onClose(e, {source: 'ESCAPE'})
            }
          }}
          aria-labelledby={ariaLabelledby}
          data-open={isOpen}
          ref={ref}
        >
          <div
            className={getClassName('bpk-dialog-wrapper--contents')}
            id={`${id}-contents`}
          >
            {children}
          </div>
        </dialog>
      </CSSTransition>
    </div>
  ) : null;
}
