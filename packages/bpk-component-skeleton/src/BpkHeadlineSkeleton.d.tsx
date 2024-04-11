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

import type { CUSTOM_SIZE_TYPE } from './common-types';

export declare const HEADLINE_SIZE_TYPES: {
  small: 'small',
  default: 'default',
  large: 'large',
};

export type HeadlineSizeType = (typeof HEADLINE_SIZE_TYPES)[keyof typeof HEADLINE_SIZE_TYPES] | CUSTOM_SIZE_TYPE;

type Props = {
  size?: HeadlineSizeType,
  className?: string | null;
  ariaLabel?: string;
};

declare const BpkHeadlineSkeleton: ({
  ariaLabel,
  className,
  size
 }: Props) => JSX.Element;

export default BpkHeadlineSkeleton;
