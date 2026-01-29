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

import type { ComponentType } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxCardIconProps = {
  /**
   * Backpack icon component (import from bpk-component-icon)
   * Pass the component itself, not an instance
   */
  icon: ComponentType<{ className?: string }>;

  /**
   * Icon size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
};

/**
 * BpkCheckboxCard.Icon - Icon slot component
 *
 * Displays a Backpack icon within the checkbox card.
 * Accepts Backpack icon component types and applies appropriate sizing.
 *
 * @example
 * import LandmarkIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/landmark';
 *
 * <BpkCheckboxCard.Icon icon={LandmarkIcon} size="lg" />
 */
export function BpkCheckboxCardIcon({ icon: Icon, size = 'md' }: BpkCheckboxCardIconProps) {
  const className = getClassName(
    'bpk-checkbox-card-icon',
    `bpk-checkbox-card-icon--size-${size}`
  );

  return (
    <div className={className}>
      <Icon />
    </div>
  );
}
