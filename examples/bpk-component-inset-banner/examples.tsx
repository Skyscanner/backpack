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

import BpkInsetBanner, {
  VARIANT,
} from '../../packages/bpk-component-inset-banner';

const DefaultExampleTitleOnly = () => (
  <BpkInsetBanner
    title="Lorem ipsum"
    backgroundColor="#FF6601"
    variant={VARIANT.onDark}
  />
);

const DefaultExampleTitleAndSubheadline = () => (
  <BpkInsetBanner
    title="Lorem ipsum"
    subheadline="Lorem ipsum dolor sit amet"
    backgroundColor="#FF6601"
    variant={VARIANT.onDark}
  />
);

const WithLogoAndCtaTextExampleLight = () => (
  <BpkInsetBanner
    title="Lorem ipsum"
    subheadline="Lorem ipsum dolor sit amet"
    logo="https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png"
    callToAction={{
      text: 'Sponsored',
    }}
    backgroundColor="#FFE300"
    variant={VARIANT.onLight}
    accessibilityLabel="Sponsored by Skyscanner"
  />
);

const WithBodyTextExampleLight = () => (
  <BpkInsetBanner
    title="Lorem ipsum"
    subheadline="Lorem ipsum dolor sit amet"
    logo="https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png"
    backgroundColor="#FFE300"
    callToAction={{
      text: 'Sponsored',
    }}
    body={{
      text: 'You can change your destination, date of travel, or both, with no change fee. Valid for all new bookings made up to 31 May for travel between now and 31 December 2020.',
    }}
    variant={VARIANT.onLight}
  />
);

const WithBodyTextAndLinkExampleDark = () => (
  <BpkInsetBanner
    title="Lorem ipsum"
    subheadline="Lorem ipsum dolor sit amet"
    logo="https://content.skyscnr.com/m/3f4dadbd41da8235/original/Skyland_White_172x96.png"
    backgroundColor="#FF6601"
    callToAction={{
      text: 'Sponsored',
    }}
    body={{
      text: 'You can change your destination, date of travel, or both, with no change fee. Valid for all new bookings made up to 31 May for travel between now and 31 December 2020.',
      linkText: 'More information',
      link: 'www.skyscanner.net',
    }}
    variant={VARIANT.onDark}
  />
);

export {
  DefaultExampleTitleOnly,
  DefaultExampleTitleAndSubheadline,
  WithLogoAndCtaTextExampleLight,
  WithBodyTextExampleLight,
  WithBodyTextAndLinkExampleDark,
};
