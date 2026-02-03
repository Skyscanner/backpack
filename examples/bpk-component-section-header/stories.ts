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
// @ts-nocheck

import BpkSectionHeader from '../../packages/bpk-component-section-header/src/BpkSectionHeader';

import {
  DefaultExample,
  WithDescriptionExample,
  WithButtonExample,
  FullExample,
  MobileExample,
  MixedExample,
  WithOnDarkExample,
} from './examples';

export default {
  title: 'bpk-component-section-header',
  component: BpkSectionHeader,
};

export const Default = DefaultExample;

export const WithDescription = WithDescriptionExample;

export const WithButton = WithButtonExample;

export const FullProps = FullExample;

export const ForMobile = MobileExample;

export const WithOnDark = WithOnDarkExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  }
}
