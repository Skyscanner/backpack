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

import BpkBadge, { BADGE_TYPES } from '../../packages/bpk-component-badge';
import BpkButton from '../../packages/bpk-component-button';
import { BpkCardV2 } from '../../packages/bpk-component-card-v2';
import BpkCarousel from '../../packages/bpk-component-carousel';
import BpkJourneyArrow from '../../packages/bpk-component-journey-arrow';
import { BpkFlex, BpkGrid, BpkSpacing, BpkBox, BpkHStack, BpkVStack } from '../../packages/bpk-component-layout';
import BpkLink from '../../packages/bpk-component-link';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkPrice, { SIZES, ALIGNS } from '../../packages/bpk-component-price';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import type {
  BpkCardV2SurfaceColor,
  BpkCardV2Variant,
} from '../../packages/bpk-component-card-v2/src/BpkCardV2/common-types';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const SURFACE_COLORS: BpkCardV2SurfaceColor[] = [
  'surfaceDefault',
  'surfaceElevated',
  'surfaceTint',
  'surfaceSubtle',
  'surfaceHero',
  'surfaceContrast',
  'surfaceLowContrast',
  'surfaceHighlight',
];

const VARIANTS: BpkCardV2Variant[] = ['default', 'outlined', 'noElevation'];

const Placeholder = ({ label }: { label: string }) => (
  <div className={getClassName('bpk-card-v2-examples__placeholder')}>
    {label}
  </div>
);

const DefaultExample = () => (
  <div className={getClassName('bpk-card-v2-examples__card-wrapper')}>
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
  </div>
);

const VariantsExample = () => (
  <div>
    <div className={getClassName('bpk-card-v2-examples__grid')}>
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          className={getClassName('bpk-card-v2-examples__card-wrapper')}
        >
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
        </div>
      ))}
    </div>
  </div>
);

const SurfaceColorsExample = () => (
  <div className={getClassName('bpk-card-v2-examples__grid')}>
    {SURFACE_COLORS.map((color) => (
      <div
        key={color}
        className={getClassName('bpk-card-v2-examples__card-wrapper')}
      >
        <BpkCardV2.Root bgColor={color} variant="outlined">
          <BpkCardV2.Header>
            <BpkText textStyle={TEXT_STYLES.heading5} tagName="h3">
              {color}
            </BpkText>
          </BpkCardV2.Header>
          <BpkCardV2.Body>
            <BpkText>Surface color example.</BpkText>
          </BpkCardV2.Body>
        </BpkCardV2.Root>
      </div>
    ))}
  </div>
);

const carouselImageUrls = [
  'https://content.skyscnr.com/m/7470cf6a4ee49c26/original/Carousel-placeholder-4.jpg',
  'https://content.skyscnr.com/m/183e7ddaaca13b16/original/Carousel-placeholder-2.jpg',
  'https://content.skyscnr.com/m/f8b42e98e2b79a6/original/Carousel-placeholder-3.jpg',
  'https://content.skyscnr.com/m/51c4c9dd04c8dc95/original/Carousel-placeholder-1.jpg',
];
const imagesList = carouselImageUrls.map(url => <div><img src={url} alt='hotel bedroom' /></div>)

const carouselImages = carouselImageUrls.map((url) => (
  <div key={url} style={{ width: '100%', height: '100%' }}>
    <img
      src={url}
      alt="hotel bedroom"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
));

const DealOption = ({ text }: { text: string }) => (
  <BpkFlex gap={BpkSpacing.SM} align="center">
    <div className={getClassName('bpk-card-v2-examples__deal-icon')} />
    <BpkText textStyle={TEXT_STYLES.footnote}>{text}</BpkText>
  </BpkFlex>
)

const PackagesCardExample = () => (
  <div className={getClassName('bpk-card-v2-examples__wide-card-wrapper')}>
    <BpkCardV2.Root>
      <BpkCardV2.Body split splitRatio={70}>
        <BpkCardV2.Primary padding={BpkSpacing.MD} flexDirection='row' gap={BpkSpacing.MD}>
          <div className={getClassName('bpk-card-v2-examples__carousel-wrapper')}>
            <BpkCarousel images={carouselImages} bottom={16}/>
          </div>
          <BpkFlex direction="column" gap={BpkSpacing.SM} justify='top'>
            <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
              The Level at Melia Barcelona Sky
            </BpkText>
            <BpkText textStyle={TEXT_STYLES.footnote}>
              5 star hotel · Free cancellation
            </BpkText>
          </BpkFlex>
        </BpkCardV2.Primary>
        <BpkCardV2.Secondary padding={BpkSpacing.MD} gap={BpkSpacing.LG} justifyContent='end'>
            <BpkFlex direction='column' gap={BpkSpacing.MD}>
              <BpkPrice
                size={SIZES.Large}
                leadingText="Half board"
                price="£2,185"
                trailingText="total"
              />
              <DealOption text='Skyland' />
            </BpkFlex>
            <BpkButton onClick={() => alert('Book now')} fullWidth>Go to site</BpkButton>
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
      <BpkCardV2.Footer padding={BpkSpacing.MD} paddingTop={BpkSpacing.None}>
        <BpkCardV2.Root bgColor='surfaceLowContrast' variant='noElevation'>
          <BpkCardV2.Body justify="space-between" direction={{ base: 'column', mobile: 'row' }} gap={BpkSpacing.MD}>
            <BpkFlex gap={BpkSpacing.LG} direction={{ base: 'column', mobile: 'row' }}>
              <DealOption text="Cheapest • Meals not included  •  £1,740" />
              <DealOption text="Meals not included  •  £1,757" />
              <DealOption text="Meals not included  •  £1,858" />
            </BpkFlex>
            <div>
              <BpkLink as='button' onClick={() => alert('Show deals')}>8 deals from £1,740</BpkLink>
            </div>
          </BpkCardV2.Body>
        </BpkCardV2.Root>
      </BpkCardV2.Footer>
    </BpkCardV2.Root>
  </div>
);

const AirlineLogo = () => (
  <div className={getClassName('bpk-card-v2-examples__airline-logo')}>
    <BpkText textStyle={TEXT_STYLES.caption} tagName="span">Skyland</BpkText>
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
      <BpkText textStyle={TEXT_STYLES.heading3} tagName="span">{departureTime}</BpkText>
      <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="span" color={TEXT_COLORS.textSecondary}>{departureCode}</BpkText>
    </BpkVStack>
    <BpkVStack gap={BpkSpacing.SM}>
      <BpkText textStyle={TEXT_STYLES.footnote} tagName="span" color={TEXT_COLORS.textSecondary}>{duration}</BpkText>
      <BpkJourneyArrow />
      <BpkText textStyle={TEXT_STYLES.footnote} tagName="span" color={TEXT_COLORS.textSuccess}>{stops}</BpkText>
    </BpkVStack>
    <BpkVStack alignItems="start" gap={BpkSpacing.None}>
      <BpkText textStyle={TEXT_STYLES.heading3} tagName="span">{arrivalTime}</BpkText>
      <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="span" color={TEXT_COLORS.textSecondary}>{arrivalCode}</BpkText>
    </BpkVStack>
  </BpkGrid>
);

const FlightsCardExample = () => (
  <div className={getClassName('bpk-card-v2-examples__wide-card-wrapper')}>
    <BpkCardV2.Root>
      <BpkCardV2.Body split splitRatio={70}>
        <BpkCardV2.Primary gap={BpkSpacing.Base}>
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
        </BpkCardV2.Primary>
        <BpkCardV2.Secondary gap={BpkSpacing.Base} justifyContent="end">
          <BpkFlex direction="column" gap={BpkSpacing.SM}>
            <BpkPrice
              size={SIZES.Large}
              price="£752"
              trailingText="£1,523 total"
              align={ALIGNS.right}
            />
          </BpkFlex>
          <BpkButton onClick={() => alert('Select flight')} fullWidth>
            Select
          </BpkButton>
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
    </BpkCardV2.Root>
  </div>
);

const CustomPaddingExample = () => (
  <div className={getClassName('bpk-card-v2-examples__grid')}>
    <div className={getClassName('bpk-card-v2-examples__card-wrapper')}>
      <BpkCardV2.Root variant="outlined">
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
    </div>
    <div className={getClassName('bpk-card-v2-examples__card-wrapper')}>
      <BpkCardV2.Root variant="outlined">
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
    </div>
  </div>
);

type InteractiveExampleProps = {
  variant?: BpkCardV2Variant;
  bgColor?: BpkCardV2SurfaceColor;
  split?: boolean;
  splitRatio?: number;
  showHeader?: boolean;
  showFooter?: boolean;
};

const InteractiveExample = ({
  bgColor = 'surfaceDefault',
  showFooter = true,
  showHeader = true,
  split = false,
  splitRatio = 70,
  variant = 'default',
}: InteractiveExampleProps) => (
  <div className={getClassName('bpk-card-v2-examples__wide-card-wrapper')}>
    <BpkCardV2.Root variant={variant} bgColor={bgColor}>
      {showHeader && (
        <BpkCardV2.Header>
          <BpkText textStyle={TEXT_STYLES.heading4} tagName="h3">
            Card Header
          </BpkText>
        </BpkCardV2.Header>
      )}
      <BpkCardV2.Body split={split} splitRatio={splitRatio}>
        {split ? (
          <>
            <BpkCardV2.Primary>
              <Placeholder label="Primary area" />
            </BpkCardV2.Primary>
            <BpkCardV2.Secondary>
              <Placeholder label="Secondary area" />
            </BpkCardV2.Secondary>
          </>
        ) : (
          <BpkText>
            This is the card body content. Adjust the controls to see how the
            card responds to different prop combinations.
          </BpkText>
        )}
      </BpkCardV2.Body>
      {showFooter && (
        <BpkCardV2.Footer>
          <BpkText textStyle={TEXT_STYLES.caption}>Card Footer</BpkText>
        </BpkCardV2.Footer>
      )}
    </BpkCardV2.Root>
  </div>
);

const AllExamples = () => (
  <div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Default
      </BpkText>
      <DefaultExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Variants
      </BpkText>
      <VariantsExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Surface Colors
      </BpkText>
      <SurfaceColorsExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Packages Card
      </BpkText>
      <PackagesCardExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Flights Card
      </BpkText>
      <FlightsCardExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Custom Padding
      </BpkText>
      <CustomPaddingExample />
    </div>
  </div>
);

export {
  DefaultExample,
  VariantsExample,
  SurfaceColorsExample,
  PackagesCardExample,
  FlightsCardExample,
  CustomPaddingExample,
  InteractiveExample,
  AllExamples,
};
