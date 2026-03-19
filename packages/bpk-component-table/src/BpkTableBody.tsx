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

import type { ReactNode, HTMLAttributes  } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkTable.module.scss';

const getClassName = cssModules(STYLES);

export const TABLE_BODY_TYPES = {
  default: 'default',
  striped: 'striped',
} as const;

type TableBodyType = (typeof TABLE_BODY_TYPES)[keyof typeof TABLE_BODY_TYPES];

export interface BpkTableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the table */
  children: ReactNode;
  /** The type of table body styling */
  type?: TableBodyType;
}

const BpkTableBody = ({children, className, type = TABLE_BODY_TYPES.default,  ...rest}: BpkTableBodyProps) => {
  const classNames =  getClassName(type === TABLE_BODY_TYPES.striped && 'bpk-table__body--striped', className)

  return (
    <tbody {...rest} className={classNames || undefined} >
      {children}
    </tbody>
  );
};

export default BpkTableBody;
