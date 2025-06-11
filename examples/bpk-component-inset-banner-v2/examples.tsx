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
  VARIANT,
  BpkInsetBannerSponsored,
} from '../../packages/bpk-component-inset-banner/src/bpk-component-inset-banner-v2';

const image =
  'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg';

const imageWidth = 300;
const imageHeight = 150;
const logoUrl = 'https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png';

const WithCtaTextAndBottomSheetExampleLightV2 = () => (
  <div id="bottom-sheet-container">
    <div id="pagewrap">
      <BpkInsetBannerSponsored
        title="Lorem ipsum"
        subheadline="Lorem ipsum dolor sit amet"
        logo={logoUrl}
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
          bottomSheetTitle: "About this advert",
          closeBtnIcon: true,
          labelTitle: true,
          bottomSheetLabel: 'Info',
          buttonCloseLabel: 'Close',
          buttonA11yLabel: 'More info',
        }}
        backgroundColor="#FFE300"
        variant={VARIANT.onLight}
        accessibilityLabel="Sponsored by Skyscanner"
      />
    </div>
  </div>
);

const WithCustomBottomSheetWidthAndMarginsExampleV2 = () => (
  <BpkInsetBannerSponsored
    title="Lorem ipsum"
    subheadline="Lorem ipsum dolor sit amet"
    logo={logoUrl}
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
      bottomSheetTitle: "About this advert",
      closeBtnIcon: true,
      labelTitle: true,
      bottomSheetLabel: 'Info',
      buttonCloseLabel: 'Close',
      buttonA11yLabel: 'More info',
      bottomSheetWidth: '15rem',
      bottomSheetMarginStart: '1rem',
      bottomSheetMarginEnd: '1rem',
    }}
    backgroundColor="#FFE300"
    variant={VARIANT.onLight}
    accessibilityLabel="Sponsored by Skyscanner"
  />
);

const WithImageAndBottomSheetExampleV2 = () => (
  <BpkInsetBannerSponsored
    title="Explore the Canadian Rockies"
    subheadline="Discover breathtaking landscapes and outdoor adventures"
    logo={logoUrl}
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
      bottomSheetTitle: "About this advert",
      closeBtnIcon: true,
      labelTitle: true,
      bottomSheetLabel: 'Info',
      buttonCloseLabel: 'Close',
      buttonA11yLabel: 'More info',
    }}
    backgroundColor="#FF6601"
    variant={VARIANT.onDark}
  />
);

export {
  WithCtaTextAndBottomSheetExampleLightV2,
  WithCustomBottomSheetWidthAndMarginsExampleV2,
  WithImageAndBottomSheetExampleV2
};
