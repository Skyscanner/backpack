/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import accordionsReadme from 'bpk-component-accordion/readme.md';
import {
  BpkAccordion,
  BpkAccordionItem,
  withSingleItemAccordionState,
  withAccordionItemState,
} from 'bpk-component-accordion';
import { spacingSm } from 'bpk-tokens/tokens/base.es6';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

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

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        By default, accordions allow only one section to be expanded at any time.
      </Paragraph>,
    ],
    examples: [
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
      </SingleItemAccordion>,
    ],
  },
  {
    id: 'multiple-section-open',
    title: 'Multiple sections open',
    blurb: [
      <Paragraph>
        Accordions can also be configured to allow multiple sections to be expanded simultaneously.
      </Paragraph>,
    ],
    examples: [
      <BpkAccordion>
        <StatefulAccordionItem id="stops" title="Stops" initiallyExpanded>
          <StopsContent />
        </StatefulAccordionItem>
        <StatefulAccordionItem id="airlines" title="Airlines" initiallyExpanded>
          <AirlinesContent />
        </StatefulAccordionItem>
        <StatefulAccordionItem id="airports" title="Airports">
          <AirportsContent />
        </StatefulAccordionItem>
      </BpkAccordion>,
    ],
  },
];

const AccordionsPage = () => <DocsPageBuilder
  title="Accordions"
  blurb={[
    <Paragraph>
      An accordion is a vertically stacked set of elements, such as content or forms, that allow the user to toggle
      the display of sections of content. Each labeling element can be expanded or collapsed to reveal or hide its
      associated content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections
      of content on a single page.
    </Paragraph>,
  ]}
  components={components}
  readme={accordionsReadme}
/>;

export default AccordionsPage;
