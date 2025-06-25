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

import type { ComponentType, MouseEvent, ReactNode } from 'react';

import BpkCloseButton from '../../bpk-component-close-button';

import { BAR_STYLES, type BarStyle } from './BpkNavigationBar';

export type Props = {
  icon: ComponentType<any>,
  label: string,
  onClick: (event: MouseEvent<HTMLElement>) => void,
  className?: string,
  barStyle?: BarStyle,
  children?: ReactNode,
  [rest: string]: any, // Inexact rest. See decisions/inexact-rest.md
};

const BpkNavigationBarIconButton = ({ barStyle = BAR_STYLES.default, className, icon, ...rest }: Props) => (
  <span className={className}>
    <BpkCloseButton
      // @ts-expect-error TS(2322) FIXME: Type 'ComponentType<any>' is not assignable to typ... Remove this comment to see the full error message
      customIcon={icon}
      onDark={barStyle === BAR_STYLES.onDark}
      {...rest}
    />
  </span>
);

export default BpkNavigationBarIconButton;
