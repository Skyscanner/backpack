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

import NewWindowIcon from '../../packages/bpk-component-icon/sm/new-window';
import BpkPrice, { SIZES, ALIGNS } from '../../packages/bpk-component-price';

const XSmallExample = () => <BpkPrice size={SIZES.xsmall} price="£1,830" />;

const XSmallWithTrailingTextExample = () => (
  <BpkPrice size={SIZES.xsmall} price="£1,830" trailingText="per day" />
);

const XSmallWithLeadingAndTrailingTextExample = () => (
  <BpkPrice
    size={SIZES.xsmall}
    leadingText="from"
    price="£1,830"
    trailingText="per day"
  />
);

const XSmallWithPreviousPriceExample = () => (
  <BpkPrice
    size={SIZES.xsmall}
    previousPrice="£2,033"
    price="£1,830"
    trailingText="per day"
  />
);

const XSmallWithPreviousPriceLeadingTextExample = () => (
  <BpkPrice
    size={SIZES.xsmall}
    previousPrice="£2,033"
    leadingText="Web only deal"
    price="£1,830"
    trailingText="per day"
  />
);

const XSmallRightExample = () => (
  <BpkPrice size={SIZES.xsmall} price="£1,830" align={ALIGNS.right} />
);

const XSmallRightWithTrailingTextExample = () => (
  <BpkPrice
    size={SIZES.xsmall}
    price="£1,830"
    trailingText="per day"
    align={ALIGNS.right}
  />
);

const XSmallRightWithLeadingandTrailingTextExample = () => (
  <BpkPrice
    size={SIZES.xsmall}
    leadingText="from"
    price="£1,830"
    trailingText="per day"
    align={ALIGNS.right}
  />
);

const SmallExample = () => <BpkPrice price="£1,830" />;

const SmallWithTrailingTextExample = () => (
  <BpkPrice price="£1,830" trailingText="per day" />
);

const SmallWithLeadingAndTrailingTextExample = () => (
  <BpkPrice leadingText="from" price="£1,830" trailingText="per day" />
);

const SmallWithPreviousPriceExample = () => (
  <BpkPrice previousPrice="£2,033" price="£1,830" trailingText="per day" />
);

const SmallWithPreviousPriceLeadingTextExample = () => (
  <BpkPrice
    previousPrice="£2,033"
    leadingText="Web only deal"
    price="£1,830"
    trailingText="per day"
  />
);

const SmallWithPreviousPriceLeadingAndTrailingTextAndDataAttributeExample =
  () => (
    <BpkPrice
      previousPrice="£2,033"
      leadingText="Web only deal"
      price="£1,830"
      trailingText="per day"
      dataAttributes={{ 'data-price-your-pick': 'true' }}
    />
  );

const SmallWithPreviousPriceLeadingAndTrailingTextAndIconExample = () => (
  <BpkPrice
    previousPrice="£2,033"
    leadingText="Web only deal"
    price="£1,830"
    trailingText="per day"
    icon={<NewWindowIcon />}
  />
);

const SmallWithDataAttributeExample = () => (
  <BpkPrice
    price="£1,830"
    dataAttributes={{ 'data-price-your-pick': 'true' }}
  />
);

const SmallRightExample = () => (
  <BpkPrice price="£1,830" align={ALIGNS.right} />
);

const SmallRightWithTrailingTextExample = () => (
  <BpkPrice price="£1,830" trailingText="per day" align={ALIGNS.right} />
);

const SmallRightWithLeadingandTrailingTextExample = () => (
  <BpkPrice
    leadingText="from"
    price="£1,830"
    trailingText="per day"
    align={ALIGNS.right}
  />
);

const SmallRightWithPreviousPriceExample = () => (
  <BpkPrice
    previousPrice="£2,033"
    leadingText="Web only deal"
    price="£1,830"
    trailingText="per day"
    align={ALIGNS.right}
  />
);

const SmallRightWithPreviousPriceLeadingAndTrailingTextAndIconExample = () => (
  <BpkPrice
    previousPrice="£2,033"
    leadingText="Web only deal"
    price="£1,830"
    trailingText="per day"
    align={ALIGNS.right}
    icon={<NewWindowIcon />}
  />
);

const LargeExample = () => <BpkPrice size={SIZES.large} price="£1,830" />;

const LargeWithTrailingTextExample = () => (
  <BpkPrice size={SIZES.large} price="£1,830" trailingText="per day" />
);

const LargeWithLeadingAndTrailingTextExample = () => (
  <BpkPrice
    size={SIZES.large}
    leadingText="from"
    price="£1,830"
    trailingText="per day"
  />
);

const LargeWithPreviousPriceExample = () => (
  <BpkPrice
    size={SIZES.large}
    price="£1,830"
    trailingText="per day"
    previousPrice="£2,033"
  />
);

const LargeWithPreviousPriceLeadingTextExample = () => (
  <BpkPrice
    size={SIZES.large}
    leadingText="App only deal"
    price="£1,830"
    trailingText="per day"
    previousPrice="£2,033"
  />
);

const LargeWithPreviousPriceLeadingAndTrailingTextAndIconExample = () => (
  <BpkPrice
    size={SIZES.large}
    leadingText="App only deal"
    price="£1,830"
    trailingText="per day"
    previousPrice="£2,033"
    icon={<NewWindowIcon />}
  />
);

const LargeLongPriceExample = () => (
  <div style={{ width: 184 }}>
    <BpkPrice
      size={SIZES.large}
      leadingText="from"
      price="£1,830,123,123"
      trailingText="per day"
      icon={<NewWindowIcon />}
    />
    <BpkPrice
      size={SIZES.large}
      leadingText="from"
      price="ZK 20,309"
      trailingText="a night"
      icon={<NewWindowIcon />}
    />
  </div>
);

const MixedExample = () => (
  <div>
    <XSmallExample />
    <XSmallWithTrailingTextExample />
    <XSmallWithLeadingAndTrailingTextExample />
    <XSmallWithPreviousPriceExample />
    <XSmallWithPreviousPriceLeadingTextExample />
    <XSmallRightExample />
    <XSmallRightWithTrailingTextExample />
    <XSmallRightWithLeadingandTrailingTextExample />
    <SmallExample />
    <SmallWithTrailingTextExample />
    <SmallWithLeadingAndTrailingTextExample />
    <SmallWithPreviousPriceExample />
    <SmallWithPreviousPriceLeadingTextExample />
    <SmallWithPreviousPriceLeadingAndTrailingTextAndIconExample />
    <SmallWithDataAttributeExample />
    <SmallWithPreviousPriceLeadingAndTrailingTextAndDataAttributeExample />
    <SmallRightExample />
    <SmallRightWithTrailingTextExample />
    <SmallRightWithLeadingandTrailingTextExample />
    <SmallRightWithPreviousPriceExample />
    <SmallRightWithPreviousPriceLeadingAndTrailingTextAndIconExample />
    <LargeExample />
    <LargeWithTrailingTextExample />
    <LargeWithLeadingAndTrailingTextExample />
    <LargeWithPreviousPriceExample />
    <LargeWithPreviousPriceLeadingTextExample />
    <LargeWithPreviousPriceLeadingAndTrailingTextAndIconExample />
    <LargeLongPriceExample />
  </div>
);

export {
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
};
