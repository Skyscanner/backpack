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

import type { ComponentProps } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { withButtonAlignment } from '../../bpk-component-icon';
import ClearIcon from '../../bpk-component-icon/sm/close-circle';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkClearButton.module.scss';

const getClassName = cssModules(STYLES);

const ClearButtonIcon = withButtonAlignment(ClearIcon);

interface Props extends ComponentProps<'button'> {
  label: string;
}

const BpkClearButton = ({ className, label, onClick, ...rest }: Props) => {
  const classNames = [getClassName('bpk-clear-button')];

  if (className) {
    classNames.push(className);
  }

  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      aria-label={label}
      className={classNames.join(' ')}
      {...rest}
    >
      <ClearButtonIcon
        focusable="false" // prevents focus on IE11
        className={getClassName('bpk-clear-button__icon')}
      />
    </button>
  );
};

export default BpkClearButton;
