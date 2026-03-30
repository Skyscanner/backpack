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

import { useState } from 'react';

import { canvasContrastDay, surfaceSubtleDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkBottomSheet, {
  PADDING_TYPE,
} from '../../packages/bpk-component-bottom-sheet/src/BpkBottomSheet';
import InfoIcon from '../../packages/bpk-component-icon/sm/information-circle';
import PriceTagIcon from '../../packages/bpk-component-icon/sm/price-tag';
import BpkImage from '../../packages/bpk-component-image/src/BpkImage';
import { BpkInsetBannerV3 } from '../../packages/bpk-component-inset-banner';
import {
  BpkBox,
  BpkFlex,
  BpkSpacing,
  BpkVessel,
} from '../../packages/bpk-component-layout';
import BpkPopover from '../../packages/bpk-component-popover/src/BpkPopover';
import BpkText, {
  TEXT_STYLES,
} from '../../packages/bpk-component-text/src/BpkText';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

// Skyland logo is 172×96 px → aspectRatio ≈ 1.79; at 1.5 rem tall → ~2.69 rem wide
const LOGO_ASPECT_RATIO = 172 / 96;
const LOGO_WIDTH = '2.69rem';

const logoDarkUrl =
  'https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png';
const logoWhiteUrl =
  'https://js.skyscnr.com/sttc/bpk-content/skyland-a76916b4.png';
const mediaImageUrl =
  'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg';

const bottomSheetContent = [
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
];

const BottomSheetContent = () => (
  <>
    {bottomSheetContent.map(({ description, title }) => (
      <BpkBox key={title} marginBottom={BpkSpacing.LG}>
        <BpkText textStyle={TEXT_STYLES.heading4}>{title}</BpkText>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>{description}</BpkText>
      </BpkBox>
    ))}
  </>
);

const SponsoredCta = ({ onClick }: { onClick: () => void }) => (
  <BpkInsetBannerV3.TrailingAccessory onClick={onClick} aria-label="About this advert">
    <BpkFlex direction="row" align="center" gap={BpkSpacing.MD}>
      <BpkText textStyle={TEXT_STYLES.caption}>Sponsored</BpkText>
      <InfoIcon />
    </BpkFlex>
  </BpkInsetBannerV3.TrailingAccessory>
);

const HorizontalOnLight = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <BpkVessel id="bottom-sheet-container">
      <BpkVessel id="pagewrap">
        <BpkInsetBannerV3.Root
          backgroundColor="#FFE300"
          textVariant="on-light"
          aria-label="Sponsored by Skyscanner"
        >
          <BpkInsetBannerV3.Header>
            <BpkInsetBannerV3.LeadingAccessory>
              <BpkBox width={LOGO_WIDTH}>
                <BpkImage
                  src={logoDarkUrl}
                  altText="Skyscanner"
                  aspectRatio={LOGO_ASPECT_RATIO}
                />
              </BpkBox>
            </BpkInsetBannerV3.LeadingAccessory>
            <BpkInsetBannerV3.Content>
              <BpkText textStyle={TEXT_STYLES.label2}>Lorem ipsum</BpkText>
              <BpkText textStyle={TEXT_STYLES.caption}>
                Lorem ipsum dolor sit amet
              </BpkText>
            </BpkInsetBannerV3.Content>
            <SponsoredCta onClick={() => setSheetOpen(true)} />
          </BpkInsetBannerV3.Header>
        </BpkInsetBannerV3.Root>
        <BpkBottomSheet
          id="inset-banner-v3-bottom-sheet-light"
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="About this advert"
          closeLabel="Close"
          ariaLabel="About this advert"
          closeOnScrimClick
          closeOnEscPressed
          paddingStyles={{
            top: PADDING_TYPE.base,
            start: PADDING_TYPE.lg,
            bottom: PADDING_TYPE.base,
          }}
        >
          <BottomSheetContent />
        </BpkBottomSheet>
      </BpkVessel>
    </BpkVessel>
  );
};

const HorizontalOnDark = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <BpkVessel id="bottom-sheet-container">
      <BpkVessel id="pagewrap">
        <BpkInsetBannerV3.Root
          backgroundColor="#0770E3"
          textVariant="on-dark"
          aria-label="Sponsored by Skyscanner"
        >
          <BpkInsetBannerV3.Header>
            <BpkInsetBannerV3.LeadingAccessory>
              <BpkBox width={LOGO_WIDTH}>
                <BpkImage
                  src={logoWhiteUrl}
                  altText="Skyscanner"
                  aspectRatio={LOGO_ASPECT_RATIO}
                />
              </BpkBox>
            </BpkInsetBannerV3.LeadingAccessory>
            <BpkInsetBannerV3.Content>
              <BpkText textStyle={TEXT_STYLES.label2}>Summer Travel Deals</BpkText>
              <BpkText textStyle={TEXT_STYLES.caption}>
                Exclusive offers on flights and hotels
              </BpkText>
            </BpkInsetBannerV3.Content>
            <SponsoredCta onClick={() => setSheetOpen(true)} />
          </BpkInsetBannerV3.Header>
        </BpkInsetBannerV3.Root>
        <BpkBottomSheet
          id="inset-banner-v3-bottom-sheet-dark"
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="About this advert"
          closeLabel="Close"
          ariaLabel="About this advert"
          closeOnScrimClick
          closeOnEscPressed
          paddingStyles={{
            top: PADDING_TYPE.base,
            start: PADDING_TYPE.lg,
            bottom: PADDING_TYPE.base,
          }}
        >
          <BottomSheetContent />
        </BpkBottomSheet>
      </BpkVessel>
    </BpkVessel>
  );
};

const HorizontalWithNoTrailingAccessory = () => (
  <BpkInsetBannerV3.Root
    backgroundColor="#F55D42"
    textVariant="on-dark"
    aria-label="Banner"
  >
    <BpkInsetBannerV3.Header>
      <BpkInsetBannerV3.LeadingAccessory>
        <BpkBox width={LOGO_WIDTH}>
          <BpkImage
            src={logoWhiteUrl}
            altText="Skyscanner"
            aspectRatio={LOGO_ASPECT_RATIO}
          />
        </BpkBox>
      </BpkInsetBannerV3.LeadingAccessory>
      <BpkInsetBannerV3.Content>
        <BpkText textStyle={TEXT_STYLES.label2}>Lorem ipsum</BpkText>
        <BpkText textStyle={TEXT_STYLES.caption}>
          Lorem ipsum dolor sit amet
        </BpkText>
      </BpkInsetBannerV3.Content>
    </BpkInsetBannerV3.Header>
  </BpkInsetBannerV3.Root>
);

const VerticalLayout = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <BpkVessel id="bottom-sheet-container">
      <BpkVessel id="pagewrap">
        <BpkBox maxWidth="20rem">
          <BpkInsetBannerV3.Root
            backgroundColor="#FFE300"
            textVariant="on-light"
            aria-label="Sponsored by Skyscanner"
          >
            <BpkInsetBannerV3.Header layout="vertical">
              <BpkInsetBannerV3.LeadingAccessory>
                <BpkBox width={LOGO_WIDTH}>
                  <BpkImage
                    src={logoDarkUrl}
                    altText="Skyscanner"
                    aspectRatio={LOGO_ASPECT_RATIO}
                  />
                </BpkBox>
              </BpkInsetBannerV3.LeadingAccessory>
              <BpkInsetBannerV3.Content>
                <BpkText textStyle={TEXT_STYLES.label2}>Visit Santorini</BpkText>
                <BpkText textStyle={TEXT_STYLES.caption}>
                  Experience the beauty of Greek islands
                </BpkText>
              </BpkInsetBannerV3.Content>
              <SponsoredCta onClick={() => setSheetOpen(true)} />
            </BpkInsetBannerV3.Header>
            <BpkInsetBannerV3.Body bleed>
              <BpkImage
                src={mediaImageUrl}
                altText="Canadian Rockies landscape"
                aspectRatio={4 / 3}
              />
            </BpkInsetBannerV3.Body>
          </BpkInsetBannerV3.Root>
        </BpkBox>
        <BpkBottomSheet
          id="inset-banner-v3-bottom-sheet-vertical"
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="About this advert"
          closeLabel="Close"
          ariaLabel="About this advert"
          closeOnScrimClick
          closeOnEscPressed
          paddingStyles={{
            top: PADDING_TYPE.base,
            start: PADDING_TYPE.lg,
            bottom: PADDING_TYPE.base,
          }}
        >
          <BottomSheetContent />
        </BpkBottomSheet>
      </BpkVessel>
    </BpkVessel>
  );
};

const ContentOnly = () => (
  <BpkInsetBannerV3.Root backgroundColor="#FFE300" textVariant="on-light">
    <BpkInsetBannerV3.Header>
      <BpkInsetBannerV3.Content>
        <BpkText textStyle={TEXT_STYLES.label2}>Content only</BpkText>
        <BpkText textStyle={TEXT_STYLES.caption}>No accessories required</BpkText>
      </BpkInsetBannerV3.Content>
    </BpkInsetBannerV3.Header>
  </BpkInsetBannerV3.Root>
);

const WithPopover = () => (
  <BpkVessel
    role="presentation"
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
  >
    <BpkInsetBannerV3.Root
      backgroundColor="#FFE300"
      textVariant="on-light"
      aria-label="Sponsored by Skyscanner"
    >
      <BpkInsetBannerV3.Header>
        <BpkInsetBannerV3.LeadingAccessory>
          <BpkBox width={LOGO_WIDTH}>
            <BpkImage
              src={logoDarkUrl}
              altText="Skyscanner"
              aspectRatio={LOGO_ASPECT_RATIO}
            />
          </BpkBox>
        </BpkInsetBannerV3.LeadingAccessory>
        <BpkInsetBannerV3.Content>
          <BpkText textStyle={TEXT_STYLES.label2}>Lorem ipsum</BpkText>
          <BpkText textStyle={TEXT_STYLES.caption}>
            Lorem ipsum dolor sit amet
          </BpkText>
        </BpkInsetBannerV3.Content>
        <BpkPopover
          id="inset-banner-v3-popover"
          label="Info"
          placement="bottom"
          onClose={() => {}}
          closeButtonText="Close"
          closeButtonIcon
          labelAsTitle
          target={
            <BpkInsetBannerV3.TrailingAccessory>
              <BpkFlex direction="row" align="center" gap={BpkSpacing.MD}>
                <BpkText textStyle={TEXT_STYLES.caption}>Sponsored</BpkText>
                <InfoIcon />
              </BpkFlex>
            </BpkInsetBannerV3.TrailingAccessory>
          }
        >
          <BpkText tagName="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </BpkText>
        </BpkPopover>
      </BpkInsetBannerV3.Header>
    </BpkInsetBannerV3.Root>
  </BpkVessel>
);

const WithLeadingIconBadgeAndPopover = () => (
  <BpkVessel
    role="presentation"
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
  >
    <BpkInsetBannerV3.Root
      backgroundColor={surfaceSubtleDay}
      textVariant="on-light"
      aria-label="Get a lower price when you find out the supplier later"
    >
      <BpkInsetBannerV3.Header>
        <BpkInsetBannerV3.LeadingAccessory>
          <BpkVessel className={getClassName('bpk-inset-banner-v3-example__icon-badge')}>
            <PriceTagIcon />
          </BpkVessel>
        </BpkInsetBannerV3.LeadingAccessory>
        <BpkInsetBannerV3.Content>
          <BpkText textStyle={TEXT_STYLES.label2}>
            Get a lower price when you find out the supplier later
          </BpkText>
        </BpkInsetBannerV3.Content>
        <BpkInsetBannerV3.TrailingAccessory>
          <BpkFlex direction="row" align="center" gap={BpkSpacing.MD}>
            <BpkText textStyle={TEXT_STYLES.caption}>Find out more</BpkText>
            <BpkPopover
              id="car-hire-lower-price-popover"
              label="About this offer"
              placement="bottom"
              onClose={() => {}}
              closeButtonText="Close"
              closeButtonIcon
              labelAsTitle
              target={
                <BpkInsetBannerV3.TrailingAccessory>
                  <InfoIcon />
                </BpkInsetBannerV3.TrailingAccessory>
              }
            >
              <BpkText tagName="p">
                We&apos;ve worked with trusted car hire partners so you get a better
                price. Supplier revealed after booking.
              </BpkText>
            </BpkPopover>
          </BpkFlex>
        </BpkInsetBannerV3.TrailingAccessory>
      </BpkInsetBannerV3.Header>
      <BpkInsetBannerV3.Body backgroundColor={canvasContrastDay}>
        <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
          We&apos;ve worked with trusted car hire partners so you get a better
          price. Supplier revealed after booking.
        </BpkText>
      </BpkInsetBannerV3.Body>
    </BpkInsetBannerV3.Root>
  </BpkVessel>
);

const WithLeadingIconBadgeSubtitleAndBottomSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <BpkVessel id="bottom-sheet-container">
      <BpkVessel id="pagewrap">
        <BpkInsetBannerV3.Root
          backgroundColor={surfaceSubtleDay}
          textVariant="on-light"
          aria-label="Mystery supplier"
        >
          <BpkInsetBannerV3.Header>
            <BpkInsetBannerV3.LeadingAccessory>
              <BpkVessel className={getClassName('bpk-inset-banner-v3-example__icon-badge')}>
                <PriceTagIcon />
              </BpkVessel>
            </BpkInsetBannerV3.LeadingAccessory>
            <BpkInsetBannerV3.Content>
              <BpkText textStyle={TEXT_STYLES.label2}>Mystery supplier</BpkText>
              <BpkText textStyle={TEXT_STYLES.caption}>
                Get a lower price when you find out the supplier later.
              </BpkText>
            </BpkInsetBannerV3.Content>
            <BpkInsetBannerV3.TrailingAccessory onClick={() => setSheetOpen(true)} aria-label="About this offer">
              <InfoIcon />
            </BpkInsetBannerV3.TrailingAccessory>
          </BpkInsetBannerV3.Header>
        </BpkInsetBannerV3.Root>
        <BpkBottomSheet
          id="car-hire-mystery-supplier-bottom-sheet"
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Get a lower price when you find out the supplier later"
          closeLabel="Close"
          ariaLabel="About this offer"
          closeOnScrimClick
          closeOnEscPressed
          paddingStyles={{
            top: PADDING_TYPE.base,
            start: PADDING_TYPE.lg,
            bottom: PADDING_TYPE.base,
          }}
        >
          <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
            We&apos;ve worked with trusted car hire partners so you get a better
            price. Supplier revealed after booking.
          </BpkText>
        </BpkBottomSheet>
      </BpkVessel>
    </BpkVessel>
  );
};

const WithLeadingIconBadgeAndBottomSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <BpkVessel id="bottom-sheet-container">
      <BpkVessel id="pagewrap">
        <BpkInsetBannerV3.Root
          backgroundColor={surfaceSubtleDay}
          textVariant="on-light"
          aria-label="Get a lower price when you find out the supplier later"
        >
          <BpkInsetBannerV3.Header>
            <BpkInsetBannerV3.LeadingAccessory>
              <BpkVessel className={getClassName('bpk-inset-banner-v3-example__icon-badge')}>
                <PriceTagIcon />
              </BpkVessel>
            </BpkInsetBannerV3.LeadingAccessory>
            <BpkInsetBannerV3.Content>
              <BpkText textStyle={TEXT_STYLES.label2}>
                Get a lower price when you find out the supplier later
              </BpkText>
            </BpkInsetBannerV3.Content>
            <BpkInsetBannerV3.TrailingAccessory onClick={() => setSheetOpen(true)} aria-label="About this offer">
              <InfoIcon />
            </BpkInsetBannerV3.TrailingAccessory>
          </BpkInsetBannerV3.Header>
        </BpkInsetBannerV3.Root>
        <BpkBottomSheet
          id="car-hire-lower-price-bottom-sheet"
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Get a lower price when you find out the supplier later"
          closeLabel="Close"
          ariaLabel="About this offer"
          closeOnScrimClick
          closeOnEscPressed
          paddingStyles={{
            top: PADDING_TYPE.base,
            start: PADDING_TYPE.lg,
            bottom: PADDING_TYPE.base,
          }}
        >
          <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
            We&apos;ve worked with trusted car hire partners so you get a better
            price. Supplier revealed after booking.
          </BpkText>
        </BpkBottomSheet>
      </BpkVessel>
    </BpkVessel>
  );
};

const WithImage = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <BpkVessel id="bottom-sheet-container">
      <BpkVessel id="pagewrap">
        <BpkInsetBannerV3.Root
          backgroundColor="#FFE300"
          textVariant="on-light"
          aria-label="Sponsored by Skyscanner"
        >
          <BpkInsetBannerV3.Header>
            <BpkInsetBannerV3.LeadingAccessory>
              <BpkBox width={LOGO_WIDTH}>
                <BpkImage
                  src={logoDarkUrl}
                  altText="Skyscanner"
                  aspectRatio={LOGO_ASPECT_RATIO}
                />
              </BpkBox>
            </BpkInsetBannerV3.LeadingAccessory>
            <BpkInsetBannerV3.Content>
              <BpkText textStyle={TEXT_STYLES.label2}>Visit Santorini</BpkText>
              <BpkText textStyle={TEXT_STYLES.caption}>
                Experience the beauty of Greek islands
              </BpkText>
            </BpkInsetBannerV3.Content>
            <SponsoredCta onClick={() => setSheetOpen(true)} />
          </BpkInsetBannerV3.Header>
          <BpkInsetBannerV3.Body bleed>
            <BpkImage
              src={mediaImageUrl}
              altText="Canadian Rockies landscape"
              aspectRatio={16 / 9}
            />
          </BpkInsetBannerV3.Body>
        </BpkInsetBannerV3.Root>
        <BpkBottomSheet
          id="inset-banner-v3-bottom-sheet-with-image"
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="About this advert"
          closeLabel="Close"
          ariaLabel="About this advert"
          closeOnScrimClick
          closeOnEscPressed
          paddingStyles={{
            top: PADDING_TYPE.base,
            start: PADDING_TYPE.lg,
            bottom: PADDING_TYPE.base,
          }}
        >
          <BottomSheetContent />
        </BpkBottomSheet>
      </BpkVessel>
    </BpkVessel>
  );
};

const CustomTypography = () => (
  <BpkInsetBannerV3.Root
    backgroundColor="#F0F4FF"
    textVariant="on-light"
    aria-label="Promotional banner"
  >
    <BpkInsetBannerV3.Header>
      <BpkInsetBannerV3.Content>
        <BpkText tagName="h2" textStyle={TEXT_STYLES.heading4}>
          Semantic heading title
        </BpkText>
        <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
          Body copy rendered as a paragraph element for correct document outline.
        </BpkText>
        <BpkText tagName="p" textStyle={TEXT_STYLES.caption}>
          Caption text also as a paragraph.
        </BpkText>
      </BpkInsetBannerV3.Content>
    </BpkInsetBannerV3.Header>
  </BpkInsetBannerV3.Root>
);

export {
  HorizontalOnLight,
  HorizontalOnDark,
  HorizontalWithNoTrailingAccessory,
  VerticalLayout,
  ContentOnly,
  WithPopover,
  WithLeadingIconBadgeAndPopover,
  WithLeadingIconBadgeSubtitleAndBottomSheet,
  WithLeadingIconBadgeAndBottomSheet,
  WithImage,
  CustomTypography,
};
