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

import { storiesOf } from '@storybook/react';

import {
  DefaultExample,
  LeadingIconOnlyExample,
  TrailingIconOnlyExample,
  WithLinksExample,
  WithLogoExample,
  StickyExample,
} from './examples';

export default {
  title: 'bpk-component-navigation-bar',
};

export const Default = DefaultExample;
export const LeadingIconOnly = LeadingIconOnlyExample;

LeadingIconOnly.storyName = 'Leading icon only';

export const TrailingIconOnly = TrailingIconOnlyExample;

TrailingIconOnly.storyName = 'Trailing icon only';

export const WithLinks = WithLinksExample;

WithLinks.storyName = 'With links';

export const WithLogo = WithLogoExample;

WithLogo.storyName = 'With logo';

export const Sticky = StickyExample;
export const VisualTest = DefaultExample;

VisualTest.storyName = 'Visual test';
