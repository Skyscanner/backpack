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

import {
  BpkInsetBannerSponsored,
  VARIANT,
} from '../../packages/bpk-component-inset-banner';

const image =
  'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg';

const imageWidth = 300;
const imageHeight = 150;
const logoDarkUrl =
  'https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png';

const logoWhiteUrl =
  'https://js.skyscnr.com/sttc/bpk-content/skyland-a76916b4.png';

const WithCtaTextAndBottomSheetExampleV2Light = () => (
  <div id="bottom-sheet-container">
    <div id="pagewrap">
      <BpkInsetBannerSponsored
        title="Lorem ipsum"
        subheadline="Lorem ipsum dolor sit amet"
        logo={logoDarkUrl}
        callToAction={{
          text: 'Sponsored',
          bottomSheetContent: [
            {
              title: 'Lorem ipsum dolor sit amet',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
              title: 'Consectetur adipiscing elit',
              description:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
          ],
          bottomSheetTitle: 'About this advert',
          closeBtnIcon: true,
          labelTitle: true,
          bottomSheetLabel: 'Info',
          buttonCloseLabel: 'Close',
        }}
        backgroundColor="#FFE300"
        variant={VARIANT.onLight}
        accessibilityLabel="Sponsored by Skyscanner"
      />
    </div>
  </div>
);

const WithCustomBottomSheetWidthAndMarginsExampleV2Light = () => (
  <BpkInsetBannerSponsored
    title="Lorem ipsum"
    subheadline="Lorem ipsum dolor sit amet"
    logo={logoDarkUrl}
    callToAction={{
      text: 'Sponsored',
      bottomSheetContent: [
        {
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          title: 'Consectetur adipiscing elit',
          description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      ],
      bottomSheetTitle: 'About this advert',
      closeBtnIcon: true,
      labelTitle: true,
      bottomSheetLabel: 'Info',
      buttonCloseLabel: 'Close',
      bottomSheetWidth: '15rem',
      bottomSheetMarginStart: '1rem',
      bottomSheetMarginEnd: '1rem',
    }}
    backgroundColor="#FFE300"
    variant={VARIANT.onLight}
    accessibilityLabel="Sponsored by Skyscanner"
  />
);

const WithImageAndBottomSheetExampleV2Dark = () => (
  <BpkInsetBannerSponsored
    title="Explore the Canadian Rockies"
    subheadline="Discover breathtaking landscapes and outdoor adventures"
    logo={logoWhiteUrl}
    image={{
      src: image,
      altText: 'Canadian Rockies',
      aspectRatio: imageWidth / imageHeight,
    }}
    callToAction={{
      text: 'Sponsored',
      bottomSheetContent: [
        {
          title: 'Plan Your Trip',
          description:
            'Experience the beauty of the Canadian Rockies with our exclusive travel packages.',
        },
      ],
      bottomSheetTitle: 'About this advert',
      closeBtnIcon: true,
      labelTitle: true,
      bottomSheetLabel: 'Info',
      buttonCloseLabel: 'Close',
    }}
    backgroundColor="#FF6601"
    variant={VARIANT.onDark}
  />
);

const WithCtaTextAndBottomSheetExampleV2Dark = () => (
  <BpkInsetBannerSponsored
    title="Summer Travel Deals"
    subheadline="Exclusive offers on flights and hotels"
    logo={logoWhiteUrl}
    callToAction={{
      text: 'Sponsored',
      bottomSheetContent: [
        {
          title: 'Limited Time Offers',
          description:
            'Take advantage of our summer travel deals with discounts on flights, hotels, and vacation packages.',
        },
      ],
      bottomSheetTitle: 'About this advert',
      closeBtnIcon: true,
      labelTitle: true,
      bottomSheetLabel: 'Info',
      buttonCloseLabel: 'Close',
    }}
    backgroundColor="#0770E3"
    variant={VARIANT.onDark}
    accessibilityLabel="Sponsored by Skyscanner"
  />
);

const WithImageAndBottomSheetExampleV2Light = () => (
  <BpkInsetBannerSponsored
    title="Visit Santorini"
    subheadline="Experience the beauty of Greek islands"
    logo={logoDarkUrl}
    image={{
      src: image,
      altText: 'Santorini landscape',
      aspectRatio: imageWidth / imageHeight,
    }}
    callToAction={{
      text: 'Sponsored',
      bottomSheetContent: [
        {
          title: 'Greece Getaways',
          description:
            'Explore the stunning views and unique architecture of Santorini with our curated travel guides.',
        },
      ],
      bottomSheetTitle: 'About this advert',
      closeBtnIcon: true,
      labelTitle: true,
      bottomSheetLabel: 'Info',
      buttonCloseLabel: 'Close',
    }}
    backgroundColor="#FFE300"
    variant={VARIANT.onLight}
    accessibilityLabel="Sponsored by Skyscanner"
  />
);

const WithSingleBottomSheetItemExampleV2Light = () => (
  <BpkInsetBannerSponsored
    title="Weekend Getaways"
    subheadline="Find the perfect short break destination"
    logo={logoDarkUrl}
    callToAction={{
      text: 'Sponsored',
      bottomSheetContent: [
        {
          title: 'Single Information Item',
          description:
            'This example only has one item in the bottom sheet content, so it should not display an info icon next to it.',
        },
      ],
      bottomSheetTitle: 'About this advert',
      closeBtnIcon: true,
      labelTitle: true,
      bottomSheetLabel: 'Info',
      buttonCloseLabel: 'Close',
    }}
    backgroundColor="#FFE300"
    variant={VARIANT.onLight}
    accessibilityLabel="Sponsored by Skyscanner"
  />
);

export {
  WithCtaTextAndBottomSheetExampleV2Light,
  WithCustomBottomSheetWidthAndMarginsExampleV2Light,
  WithImageAndBottomSheetExampleV2Dark,
  WithCtaTextAndBottomSheetExampleV2Dark,
  WithImageAndBottomSheetExampleV2Light,
  WithSingleBottomSheetItemExampleV2Light,
};
