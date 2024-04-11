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

import { cssModules } from '../../bpk-react-utils';

import BpkBaseSkeleton from './BpkBaseSkeleton';
import getCustomStyles from './utils';

import type { CUSTOM_SIZE_TYPE } from './common-types';

import STYLES from './BpkCircleSkeleton.module.scss';

const getClassName = cssModules(STYLES);

export const CIRCLE_SIZE_TYPES = {
  small: 'small',
  default: 'default',
} as const;

export type CircleSizeType = (typeof CIRCLE_SIZE_TYPES)[keyof typeof CIRCLE_SIZE_TYPES] | CUSTOM_SIZE_TYPE;

type Props = {
  size?: CircleSizeType,
  className?: string | null;
  ariaLabel?: string;
};

const BpkCircleSkeleton = ({
  ariaLabel = '',
  className = null,
  size = CIRCLE_SIZE_TYPES.default
 }: Props) => {
  const classNames = [getClassName('bpk-circle-skeleton')];
  let styleObj;

  if(typeof size === 'object') {
    styleObj = getCustomStyles(size);
  } else if(Object.values(CIRCLE_SIZE_TYPES).includes(size)) {
    classNames.push(getClassName(`bpk-circle-skeleton__${size}`))
  }

  if (className) {
    classNames.push(className);
  }

  return (
    <BpkBaseSkeleton className={classNames.join(' ')} ariaLabel={ariaLabel} styleObj={styleObj} />
  )};

export default BpkCircleSkeleton;
