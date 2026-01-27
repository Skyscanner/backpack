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

import BpkText from '../../packages/bpk-component-text/src/BpkTextV2/BpkText';

import {
  DefaultExample,
  WithHeadingTagsExample,
  ParagraphExample,
  WithDefaultPropsExample,
  HeadingStylesExample,
  HeroStylesExample,
  BodyStylesExample,
  LabelStylesExample,
  LarkenStylesExample,
  ColorPropExample,
  WithLeadingIconExample,
  WithTrailingIconExample,
  WithBothIconsExample,
  IconOnlyExample,
  MixedExample,
} from './examples';

import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'bpk-component-text-v2',
  component: BpkText,
} as Meta<typeof BpkText>;

export const Default = DefaultExample;
export const WithHeadingTags = WithHeadingTagsExample;

export const Paragraph = ParagraphExample;
export const UsingWithDefaultProps = WithDefaultPropsExample;

export const HeroStyles = HeroStylesExample;
export const HeadingStyles = HeadingStylesExample;
export const BodyStyles = BodyStylesExample;
export const LabelStyles = LabelStylesExample;
export const LarkenStyles = LarkenStylesExample;

export const ColorProp = ColorPropExample;

export const WithLeadingIcon = WithLeadingIconExample;
export const WithTrailingIcon = WithTrailingIconExample;
export const WithBothIcons = WithBothIconsExample;
export const IconOnly = IconOnlyExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom: StoryFn = MixedExample.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
