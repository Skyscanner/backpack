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
import { BpkButtonLink } from '../../bpk-component-button';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import { BACKGROUND_ID, X_ID } from './constants';
import STYLES from './BpkBottomSheet.module.scss';

const getClassName = cssModules(STYLES);

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
        className={getClassName('bpk-container')}
        onMouseDown={() => clickHandler(BACKGROUND_ID)}
        onTouchStart={() => clickHandler(BACKGROUND_ID)}
      />

      <div className={getClassName('bpk-contentContainer')}>
        <div className={getClassName('bpk-header')}>
          {isClosable && (
            <BpkCloseButton
              onClick={() => clickHandler(X_ID)}
              label={closeButtonLabel}
              className={getClassName('bpk-closeIcon')}
            />
          )}
          {title && (
            <BpkText
              tagName="h2"
              textStyle={TEXT_STYLES.heading5}
              className={getClassName('bpk-title')}
            >
              {title}
            </BpkText>
          )}
          {action && (
            <BpkButtonLink
              onClick={() => action()}
              textStyle={TEXT_STYLES.heading5}
              className={getClassName('bpk-action')}
            >
              {actionText}
            </BpkButtonLink>
          )}
        </div>
        {children}
      </div>
    </>
  ) : null;
};

export default BpkBottomSheet;
