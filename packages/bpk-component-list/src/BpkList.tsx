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

import type { ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkList.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: ReactNode;
  ordered?: boolean;
  className?: string | null;
  ariaLabel?: string;
  ariaLabelledby?: string;
  title?: string;
};

const BpkList = ({
  ariaLabel,
  ariaLabelledby,
  children,
  className = null,
  ordered = false,
  title,
}: Props) => {
  const ListElement = ordered ? 'ol' : 'ul';
  const classNames = getClassName('bpk-list', className);

  return (
    <ListElement
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      title={title}
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props -- className is required to apply Bpk list styles and allow optional consumer-supplied classes
      className={classNames}
    >
      {children}
    </ListElement>
  );
};

export default BpkList;
