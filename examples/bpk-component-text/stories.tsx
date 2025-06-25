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

import BpkText from '../../packages/bpk-component-text/src/BpkText';

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
  LarkenFallbackStylesExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-text',
  component: BpkText,
};

export const Default = DefaultExample;
export const WithHeadingTags = WithHeadingTagsExample;

export const Paragraph = ParagraphExample;
export const UsingWithDefaultProps = WithDefaultPropsExample;

export const HeroStyles = HeroStylesExample;
export const HeadingStyles = HeadingStylesExample;
export const BodyStyles = BodyStylesExample;
export const LabelStyles = LabelStylesExample;
export const LarkenStyles = LarkenStylesExample;
export const LarkenFallbackStyles = LarkenFallbackStylesExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '() => Elem... Remove this comment to see the full error message
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
