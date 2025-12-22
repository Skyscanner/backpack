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

import type { Element } from 'react';
import { cloneElement } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSelect.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  id: string,
  name: string,
  value: string,
  className: string | null,
  disabled: boolean,
  docked: boolean,
  dockedFirst: boolean,
  dockedLast: boolean,
  dockedMiddle: boolean,
  image: ?Element<any>,
  large: boolean,
  valid: boolean | undefined,
  wrapperClassName: string | null,
};

const BpkSelect = ({
  className = null,
  disabled = false,
  docked = false,
  dockedFirst = false,
  dockedLast = false,
  dockedMiddle = false,
  image = null,
  large = false,
  valid = null,
  wrapperClassName = null,
  ...rest
}: Props) => {
  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  const select = (
    <select
      className={getClassName(
        'bpk-select',
        large && 'bpk-select--large',
        docked && 'bpk-select--docked',
        dockedFirst && 'bpk-select--docked-first',
        dockedMiddle && 'bpk-select--docked-middle',
        dockedLast && 'bpk-select--docked-last',
        isInvalid && 'bpk-select--invalid',
        image && 'bpk-select--with-image',
        image && large && 'bpk-select--with-image-large',
        className,
      )}
      disabled={disabled}
      aria-invalid={isInvalid}
      {...rest}
    />
  );

  if (image) {
    return (
      <div className={getClassName('bpk-select-wrapper', wrapperClassName)}>
        {cloneElement(image, {
          'aria-hidden': true,
          className: getClassName(
            'bpk-select-wrapper__image',
            large && 'bpk-select-wrapper__image--large',
            disabled && 'bpk-select-wrapper__image--disabled',
            image.props.className,
          ),
        })}
        {select}
      </div>
    );
  }
  return select;
};

export default BpkSelect;
