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
import type { ReactNode} from "react";
import { useState } from "react";

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkButtonLink } from '../../bpk-component-link';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
import { BpkDialogWrapper } from "../../bpk-dialog-utils/BpkDialogWrapper";
import { cssModules } from "../../bpk-react-utils";
import BpkNavigationBar from "../../bpk-component-navigation-bar";

import STYLES from './BpkBottomSheetV2.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  actionText?: string;
  ariaLabelledby: string;
  children: ReactNode;
  closeLabel?: string;
  id: string;
  onAction?: () => void;
  onClose: () => void;
  title?: string;
  wide?: boolean;
  isOpen: boolean;
}

export const BpkBottomSheetV2 = ({
  actionText = '',
  ariaLabelledby,
  children,
  closeLabel = '',
  id,
  isOpen,
  onAction = () => null,
  onClose,
  title = '',
  wide = false
}: Props) => {
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true)
    setTimeout(() => {
      onClose()
      setExiting(false)
    }, 240)
  }

  const headingId = `bpk-bottom-sheet-v2-heading-${id}`;

  return <BpkDialogWrapper
    ariaLabelledby={ariaLabelledby}
    dialogClassName={getClassName('bpk-bottom-sheet-v2')}
    id="test"
    isOpen={isOpen}
    onClose={handleClose}
    exiting={exiting}
    transitionClassNames={{
      appear: getClassName('bpk-bottom-sheet-v2--appear'),
      appearActive: getClassName('bpk-bottom-sheet-v2--appear-active'),
      exit: getClassName('bpk-bottom-sheet-v2--exit')
    }}
    timeout={{appear: 240, exit: 240}}
    >
    <>
      <header className={getClassName('bpk-bottom-sheet-v2--header')}>
        <BpkNavigationBar
          id={headingId}
          className={getClassName('bpk-bottom-sheet-v2--navigation')}
          title={title &&
            <h2
              id={headingId}
              className={getClassName('bpk-bottom-sheet-v2--heading')}
            >
              {title}
            </h2>
          }
          leadingButton={
            <BpkCloseButton
              className={getClassName('bpk-bottom-sheet-v2--close-button')}
              label={closeLabel}
              onClick={handleClose}
            />
          }
          trailingButton={
            actionText && onAction ? (
              <BpkButtonLink
                className={getClassName('bpk-bottom-sheet-v2--action-button')}
                onClick={onAction}
              >
                {actionText}
              </BpkButtonLink>
            ) :
            <div
              className={getClassName('bpk-bottom-sheet-v2--action-button')}
            />
          }
        />
      </header>
      <div className={getClassName('bpk-bottom-sheet-v2--content')}>{children}</div>
  </>
  </BpkDialogWrapper>
}
