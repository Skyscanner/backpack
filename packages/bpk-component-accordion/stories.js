import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BpkCheckbox from 'bpk-component-checkbox';
import { spacingSm } from 'bpk-tokens/tokens/base.es6';

import { BpkAccordion, withSingleItemAccordionState, BpkAccordionItem, withAccordionItemState } from './index';

const SingleItemAccordion = withSingleItemAccordionState(BpkAccordion);
const StatefulAccordionItem = withAccordionItemState(BpkAccordionItem);

const CheckboxWrapper = props => <div style={{ padding: `${spacingSm} 0` }} {...props} />;

const StopsContent = () => (
  <form>
    <CheckboxWrapper>
      <BpkCheckbox
        name="direct"
        label="Direct"
        onChange={() => null}
        checked
      />
    </CheckboxWrapper>
    <CheckboxWrapper>
      <BpkCheckbox
        name="1-stop"
        label="1 stop"
        onChange={() => null}
        checked
      />
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
        label="bmi regional"
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
      <BpkAccordionItem id="departure-times" title="Departure times" initiallyExpanded>
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
      <StatefulAccordionItem id="departure-times" title="Departure times" initiallyExpanded>
        <AirlinesContent />
      </StatefulAccordionItem>
      <StatefulAccordionItem id="journey-duration" title="Journey duration" initiallyExpanded>
        <AirportsContent />
      </StatefulAccordionItem>
    </BpkAccordion>
  ))
  .add('Multiple items open (second & third items initially expanded)', () => (
    <BpkAccordion>
      <StatefulAccordionItem id="stops" title="Stops">
        <StopsContent />
      </StatefulAccordionItem>
      <StatefulAccordionItem id="departure-times" title="Departure times" initiallyExpanded>
        <AirlinesContent />
      </StatefulAccordionItem>
      <StatefulAccordionItem id="journey-duration" title="Journey duration" initiallyExpanded>
        <AirportsContent />
      </StatefulAccordionItem>
    </BpkAccordion>
  ))
  .add('Custom', () => (
    <BpkAccordion>
      <BpkAccordionItem id="stops" title="Stops" expanded>
        <StopsContent />
      </BpkAccordionItem>
      <BpkAccordionItem id="departure-times" title="Departure times">
        <AirlinesContent />
      </BpkAccordionItem>
      <BpkAccordionItem id="journey-duration" title="Journey duration" expanded>
        <AirportsContent />
      </BpkAccordionItem>
    </BpkAccordion>
  ));
