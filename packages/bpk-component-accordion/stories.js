/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';
import { storiesOf } from '@storybook/react';
import BpkCheckbox from 'bpk-component-checkbox';
import { withAlignment } from 'bpk-component-icon';
import StopsIcon from 'bpk-component-icon/sm/stops';
import TimeIcon from 'bpk-component-icon/sm/time';
import {
  colorMonteverde,
  colorPanjin,
  iconSizeSm,
  lineHeightBase,
  spacingSm,
} from 'bpk-tokens/tokens/base.es6';

import {
  BpkAccordion,
  withSingleItemAccordionState,
  BpkAccordionItem,
  withAccordionItemState,
  WEIGHT_STYLES,
} from './index';

const SingleItemAccordion = withSingleItemAccordionState(BpkAccordion);
const StatefulAccordionItem = withAccordionItemState(BpkAccordionItem);

const AlignedStopsIcon = withAlignment(StopsIcon, lineHeightBase, iconSizeSm);
const AlignedTimeIcon = withAlignment(TimeIcon, lineHeightBase, iconSizeSm);

const CheckboxWrapper = props => (
  <div style={{ padding: `${spacingSm} 0` }} {...props} />
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

storiesOf('bpk-component-accordion', module)
  .add('Single item only', () => (
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
  ))
  .add('Single item only (second item initially expanded)', () => (
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
  ))
  .add('Multiple items open', () => (
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
  ))
  .add('Multiple items open (second & third items initially expanded)', () => (
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
  ))
  .add('Custom', () => (
    <BpkAccordion>
      <BpkAccordionItem id="stops" title="Stops" tagName="h3" expanded>
        <StopsContent />
      </BpkAccordionItem>
      <BpkAccordionItem
        id="departure-times"
        title="Departure times"
        tagName="h2"
      >
        <AirlinesContent />
      </BpkAccordionItem>
      <BpkAccordionItem id="journey-duration" title="Journey duration" expanded>
        <AirportsContent />
      </BpkAccordionItem>
    </BpkAccordion>
  ))
  .add('Custom title textStyle', () => (
    <SingleItemAccordion>
      <BpkAccordionItem
        textStyle="lg"
        id="stops"
        title="Stops"
        initiallyExpanded
      >
        <StopsContent />
      </BpkAccordionItem>
      <BpkAccordionItem textStyle="lg" id="airlines" title="Airlines">
        <AirlinesContent />
      </BpkAccordionItem>
      <BpkAccordionItem textStyle="lg" id="airports" title="Airports">
        <AirportsContent />
      </BpkAccordionItem>
    </SingleItemAccordion>
  ))
  .add('With icons', () => (
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
  ))
  .add('With bold titles', () => (
    <SingleItemAccordion>
      <BpkAccordionItem
        id="stops"
        title="Stops"
        initiallyExpanded
        weight={WEIGHT_STYLES.bold}
      >
        <StopsContent />
      </BpkAccordionItem>
      <BpkAccordionItem
        id="airlines"
        title="Airlines"
        textStyle="lg"
        weight={WEIGHT_STYLES.bold}
      >
        <AirlinesContent />
      </BpkAccordionItem>
      <BpkAccordionItem
        id="airports"
        title="Airports"
        textStyle="xl"
        weight={WEIGHT_STYLES.bold}
      >
        <AirportsContent />
      </BpkAccordionItem>
    </SingleItemAccordion>
  ));
