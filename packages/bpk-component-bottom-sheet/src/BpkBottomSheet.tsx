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

import type { ReactChild, ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButton from '../../bpk-component-button';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import { BACKGROUND_ID, X_ID } from './constants';
import STYLES from './BpkBottomSheet.scss';

type CommonProps = {
  backgroundClickHandler?: () => void;
  handleMount?: () => void;
  genericClickHandler?: () => void;
  children: ReactChild;
  title?: string;
};

type CloseButtonProps =
  | {
      closeButtonLabel?: never;
      closeClickHandler?: never;
      isClosable: false;
    }
  | {
      closeButtonLabel: string;
      closeClickHandler?: () => void;
      isClosable?: true;
    };

type ActionProps =
  | {
      action: () => void;
      actionText: string;
    }
  | {
      action?: undefined;
      actionText?: never;
    };

type Props = CloseButtonProps & CommonProps & ActionProps;

const BpkBottomSheet = ({
  action,
  actionText,
  backgroundClickHandler,
  children,
  closeButtonLabel,
  closeClickHandler,
  genericClickHandler,
  handleMount,
  isClosable = true,
  title,
}: Props): ReactElement | null => {
  const [isOpen, setIsOpen] = useState(true);

  const clickHandler = useCallback(
    (id: string) => {
      setIsOpen(false);
      genericClickHandler && genericClickHandler();
      if (id === X_ID) {
        closeClickHandler && closeClickHandler();
      }
      if (id === BACKGROUND_ID) {
        backgroundClickHandler && backgroundClickHandler();
      }
    },
    [backgroundClickHandler, closeClickHandler, genericClickHandler],
  );

  useEffect(() => {
    handleMount && handleMount();
  }, [handleMount]);

  return isOpen ? (
    <>
      <div
        role="presentation"
        className={STYLES.container}
        onMouseDown={() => clickHandler(BACKGROUND_ID)}
        onTouchStart={() => clickHandler(BACKGROUND_ID)}
      />

      <div className={STYLES.contentContainer}>
        <div className={STYLES.header}>
          {isClosable && (
            <BpkCloseButton
              onClick={() => clickHandler(X_ID)}
              label={closeButtonLabel}
              className={STYLES.closeIcon}
            />
          )}
          {title && (
            <BpkText
              tagName="h2"
              textStyle={TEXT_STYLES.heading5}
              className={STYLES.title}
            >
              {title}
            </BpkText>
          )}
          {action && (
            <BpkButton onClick={() => action()} className={STYLES.action}>
              {actionText}
            </BpkButton>
          )}
        </div>
        {children}
      </div>
    </>
  ) : null;
};

export default BpkBottomSheet;
