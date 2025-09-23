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

import figma from '@figma/code-connect';

import BpkHorizontalNav, { HORIZONTAL_NAV_TYPES } from './BpkHorizontalNav';
import BpkHorizontalNavItem from './BpkHorizontalNavItem';

figma.connect(
  BpkHorizontalNav,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=27880%3A31440',
  {
    props: {
      showUnderline: figma.boolean('Line'),
      type: figma.enum('Style', {
        Default: HORIZONTAL_NAV_TYPES.default,
        'On Contrast': HORIZONTAL_NAV_TYPES.light,
      }),
    },
    example: ({ showUnderline, type }) => (
      <BpkHorizontalNav showUnderline={showUnderline} type={type}>
        <BpkHorizontalNavItem>One</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Two</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Three</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Four</BpkHorizontalNavItem>
      </BpkHorizontalNav>
    ),
  },
);
