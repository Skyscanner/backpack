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

import BpkBadge from '../../packages/bpk-component-badge/src/BpkBadge';
import BpkButton from '../../packages/bpk-component-button';
import { BpkCardV2, CARD_V2_SURFACE_COLORS, CARD_V2_VARIANTS, type BpkCardV2SurfaceColor } from '../../packages/bpk-component-card';
import BpkCarousel from '../../packages/bpk-component-carousel';
import BpkJourneyArrow from '../../packages/bpk-component-journey-arrow';
import { BpkBox, BpkFlex, BpkGrid, BpkHStack, BpkSpacing, BpkVStack } from '../../packages/bpk-component-layout';
import BpkLink from '../../packages/bpk-component-link';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkPrice, { SIZES, ALIGNS } from '../../packages/bpk-component-price';
import BpkRating from '../../packages/bpk-component-rating';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkStarRating from '../../packages/bpk-component-star-rating';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const noop = () => {};

const SURFACE_COLORS = Object.values(CARD_V2_SURFACE_COLORS);

const VARIANTS = Object.values(CARD_V2_VARIANTS);

const DefaultExample = () => (
  <BpkBox width="20rem">
    <BpkCardV2.Root>
      <BpkCardV2.Header>
        <BpkText textStyle={TEXT_STYLES.heading4} tagName="h3">
          Card title
        </BpkText>
      </BpkCardV2.Header>
      <BpkCardV2.Body>
        <BpkText>This is the body content of a default card.</BpkText>
      </BpkCardV2.Body>
      <BpkCardV2.Footer>
        <BpkText textStyle={TEXT_STYLES.caption}>Footer content</BpkText>
      </BpkCardV2.Footer>
    </BpkCardV2.Root>
  </BpkBox>
);

const VariantsExample = () => (
  <div className={getClassName('bpk-card-v2-examples__canvas-contrast')}>
    <BpkFlex wrap="wrap" gap={BpkSpacing.Base} paddingTop={BpkSpacing.Base}>
      {VARIANTS.map((variant) => (
        <BpkBox key={variant} width="20rem">
          <BpkCardV2.Root variant={variant}>
            <BpkCardV2.Header>
              <BpkText textStyle={TEXT_STYLES.heading4} tagName="h3">
                {variant}
              </BpkText>
            </BpkCardV2.Header>
            <BpkCardV2.Body>
              <BpkText>Card with variant &quot;{variant}&quot;.</BpkText>
            </BpkCardV2.Body>
          </BpkCardV2.Root>
        </BpkBox>
      ))}
    </BpkFlex>
  </div>
);

const DARK_SURFACE_COLORS: BpkCardV2SurfaceColor[] = [CARD_V2_SURFACE_COLORS.surfaceHero, CARD_V2_SURFACE_COLORS.surfaceContrast];

const SurfaceColorsExample = () => (
  <BpkFlex wrap="wrap" gap={BpkSpacing.Base} paddingTop={BpkSpacing.Base}>
    {SURFACE_COLORS.map((color) => {
      const textColor = DARK_SURFACE_COLORS.includes(color) ? TEXT_COLORS.textOnDark : undefined;
      return (
        <BpkBox key={color} width="20rem">
          <BpkCardV2.Root bgColor={color} variant={CARD_V2_VARIANTS.outlined}>
            <BpkCardV2.Header>
              <BpkText textStyle={TEXT_STYLES.heading5} tagName="h3" color={textColor}>
                {color}
              </BpkText>
            </BpkCardV2.Header>
            <BpkCardV2.Body>
              <BpkText color={textColor}>Surface color example.</BpkText>
            </BpkCardV2.Body>
          </BpkCardV2.Root>
        </BpkBox>
      );
    })}
  </BpkFlex>
);

const carouselImageUrls = [
  'https://content.skyscnr.com/m/7470cf6a4ee49c26/original/Carousel-placeholder-4.jpg',
  'https://content.skyscnr.com/m/183e7ddaaca13b16/original/Carousel-placeholder-2.jpg',
  'https://content.skyscnr.com/m/f8b42e98e2b79a6/original/Carousel-placeholder-3.jpg',
  'https://content.skyscnr.com/m/51c4c9dd04c8dc95/original/Carousel-placeholder-1.jpg',
];
const carouselImages = carouselImageUrls.map((url) => (
  <BpkBox key={url} width="full" height="full">
    <img
      src={url}
      alt="hotel bedroom"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </BpkBox>
));

const DealOption = ({ text }: { text: string }) => (
  <BpkFlex gap={BpkSpacing.SM} align="center">
    <div className={getClassName('bpk-card-v2-examples__deal-icon')} />
    <BpkText textStyle={TEXT_STYLES.footnote}>{text}</BpkText>
  </BpkFlex>
)

const PackagesCardExample = () => (
  <BpkBox maxWidth="65rem">
    <BpkCardV2.Root>
      <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '3fr 4fr auto 3fr' }} padding={BpkSpacing.None}>
        <BpkCardV2.Section padding={BpkSpacing.MD} gap={BpkSpacing.Base}>
          <div className={getClassName('bpk-card-v2-examples__carousel-wrapper')}>
            <BpkCarousel images={carouselImages} bottom={16}/>
          </div>
        </BpkCardV2.Section>
        <BpkCardV2.Section padding={BpkSpacing.MD} flexDirection='row' gap={BpkSpacing.MD}>
          <BpkFlex direction="column" gap={BpkSpacing.SM} justify='top'>
            <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
              The Level at Melia Barcelona Sky
            </BpkText>
            <BpkText textStyle={TEXT_STYLES.footnote}>
              5 star hotel · Free cancellation
            </BpkText>
          </BpkFlex>
        </BpkCardV2.Section>
        <BpkCardV2.Divider />
        <BpkCardV2.Section padding={BpkSpacing.MD} gap={BpkSpacing.LG} justifyContent='end'>
            <BpkFlex direction='column' gap={BpkSpacing.MD}>
              <BpkPrice
                size={SIZES.Large}
                leadingText="Half board"
                price="£2,185"
                trailingText="total"
              />
              <DealOption text='Skyland' />
            </BpkFlex>
            <BpkButton onClick={noop} fullWidth>Go to site</BpkButton>
        </BpkCardV2.Section>
      </BpkCardV2.Body>

      <BpkCardV2.Footer padding={BpkSpacing.MD} paddingTop={BpkSpacing.None}>
        <BpkCardV2.Root bgColor={CARD_V2_SURFACE_COLORS.surfaceLowContrast} variant={CARD_V2_VARIANTS.noElevation}>
          <BpkCardV2.Body templateColumns={{ base: '1fr', desktop: '1fr auto' }} justify="space-between" gap={BpkSpacing.MD}>
            <BpkFlex gap={BpkSpacing.LG} direction={{ base: 'column', desktop: 'row' }}>
              <DealOption text="Cheapest • Meals not included  •  £1,740" />
              <DealOption text="Meals not included  •  £1,757" />
              <DealOption text="Meals not included  •  £1,858" />
            </BpkFlex>
            <BpkBox>
              <BpkLink as='button' onClick={noop}>8 deals from £1,740</BpkLink>
            </BpkBox>
          </BpkCardV2.Body>
        </BpkCardV2.Root>
      </BpkCardV2.Footer>
    </BpkCardV2.Root>
  </BpkBox>
);

const AirlineLogo = () => (
  <div className={getClassName('bpk-card-v2-examples__airline-logo')}>
    <BpkText textStyle={TEXT_STYLES.caption}>Skyland</BpkText>
  </div>
);

const FlightLeg = ({
  airlineName,
  arrivalCode,
  arrivalTime,
  departureCode,
  departureTime,
  duration,
  stops,
}: {
  airlineName: string;
  departureTime: string;
  departureCode: string;
  arrivalTime: string;
  arrivalCode: string;
  duration: string;
  stops: string;
}) => (
  <BpkGrid columns={4} templateColumns="1fr 1fr 1fr 1fr" gap={BpkSpacing.Base} align="center">
    <AirlineLogo />
    <BpkVStack alignItems="end" gap={BpkSpacing.None}>
      <BpkText textStyle={TEXT_STYLES.heading3}>{departureTime}</BpkText>
      <BpkText textStyle={TEXT_STYLES.bodyDefault} color={TEXT_COLORS.textSecondary}>{departureCode}</BpkText>
    </BpkVStack>
    <BpkVStack gap={BpkSpacing.SM}>
      <BpkText textStyle={TEXT_STYLES.footnote} color={TEXT_COLORS.textSecondary}>{duration}</BpkText>
      <BpkJourneyArrow />
      <BpkText textStyle={TEXT_STYLES.footnote} color={TEXT_COLORS.textSuccess}>{stops}</BpkText>
    </BpkVStack>
    <BpkVStack alignItems="start" gap={BpkSpacing.None}>
      <BpkText textStyle={TEXT_STYLES.heading3}>{arrivalTime}</BpkText>
      <BpkText textStyle={TEXT_STYLES.bodyDefault} color={TEXT_COLORS.textSecondary}>{arrivalCode}</BpkText>
    </BpkVStack>
  </BpkGrid>
);

const FlightsCardExample = () => (
  <BpkBox maxWidth="65rem">
    <BpkCardV2.Root>
      <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '7fr auto 3fr' }} padding={BpkSpacing.None}>
        <BpkCardV2.Section gap={BpkSpacing.Base}>
          <FlightLeg
            airlineName="Skyscanner Air"
            departureTime="06:20"
            departureCode="LHR"
            arrivalTime="09:50"
            arrivalCode="BCN"
            duration="2h 30m"
            stops="Direct"
          />
          <FlightLeg
            airlineName="Skyscanner Air"
            departureTime="18:30"
            departureCode="BCN"
            arrivalTime="20:05"
            arrivalCode="LHR"
            duration="2h 35m"
            stops="Direct"
          />
        </BpkCardV2.Section>
        <BpkCardV2.Divider />
        <BpkCardV2.Section gap={BpkSpacing.Base} justifyContent="end">
          <BpkFlex direction="column" gap={BpkSpacing.SM}>
            <BpkPrice
              size={SIZES.Large}
              price="£752"
              trailingText="£1,523 total"
              align={ALIGNS.right}
            />
          </BpkFlex>
          <BpkButton onClick={noop} fullWidth>
            Select
          </BpkButton>
        </BpkCardV2.Section>
      </BpkCardV2.Body>
    </BpkCardV2.Root>
  </BpkBox>
);

const HotelCardExample = () => (
  <BpkBox maxWidth="65rem">
    <BpkCardV2.Root>
      <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '3fr 4fr auto 3fr' }} padding={BpkSpacing.None}>
        <BpkCardV2.Section padding={BpkSpacing.None}>
          <BpkCarousel images={carouselImages} bottom={16}/>
        </BpkCardV2.Section>
        <BpkCardV2.Section gap={BpkSpacing.MD}>
          <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
            The Ritz-Carlton New York, Central Park
          </BpkText>
          <BpkStarRating
            rating={4}
            maxRating={4}
            ratingLabel="4 star hotel"
          />
          <BpkText textStyle={TEXT_STYLES.footnote}>
            0.85 miles from Central Park
          </BpkText>
          <BpkRating
            ariaLabel="4.5 out of 5 rating based on 1,532 reviews"
            value={4.5}
            title=""
            subtitle="1,532 reviews"
          />
          <BpkHStack>
            <BpkBadge>Great for couples</BpkBadge>
            <BpkBadge>City view</BpkBadge>
          </BpkHStack>
        </BpkCardV2.Section>
        <BpkCardV2.Divider />
        <BpkCardV2.Section gap={BpkSpacing.Base} justifyContent="end">
          <BpkFlex direction="column" gap={BpkSpacing.SM}>
            <BpkText textStyle={TEXT_STYLES.footnote} color={TEXT_COLORS.textError}>Our cheapest price</BpkText>
            <BpkPrice
              size={SIZES.Large}
              previousPrice="£2,033"
              leadingText="19% off"
              price="£1,830"
              trailingText="a night"
            />
            <BpkLink href="https://example.com" target="_blank">£3,360 total</BpkLink>
          </BpkFlex>
          <BpkButton onClick={noop} fullWidth>
            Go to site
          </BpkButton>
        </BpkCardV2.Section>
      </BpkCardV2.Body>
    </BpkCardV2.Root>
  </BpkBox>
);

const CustomPaddingExample = () => (
  <BpkFlex wrap="wrap" gap={BpkSpacing.Base} paddingTop={BpkSpacing.Base}>
    <BpkBox width="20rem">
      <BpkCardV2.Root variant={CARD_V2_VARIANTS.outlined}>
        <BpkCardV2.Header padding={BpkSpacing.LG}>
          <BpkText textStyle={TEXT_STYLES.heading5} tagName="h3">
            Large padding
          </BpkText>
        </BpkCardV2.Header>
        <BpkCardV2.Body padding={BpkSpacing.SM}>
          <BpkText>Small body padding.</BpkText>
        </BpkCardV2.Body>
        <BpkCardV2.Footer padding={BpkSpacing.None}>
          <BpkText textStyle={TEXT_STYLES.caption}>No footer padding.</BpkText>
        </BpkCardV2.Footer>
      </BpkCardV2.Root>
    </BpkBox>
    <BpkBox width="20rem">
      <BpkCardV2.Root variant={CARD_V2_VARIANTS.outlined}>
        <BpkCardV2.Header
          paddingTop={BpkSpacing.SM}
          paddingBottom={BpkSpacing.SM}
          paddingStart={BpkSpacing.XL}
          paddingEnd={BpkSpacing.XL}
        >
          <BpkText textStyle={TEXT_STYLES.heading5} tagName="h3">
            Mixed padding
          </BpkText>
        </BpkCardV2.Header>
        <BpkCardV2.Body
          paddingTop={BpkSpacing.Base}
          paddingBottom={BpkSpacing.LG}
          paddingStart={BpkSpacing.XL}
          paddingEnd={BpkSpacing.XL}
        >
          <BpkText>Individual side padding.</BpkText>
        </BpkCardV2.Body>
      </BpkCardV2.Root>
    </BpkBox>
  </BpkFlex>
);

const AllExamples = () => (
  <BpkVStack>
    <BpkBox paddingTop={BpkSpacing.LG}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Default
      </BpkText>
      <DefaultExample />
    </BpkBox>
    <BpkBox paddingTop={BpkSpacing.LG}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Variants
      </BpkText>
      <VariantsExample />
    </BpkBox>
    <BpkBox paddingTop={BpkSpacing.LG}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Surface Colors
      </BpkText>
      <SurfaceColorsExample />
    </BpkBox>
    <BpkBox paddingTop={BpkSpacing.LG}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Packages Card
      </BpkText>
      <PackagesCardExample />
    </BpkBox>
    <BpkBox paddingTop={BpkSpacing.LG}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Flights Card
      </BpkText>
      <FlightsCardExample />
    </BpkBox>
    <BpkBox paddingTop={BpkSpacing.LG} paddingBottom={BpkSpacing.XL}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Custom Padding
      </BpkText>
      <CustomPaddingExample />
    </BpkBox>
  </BpkVStack>
);

export {
  DefaultExample,
  VariantsExample,
  SurfaceColorsExample,
  PackagesCardExample,
  FlightsCardExample,
  HotelCardExample,
  CustomPaddingExample,
  AllExamples,
};
