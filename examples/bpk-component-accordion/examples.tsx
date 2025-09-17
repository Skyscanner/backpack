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
  canvasContrastDay,
  canvasDay,
  colorMonteverde,
  colorPanjin,
  iconSizeLg,
  iconSizeSm,
  lineHeightBase,
  surfaceContrastDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import {
  BpkAccordion,
  withSingleItemAccordionState,
  BpkAccordionItem,
  withAccordionItemState,
} from '../../packages/bpk-component-accordion';
// @ts-expect-error Untyped import - see `decisions/imports-ts-suppressions.md`.
import BpkCheckbox from '../../packages/bpk-component-checkbox';
import { withAlignment } from '../../packages/bpk-component-icon';
import StopsIcon from '../../packages/bpk-component-icon/sm/stops';
import TimeIcon from '../../packages/bpk-component-icon/sm/time';
import TrendDownIcon from '../../packages/bpk-component-icon/lg/trend--down';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../packages/bpk-component-text';
import { ACCORDION_TYPES } from '../../packages/bpk-component-accordion/src/common-types';

const SingleItemAccordion = withSingleItemAccordionState(BpkAccordion);
const StatefulAccordionItem = withAccordionItemState(BpkAccordionItem);

const AlignedStopsIcon = withAlignment(StopsIcon, lineHeightBase, iconSizeSm);
const AlignedTimeIcon = withAlignment(TimeIcon, lineHeightBase, iconSizeSm);

const AlignedTrendDownIcon = withAlignment(TrendDownIcon, lineHeightBase, iconSizeLg);

const CheckboxWrapper = (props: any) => (
  <div style={{ padding: `1rem 0` }} {...props} />
);

const StopsContent = () => (
  <form>
    <CheckboxWrapper>
      <BpkCheckbox name="direct" label="Direct" onChange={() => null} checked />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox name="1-stop" label="1 stop" onChange={() => null} checked />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="2-plus-stops"
        label="2+ stops"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
  </form>
);

const AirlinesContent = () => (
  <form>
    <CheckboxWrapper>
      <BpkCheckbox
        name="air-france"
        label="Air France"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="alitalia"
        label="Alitalia"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="bmi-regional"
        label="BMI regional"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="british-airways"
        label="British Airways"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="easyjet"
        label="Easyjet"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
  </form>
);

const AirportsContent = () => (
  <form>
    <CheckboxWrapper>
      <BpkCheckbox
        name="lcy"
        label="London City"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="LGW"
        label="London Gatwick"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="lhr"
        label="London Heathrow"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="ltn"
        label="London Luton"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="stn"
        label="London Stansted"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
  </form>
);

const SeoTextContent = () => (
  <BpkText>
    Synth umami, whatever tacos vape retro selvage venmo cred kale chips photo
    booth neutra mlkshk. Cold-pressed banh mi williamsburg deep v master cleanse
    woke vinyl slow-carb glossier man braid bitters iceland venmo 8-bit
    vexillologist. Fashion axe air plant shabby chic bushwick man braid. Vice
    fam typewriter iPhone selfies tattooed.
  </BpkText>
);

const SingleItemExample = () => (
  <SingleItemAccordion>
    <BpkAccordionItem id="stops" title="Stops" initiallyExpanded>
      <StopsContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="airlines" title="Airlines">
      <AirlinesContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="airports" title="Airports">
      <AirportsContent />
    </BpkAccordionItem>
  </SingleItemAccordion>
);

const SingleItemExampleInitiallyExpandedExample = () => (
  <SingleItemAccordion>
    <BpkAccordionItem id="stops" title="Stops">
      <StopsContent />
    </BpkAccordionItem>
    <BpkAccordionItem
      id="departure-times"
      title="Departure times"
      initiallyExpanded
    >
      <AirlinesContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="journey-duration" title="Journey duration">
      <AirportsContent />
    </BpkAccordionItem>
  </SingleItemAccordion>
);

const MultipleItemsOpenExample = () => (
  <BpkAccordion>
    <StatefulAccordionItem id="stops" title="Stops" initiallyExpanded>
      <StopsContent />
    </StatefulAccordionItem>
    <StatefulAccordionItem
      id="departure-times"
      title="Departure times"
      initiallyExpanded
    >
      <AirlinesContent />
    </StatefulAccordionItem>
    <StatefulAccordionItem
      id="journey-duration"
      title="Journey duration"
      initiallyExpanded
    >
      <AirportsContent />
    </StatefulAccordionItem>
  </BpkAccordion>
);

const MultipleItemsOpenInitiallyExpandedExample = () => (
  <BpkAccordion>
    <StatefulAccordionItem id="stops" title="Stops">
      <StopsContent />
    </StatefulAccordionItem>
    <StatefulAccordionItem
      id="departure-times"
      title="Departure times"
      initiallyExpanded
    >
      <AirlinesContent />
    </StatefulAccordionItem>
    <StatefulAccordionItem
      id="journey-duration"
      title="Journey duration"
      initiallyExpanded
    >
      <AirportsContent />
    </StatefulAccordionItem>
  </BpkAccordion>
);

const CustomExample = () => (
  <BpkAccordion>
    <BpkAccordionItem id="stops" title="Stops" tagName="h3" expanded>
      <StopsContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="departure-times" title="Departure times" tagName="h2">
      <AirlinesContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="journey-duration" title="Journey duration" expanded>
      <AirportsContent />
    </BpkAccordionItem>
  </BpkAccordion>
);

const CustomTitleTextStyleExample = () => (
  <SingleItemAccordion>
    <BpkAccordionItem textStyle="lg" id="stops" title="Stops" initiallyExpanded>
      <StopsContent />
    </BpkAccordionItem>
    <BpkAccordionItem textStyle="lg" id="airlines" title="Airlines">
      <AirlinesContent />
    </BpkAccordionItem>
    <BpkAccordionItem textStyle="lg" id="airports" title="Airports">
      <AirportsContent />
    </BpkAccordionItem>
  </SingleItemAccordion>
);

const WithIconsExample = () => (
  <BpkAccordion>
    <BpkAccordionItem
      id="stops"
      title="Stops"
      tagName="h3"
      expanded
      icon={<AlignedStopsIcon fill={colorPanjin} />}
    >
      <StopsContent />
    </BpkAccordionItem>
    <BpkAccordionItem
      id="departure-times"
      title="Departure times"
      tagName="h2"
      icon={<AlignedTimeIcon fill={colorMonteverde} />}
    >
      <AirlinesContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="journey-duration" title="Journey duration" expanded>
      <AirportsContent />
    </BpkAccordionItem>
  </BpkAccordion>
);

const WithBoldTitlesExample = () => (
  <SingleItemAccordion>
    <BpkAccordionItem
      id="stops"
      title="Stops"
      initiallyExpanded
      textStyle="label-1"
    >
      <StopsContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="airlines" title="Airlines" textStyle="heading-4">
      <AirlinesContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="airports" title="Airports" textStyle="heading-3">
      <AirportsContent />
    </BpkAccordionItem>
  </SingleItemAccordion>
);

const WithDarkBackgroundExample = () => (
  <div style={{ backgroundColor: surfaceContrastDay }}>
    <SingleItemAccordion onDark>
      <BpkAccordionItem
        id="stops"
        title="Stops"
        initiallyExpanded
        textStyle="label-1"
      >
        <StopsContent />
      </BpkAccordionItem>
      <BpkAccordionItem id="airlines" title="Airlines" textStyle="heading-4">
        <AirlinesContent />
      </BpkAccordionItem>
      <BpkAccordionItem id="airports" title="Airports" textStyle="heading-3">
        <AirportsContent />
      </BpkAccordionItem>
    </SingleItemAccordion>
  </div>
);

const WithSeoContentOnDarkExample = () => (
  <div style={{ backgroundColor: surfaceContrastDay }}>
    <SingleItemAccordion onDark>
      <BpkAccordionItem
        id="travel"
        title="Join 100 million savvy travellers as you compare flights, hotels and cars from hundreds of providers. Here’s how."
        textStyle="heading-5"
      >
        <SeoTextContent />
      </BpkAccordionItem>
      <BpkAccordionItem
        id="travel-2"
        title="Our international sites"
        textStyle="heading-3"
      >
        <SeoTextContent />
      </BpkAccordionItem>
    </SingleItemAccordion>
  </div>
);

const WithSeoContentExample = () => (
  <SingleItemAccordion>
    <BpkAccordionItem
      id="travel"
      title="Join 100 million savvy travellers as you compare flights, hotels and cars from hundreds of providers. Here’s how."
      textStyle="heading-5"
    >
      <SeoTextContent />
    </BpkAccordionItem>
    <BpkAccordionItem
      id="travel-2"
      title="Our international sites"
      textStyle="heading-3"
    >
      <SeoTextContent />
    </BpkAccordionItem>
  </SingleItemAccordion>
);

const SingleItemExampleWithoutDivider = () => (
  <SingleItemAccordion divider={false}>
    <BpkAccordionItem id="stops" title="Stops" initiallyExpanded>
      <StopsContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="airlines" title="Airlines">
      <AirlinesContent />
    </BpkAccordionItem>
    <BpkAccordionItem id="airports" title="Airports">
      <AirportsContent />
    </BpkAccordionItem>
  </SingleItemAccordion>
);

const SingleItemExampleWithoutDividerOnDark = () => (
  <div style={{ backgroundColor: surfaceContrastDay }}>
    <SingleItemAccordion divider={false} onDark>
      <BpkAccordionItem id="stops" title="Stops" initiallyExpanded>
        <StopsContent />
      </BpkAccordionItem>
      <BpkAccordionItem id="airlines" title="Airlines">
        <AirlinesContent />
      </BpkAccordionItem>
      <BpkAccordionItem id="airports" title="Airports">
        <AirportsContent />
      </BpkAccordionItem>
    </SingleItemAccordion>
  </div>
);

const VariantExample = () => (
  <div>
    <div style={{ backgroundColor: canvasContrastDay, padding: '2rem' }}>

      <BpkAccordion divider={false} type={ACCORDION_TYPES.surfaceDefault}>
        <StatefulAccordionItem
          id="stops"
          title={ <BpkText textStyle={TEXT_STYLES.heading4}>You found some <BpkText textStyle={TEXT_STYLES.heading4} color={TEXT_COLORS.textSuccess}>great prices</BpkText> - nice one!</BpkText> }
          label="Show price data"
          icon={<AlignedTrendDownIcon />}>
          <StopsContent />
        </StatefulAccordionItem>
      </BpkAccordion>
    </div>

    <div style={{ backgroundColor: canvasDay, padding: '2rem' }}>
      <BpkAccordion divider={false} type={ACCORDION_TYPES.surfaceLowContrast}>
        <StatefulAccordionItem
          id="stops"
          label="Our lowest price £90">
          <StopsContent />
        </StatefulAccordionItem>
      </BpkAccordion>
    </div>
  </div>
)

export {
  SingleItemExample,
  SingleItemExampleInitiallyExpandedExample,
  MultipleItemsOpenExample,
  MultipleItemsOpenInitiallyExpandedExample,
  CustomExample,
  CustomTitleTextStyleExample,
  WithIconsExample,
  WithBoldTitlesExample,
  WithDarkBackgroundExample,
  WithSeoContentExample,
  WithSeoContentOnDarkExample,
  SingleItemExampleWithoutDivider,
  SingleItemExampleWithoutDividerOnDark,
  VariantExample,
};
