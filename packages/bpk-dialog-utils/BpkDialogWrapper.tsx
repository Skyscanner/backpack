import type { ReactNode} from "react";
import { useEffect, useRef } from "react";
import CSSTransition from 'react-transition-group/CSSTransition';

import { cssModules } from '../bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.

import STYLES from './BpkDialogWrapper.module.scss';

const getClassName = cssModules(STYLES);

export interface Props {
  ariaLabelledby: string;
  children: ReactNode;
  dialogClassName?: string;
  id: string | undefined;
  isOpen: boolean;
  onClose: () => void | null;
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
    dialogClassName = '',
    exiting = false,
    id,
    isOpen,
    onClose,
    timeout = {appear: 0, exit: 0},
    transitionClassNames = {}
  } = props;

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = document.getElementById(`${id}`);
    const dialogWithPolyfill = document.getElementById(`${id}-polyfill`);

    const handleBackdropClick = (modal: HTMLElement | null) => {
      if (modal) {
        modal.addEventListener('click', (event: Event) => {
          const { target } = event;

          if (target === modal) {
            modal === dialog ? ref.current?.close?.() : onClose();
          }
        });
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
          onClose();
      }
    };

    if (isOpen) {
      // There is a bug on older versions of browser using chromium (chrome, firefox, edge >114) where the dialog got an open attribute even before it is opened.
      // Therefore, when trying to open it, it crashes and log an error mentioning the dialog has already an open attribute.
      ref.current?.removeAttribute('open');
      ref.current?.showModal?.();

      if (dialogWithPolyfill) {
        handleBackdropClick(dialogWithPolyfill);
        window.addEventListener('keydown', handleKeyDown);
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
  }, [id, isOpen, onClose]);

  return isOpen ? (
    <div
      className={getClassName(
        'bpk-dialog-wrapper',
        dialogSupported ? '' : 'bpk-dialog-wrapper--polyfill',
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
          onClose={onClose}
          aria-labelledby={ariaLabelledby}
          data-open={isOpen}
          ref={ref}
        >
          <div className={getClassName('bpk-dialog-wrapper--contents')}>{children}</div>
        </dialog>
      </CSSTransition>
    </div>
  ) : null;
}
