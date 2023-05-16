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

export declare const BADGE_TYPES: {
  readonly warning: 'warning';
  readonly success: 'success';
  readonly critical: 'critical';
  readonly normal: 'normal';
  readonly inverse: 'inverse';
  readonly outline: 'outline';
  readonly strong: 'strong';
  readonly brand: 'brand';
};
export type BadgeType = typeof BADGE_TYPES[keyof typeof BADGE_TYPES];
export type Props = {
  type?: BadgeType;
  docked?: 'right' | 'left' | null;
  centered?: boolean;
  className?: string | null;
  children: string | ReactNode;
  [rest: string]: any;
};
declare const BpkBadge: ({
  centered,
  className,
  docked,
  type,
  ...rest
}: Props) => JSX.Element;
export default BpkBadge;
