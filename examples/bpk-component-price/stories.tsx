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

import BpkPrice from '../../packages/bpk-component-price/src/BpkPrice';

import {
  XSmallExample,
  XSmallWithTrailingTextExample,
  XSmallWithLeadingAndTrailingTextExample,
  XSmallWithPreviousPriceExample,
  XSmallWithPreviousPriceLeadingTextExample,
  XSmallRightExample,
  XSmallRightWithTrailingTextExample,
  XSmallRightWithLeadingandTrailingTextExample,
  SmallExample,
  SmallWithTrailingTextExample,
  SmallWithLeadingAndTrailingTextExample,
  SmallWithPreviousPriceExample,
  SmallWithPreviousPriceLeadingTextExample,
  SmallWithPreviousPriceLeadingAndTrailingTextAndIconExample,
  SmallWithDataAttributeExample,
  SmallWithPreviousPriceLeadingAndTrailingTextAndDataAttributeExample,
  SmallRightExample,
  SmallRightWithTrailingTextExample,
  SmallRightWithLeadingandTrailingTextExample,
  SmallRightWithPreviousPriceExample,
  SmallRightWithPreviousPriceLeadingAndTrailingTextAndIconExample,
  LargeExample,
  LargeWithTrailingTextExample,
  LargeWithLeadingAndTrailingTextExample,
  LargeWithPreviousPriceExample,
  LargeWithPreviousPriceLeadingTextExample,
  LargeWithPreviousPriceLeadingAndTrailingTextAndIconExample,
  LargeLongPriceExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-price',
  component: BpkPrice,
};

export const XSmall = XSmallExample;
export const XSmallWithTrailingText = XSmallWithTrailingTextExample;
export const XSmallWithLeadingAndTrailingText =
  XSmallWithLeadingAndTrailingTextExample;
export const XSmallWithPreviousPrice = XSmallWithPreviousPriceExample;
export const XSmallWithPreviousPriceLeadingText =
  XSmallWithPreviousPriceLeadingTextExample;
export const XSmallRight = XSmallRightExample;
export const XSmallRightWithTrailingText = XSmallRightWithTrailingTextExample;
export const XSmallRightWithLeadingandTrailingText =
  XSmallRightWithLeadingandTrailingTextExample;
export const Small = SmallExample;
export const SmallWithTrailingText = SmallWithTrailingTextExample;
export const SmallWithLeadingAndTrailingText =
  SmallWithLeadingAndTrailingTextExample;
export const SmallWithPreviousPrice = SmallWithPreviousPriceExample;
export const SmallWithPreviousPriceLeadingText =
  SmallWithPreviousPriceLeadingTextExample;
export const SmallWithPreviousPriceLeadingAndTrailingTextAndIcon =
  SmallWithPreviousPriceLeadingAndTrailingTextAndIconExample;
export const SmallWithDataAttribute = SmallWithDataAttributeExample;
export const SmallWithPreviousPriceLeadingAndTrailingTextAndDataAttribute =
  SmallWithPreviousPriceLeadingAndTrailingTextAndDataAttributeExample;
export const SmallRight = SmallRightExample;
export const SmallRightWithTrailingText = SmallRightWithTrailingTextExample;
export const SmallRightWithLeadingandTrailingText =
  SmallRightWithLeadingandTrailingTextExample;
export const SmallRightWithPreviousPrice = SmallRightWithPreviousPriceExample;
export const SmallRightWithPreviousPriceLeadingAndTrailingTextAndIcon =
  SmallRightWithPreviousPriceLeadingAndTrailingTextAndIconExample;
export const Large = LargeExample;
export const LargeWithTrailingText = LargeWithTrailingTextExample;
export const LargeWithLeadingAndTrailingText =
  LargeWithLeadingAndTrailingTextExample;
export const LargeWithPreviousPrice = LargeWithPreviousPriceExample;
export const LargeWithPreviousPriceLeadingText =
  LargeWithPreviousPriceLeadingTextExample;
export const LargeWithPreviousPriceLeadingAndTrailingTextAndIcon =
  LargeWithPreviousPriceLeadingAndTrailingTextAndIconExample;
export const LargeLongPrice = LargeLongPriceExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '() => Elem... Remove this comment to see the full error message
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
