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

import { BpkVStack } from '../../bpk-component-layout/src/BpkStack';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { SURFACE_COLORS } from './common-types';

import type { SurfaceBgColor, TextColor } from './common-types';
import type { BpkSpacingValue } from '../../bpk-component-layout/src/tokens';

import STYLES from './BpkAiBase.module.scss';

const getClassName = cssModules(STYLES);

type BpkAiBaseRootProps = {
  children: ReactNode;
  backgroundColor?: SurfaceBgColor;
  color?: TextColor;
  gap?: BpkSpacingValue;
  padding?: BpkSpacingValue;
};

const BpkAiBaseRoot = ({
  backgroundColor = SURFACE_COLORS.surfaceDefault,
  children,
  color,
  gap,
  padding,
}: BpkAiBaseRootProps) => {
  const classNames = getClassName(
    'bpk-ai-base',
    `bpk-ai-base--${backgroundColor}`,
    color && `bpk-ai-base--${color}`,
  );

  return (
    <div className={classNames} {...getDataComponentAttribute('AiBase')}>
      <BpkVStack gap={gap} padding={padding}>{children}</BpkVStack>
    </div>
  );
};

export default BpkAiBaseRoot;
export type { BpkAiBaseRootProps };
