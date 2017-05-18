import React from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkParagraph from 'bpk-component-paragraph';
import { spacingSm } from 'bpk-tokens/tokens/base.es6';
import accordionsReadme from 'bpk-component-accordion/readme.md';
import { BpkAccordionContainer, BpkAccordionItem } from 'bpk-component-accordion';

import DocsPageBuilder from './../../components/DocsPageBuilder';

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
      <BpkParagraph>
        By default, accordions allow only one section to be expanded at any time.
      </BpkParagraph>,
    ],
    examples: [
      <BpkAccordionContainer>
        <BpkAccordionItem id="stops" title="Stops" expanded>
          <StopsContent />
        </BpkAccordionItem>
        <BpkAccordionItem id="airlines" title="Airlines">
          <AirlinesContent />
        </BpkAccordionItem>
        <BpkAccordionItem id="airports" title="Airports">
          <AirportsContent />
        </BpkAccordionItem>
      </BpkAccordionContainer>,
    ],
  },
  {
    id: 'multiple-section-open',
    title: 'Multiple sections open',
    blurb: [
      <BpkParagraph>
        Accordions can also be configured to allow multiple sections to be expanded simultaneously.
      </BpkParagraph>,
    ],
    examples: [
      <BpkAccordionContainer allowMultiple>
        <BpkAccordionItem id="stops" title="Stops" expanded>
          <StopsContent />
        </BpkAccordionItem>
        <BpkAccordionItem id="airlines" title="Airlines">
          <AirlinesContent />
        </BpkAccordionItem>
        <BpkAccordionItem id="airports" title="Airports">
          <AirportsContent />
        </BpkAccordionItem>
      </BpkAccordionContainer>,
    ],
  },
];

const AccordionsPage = () => <DocsPageBuilder
  title="Accordions"
  blurb={[
    <BpkParagraph>
      An accordion is a vertically stacked set of elements, such as content or forms, that allow the user to toggle
      the display of sections of content. Each labeling element can be expanded or collapsed to reveal or hide its
      associated content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections
      of content on a single page.
    </BpkParagraph>,
  ]}
  components={components}
  readme={accordionsReadme}
/>;

export default AccordionsPage;
