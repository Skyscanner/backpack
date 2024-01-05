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
export declare const SECTION_TYPES: {
  default: 'default',
  onDark: 'onDark',
};
export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];
type Props = {
  title: string;
  description?: string;
  button?: ReactNode;
  type?: SectionType;
};
declare const BpkSectionHeader: ({ title, description, button, type }: Props) => JSX.Element;
export default BpkSectionHeader;
