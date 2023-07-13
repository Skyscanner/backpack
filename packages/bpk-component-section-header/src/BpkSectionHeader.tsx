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

/* @flow strict */
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import STYLES from './BpkSectionHeader.module.scss';

const getClassName = cssModules(STYLES);

export const SECTION_TYPES = {
  default: 'default',
  onDark: 'onDark',
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
}: Props) => {
  const onDark = type === SECTION_TYPES.onDark;
  return (
    <div
      className={getClassName(
        'bpk-section-header',
        onDark && 'bpk-section-header--on-dark',
      )}
    >
      <div
        className={getClassName(
          'bpk-section-header--title-description',
          onDark && 'bpk-section-header--title-description--on-dark',
        )}
      >
        <BpkText
          tagName="h2"
          className={getClassName('bpk-section-header--title')}
        >
          {title}
        </BpkText>
        {description && <BpkText>{description}</BpkText>}
      </div>
      {button}
    </div>
  );
};

export default BpkSectionHeader;
