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
import type { ReactNode } from "react";

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkButtonLink } from '../../bpk-component-link';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkNavigationBar from '../../bpk-component-navigation-bar';
import { TransitionInitialMount, cssModules } from "../../bpk-react-utils";

import STYLES from './BpkBottomSheetInner.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  actionText?: string;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
  contentClassName?: string;
  id: string;
  onAction?: () => void;
  onClose: () => void;
  title?: string;
  wide?: boolean;
}

const BpkBottomSheetInner = ({
  actionText = '',
  children,
  className = '',
  closeLabel = '',
  contentClassName = '',
  id,
  onAction = () => null,
  onClose,
  title = '',
  wide = false
}: Props) => {
  const classNames = [getClassName('bpk-bottom-sheet')];

  if (wide) {
    classNames.push(getClassName('bpk-bottom-sheet--wide'))
  }
  if (className) {
    classNames.push(className);
  }

  const contentClassNames = [getClassName('bpk-bottom-sheet--content')]

  if (contentClassName) {
    contentClassNames.push(contentClassName)
  }

  const headingId = `bpk-modal-heading-${id}`;

  return <TransitionInitialMount
  appearClassName={getClassName('bpk-bottom-sheet--appear')}
  appearActiveClassName={getClassName('bpk-bottom-sheet--appear-active')}
  transitionTimeout={240}
 >
  <section
    id={id}
    tabIndex={-1}
    role="dialog"
    aria-labelledby={headingId}
    className={classNames.join(' ')}
  >
    <header className={getClassName('bpk-bottom-sheet--header')}>
      <BpkNavigationBar
        id={headingId}
        className={getClassName('bpk-bottom-sheet--navigation')}
        title={
          <h2
            id={headingId}
            className={getClassName('bpk-bottom-sheet--heading')}
          >
            {title}
          </h2>
        }
        leadingButton={
          <BpkCloseButton
            className={getClassName('bpk-bottom-sheet--close-button')}
            label={closeLabel}
            onClick={onClose}
          />
        }
        trailingButton={
          actionText && onAction ? (
            <BpkButtonLink
              className={getClassName('bpk-bottom-sheet--action-button')}
              onClick={onAction}
            >
              {actionText}
            </BpkButtonLink>
          ) :
          <div
            className={getClassName('bpk-bottom-sheet--action-button')}
           />

        }
      />
    </header>
    <div className={contentClassNames.join(' ')}>{children}</div>
  </section>
 </TransitionInitialMount>
}

export default BpkBottomSheetInner;
