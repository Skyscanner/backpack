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

/* @flow strict */

import {
  colorMonteverde,
  colorPanjin,
  iconSizeSm,
  lineHeightBase,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkCheckbox from '../../packages/bpk-component-checkbox';
import { withAlignment } from '../../packages/bpk-component-icon';
import StopsIcon from '../../packages/bpk-component-icon/sm/stops';
import TimeIcon from '../../packages/bpk-component-icon/sm/time';
import {
  BpkAccordion,
  withSingleItemAccordionState,
  BpkAccordionItem,
  withAccordionItemState,
} from '../../packages/bpk-component-accordion';

const SingleItemAccordion = withSingleItemAccordionState(BpkAccordion);
const StatefulAccordionItem = withAccordionItemState(BpkAccordionItem);

const AlignedStopsIcon = withAlignment(StopsIcon, lineHeightBase, iconSizeSm);
const AlignedTimeIcon = withAlignment(TimeIcon, lineHeightBase, iconSizeSm);

const CheckboxWrapper = (props) => (
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

export {
  SingleItemExample,
  SingleItemExampleInitiallyExpandedExample,
  MultipleItemsOpenExample,
  MultipleItemsOpenInitiallyExpandedExample,
  CustomExample,
  CustomTitleTextStyleExample,
  WithIconsExample,
  WithBoldTitlesExample,
};
