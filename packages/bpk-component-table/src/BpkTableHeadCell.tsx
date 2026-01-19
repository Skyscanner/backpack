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

import PropTypes from 'prop-types';
import type { ReactNode, HTMLAttributes } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkTable.module.scss';

const getClassName = cssModules(STYLES);

export type BpkTableHeadCellProps = {
  children: ReactNode;
  className?: string | null;
  wordBreak?: boolean;
} & Omit<HTMLAttributes<HTMLTableCellElement>, 'className'>;

const BpkTableHeadCell = ({ children, className = null, wordBreak = false, ...rest }: BpkTableHeadCellProps) => {

  const classes = [
    'bpk-table__cell',
    'bpk-table__cell--head',
    wordBreak && 'bpk-table__cell--wordBreak',
    className,
  ];

  const classNames = getClassName(...classes);

  return (
    <th className={classNames} {...rest}>
      {children}
    </th>
  );
};

BpkTableHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wordBreak: PropTypes.bool,
};

export default BpkTableHeadCell;
