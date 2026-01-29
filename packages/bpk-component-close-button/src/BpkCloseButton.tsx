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

import type { SyntheticEvent, FunctionComponent } from 'react';

import CloseIcon from '../../bpk-component-icon/sm/close';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkCloseButton.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  label: string;
  onClick: (event: SyntheticEvent<any>) => any;
  className?: string | null;
  customIcon?: FunctionComponent<any> | null;
  onDark?: Boolean;
};

const BpkCloseButton = ({
  className = null,
  customIcon = null,
  label,
  onClick,
  onDark = false,
  ...rest
}: Props) => {
  const classNames = [
    onDark
      ? getClassName('bpk-close-button__onDark')
      : getClassName('bpk-close-button__default'),
  ];
  const Icon = customIcon || CloseIcon;

  if (className) {
    classNames.push(className);
  }

  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      aria-label={label}
      className={classNames.join(' ')} {...getDataComponentAttribute('CloseButton')}
      {...rest}
    >
      <span className={getClassName('bpk-close-button-icon')}>
        <Icon />
      </span>
    </button>
  );
};

export default BpkCloseButton;
