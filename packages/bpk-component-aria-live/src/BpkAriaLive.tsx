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

import type { ReactElement } from 'react';

import { cssModules } from '../../bpk-react-utils';

import * as STYLES from './BpkAriaLive.module.scss';

const getClassName = cssModules(STYLES);

export const POLITENESS_SETTINGS = {
  off: 'off',
  polite: 'polite',
  assertive: 'assertive',
} as const;

export type PolitenessSetting =
  (typeof POLITENESS_SETTINGS)[keyof typeof POLITENESS_SETTINGS];

export type Props = {
  children: ReactElement | string;
  politenessSetting?: PolitenessSetting;
  visible?: boolean;
  className?: string | null;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const BpkAriaLive = ({
  className = null,
  politenessSetting = POLITENESS_SETTINGS.polite,
  visible = false,
  ...rest
}: Props) => {
  const classNames = getClassName(
    'bpk-aria-live',
    !visible && 'bpk-aria-live--invisible',
    className,
  );

  return <div aria-live={politenessSetting} className={classNames} {...rest} />;
};

export default BpkAriaLive;
