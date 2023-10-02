/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import {
  CtaIconLongTextExample,
  CtaExample,
  DefaultExample,
  IconExample,
  VisualTestExample,
} from './examples';

export default {
  title: 'bpk-component-floating-notification',
};

export const Default = DefaultExample;
export const WithIcon = IconExample;

export const WithCta = CtaExample;

export const WithCtaIconAndLongText = CtaIconLongTextExample;

export const VisualTest = VisualTestExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  fontSize: '32px'
};
