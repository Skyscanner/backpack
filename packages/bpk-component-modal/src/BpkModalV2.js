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

import { type Node, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import BpkCloseButton from '../../bpk-component-close-button';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules, withDefaultProps } from '../../bpk-react-utils';

import STYLES from './BpKModalV2.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  id: string | undefined,
  ariaLabelledby: string,
  children: Node,
  closeLabel: string,
  fullScreenOnDesktop: boolean,
  isOpen: boolean,
  noFullScreenOnMobile: boolean,
  onClose: (event: SyntheticEvent<>) => void | null,
  padded: boolean,
  title: ?string | null,
  wide: boolean,
};

const Heading = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.label1,
  tagName: 'h2',
  className: getClassName('bpk-modal__title'),
});

type DialogProps = {
  isDialogOpen: boolean,
};

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
    title,
    wide,
  } = props;

  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal?.();

      const dialog = document.getElementById(id);
      if (dialog) {
        dialog.addEventListener('click', (event) =>
          event.target?.id === id ? ref.current?.close?.() : null,
        );
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
    'bpk-modal_container',
    fullScreenOnDesktop && 'bpk-modal__container--full-screen-desktop',
    padded && 'bpk-modal__container--padded',
  );

  const closeButton = (
    <div>
      <BpkCloseButton label={closeLabel} onClick={onClose} />
    </div>
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
        {title ? (
          <div className={getClassName('bpk-modal__header-title')}>
            <div className={getClassName('bpk-modal__header-title-container')}>
              <Heading>{title}</Heading>
            </div>
            {closeButton}
          </div>
        ) : (
          <div className={getClassName('bpk-modal__button-container')}>
            {closeButton}
          </div>
        )}
        <div className={contentClassNames}>{children}</div>
      </dialog>
    </div>
  ) : null;
};

BpkModalV2.propTypes = {
  ariaLabelledby: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  closeLabel: PropTypes.string.isRequired,
  fullScreenOnDesktop: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  noFullScreenOnMobile: PropTypes.bool,
  padded: PropTypes.bool,
  title: PropTypes.string,
  wide: PropTypes.bool,
};

BpkModalV2.defaultProps = {
  fullScreenOnDesktop: false,
  noFullScreenOnMobile: false,
  padded: true,
  title: '',
  wide: false,
};
