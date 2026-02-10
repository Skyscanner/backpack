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

import type { MouseEvent, ReactNode } from 'react';

import { Checkbox } from '@ark-ui/react/checkbox';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxLabelProps = {
  children: ReactNode;
  className?: string | null;
};

const BpkCheckboxLabel = ({
  children,
  className = null,
}: BpkCheckboxLabelProps) => {
  const handleClick = (e: MouseEvent) => {
    // Allow links inside the label to be clicked without toggling the checkbox
    if ((e.target as HTMLElement).closest('a')) {
      e.stopPropagation();
    }
  };

  return (
    <Checkbox.Label
      className={getClassName(
        'bpk-checkbox__label',
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </Checkbox.Label>
  );
};

export default BpkCheckboxLabel;
