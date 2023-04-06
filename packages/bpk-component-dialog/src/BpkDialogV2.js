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

import { type Node, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import BpkCloseButton from '../../bpk-component-close-button';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpKDialogV2.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  id: string | undefined,
  ariaLabelledby: string,
  children: Node,
  closeLabel: string,
  isOpen: boolean,
  onClose: () => void,
  title: ?string | null,
  showHeader: ?boolean | undefined,
};

type DialogProps = {
  isDialogOpen: boolean,
};

const BpkDialogV2 = (props: Props) => {
  const {
    ariaLabelledby,
    children,
    closeLabel,
    id,
    isOpen,
    onClose,
    showHeader,
    title,
  } = props;

  const dialogSupported = typeof HTMLDialogElement === 'function';

  const setPageProperties = ({ isDialogOpen }: DialogProps) => {
    document.body.style.overflowY = isDialogOpen ? 'hidden' : 'visible';

    if (!dialogSupported) {
      document.body.style.position = isDialogOpen ? 'fixed' : 'relative';
      document.body.style.width = isDialogOpen ? '100%' : 'auto';
    }
  };

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal?.();

      const dialog = document.getElementById(`${id}`);

      if (dialog) {
        dialog.addEventListener('click', (event) => {
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

  return isOpen ? (
    <div
      className={getClassName(
        'bpk-dialog-wrapper',
        dialogSupported ? '' : 'bpk-dialog-polyfill',
      )}
    >
      {!dialogSupported && (
        <div
          id={`${id}-polyfill`}
          className={getClassName('bpk-dialog-backdrop')}
          data-open={isOpen}
        />
      )}
      <dialog
        id={id}
        className={getClassName('bpk-dialog')}
        onClose={onClose}
        aria-labelledby={ariaLabelledby}
        data-open={isOpen}
        ref={ref}
      >
        {showHeader && (
          <div className={getClassName('bpk-dialog__title')}>
            <h2 className={getClassName('bpk-dialog__heading')}>{title}</h2>

            <BpkCloseButton
              className={getClassName('bpk-dialog__close-button')}
              label={closeLabel}
              onClick={onClose}
            />
          </div>
        )}
        <div className={getClassName('bpk-dialog__container')}>{children}</div>
      </dialog>
    </div>
  ) : null;
};

BpkDialogV2.propTypes = {
  id: PropTypes.string.isRequired,
  ariaLabelledby: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  closeLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  showHeader: PropTypes.bool,
};

BpkDialogV2.defaultProps = {
  title: '',
  showHeader: false,
};

export default BpkDialogV2;
