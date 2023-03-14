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

import type { ReactType } from 'react';

export const POLITENESS_SETTINGS = {
  off: 'off',
  polite: 'polite',
  assertive: 'assertive',
} as const;

// Temp disabling TS types due to non TS projects compatibility.
export type PolitenessSetting =
  (typeof POLITENESS_SETTINGS)[keyof typeof POLITENESS_SETTINGS];

export type Props = {
  // ReactType is deprecated using the deprecated annotation JSDoc tag so this will emit a warning
  children: ReactType | string;
  politenessSetting?: PolitenessSetting;
  visible?: boolean;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const BpkAriaLive = ({
  politenessSetting = POLITENESS_SETTINGS.polite,
  visible = false,
  ...rest
}: Props) => <div aria-live={politenessSetting} {...rest} />;

BpkAriaLive.defaultProps = {
  politenessSetting: POLITENESS_SETTINGS.polite,
  visible: false,
};

export default BpkAriaLive;
