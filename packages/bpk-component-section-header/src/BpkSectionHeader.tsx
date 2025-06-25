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

import BpkText from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

// @ts-expect-error TS(2307): Cannot find module './BpkSectionHeader.module.scss... Remove this comment to see the full error message
import STYLES from './BpkSectionHeader.module.scss';

const getClassName = cssModules(STYLES);

export const SECTION_TYPES = {
  default: 'default',
  onDark: 'on-dark',
} as const;

export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];

type Props = {
  title: string;
  description?: string;
  button?: ReactNode;
  type?: SectionType;
};

const BpkSectionHeader = ({
  button,
  description,
  title,
  type = SECTION_TYPES.default,
}: Props) => (
  <div className={getClassName('bpk-section-header')}>
    <div
      className={getClassName(
        'bpk-section-header__title-description',
        `bpk-section-header__title-description--${type}`,
      )}
    >
      <h2 className={getClassName('bpk-section-header__title')}>{title}</h2>
      {description && (
        <span className={getClassName('bpk-section-header__description')}>
          <BpkText>{description}</BpkText>
        </span>
      )}
    </div>
    {button}
  </div>
);

export default BpkSectionHeader;
