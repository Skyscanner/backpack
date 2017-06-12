import React from 'react';
import BpkPanel from 'bpk-component-panel';
import BpkParagraph from 'bpk-component-paragraph';

import panelReadme from 'bpk-component-panel/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        This is the default panel type which comes with padding already applied to get you up and running quickly.
      </BpkParagraph>,
    ],
    examples: [
      <BpkPanel>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    blurb: 'As above, but without padding, allowing you to have full-bleed content or roll your own padding.',
    examples: [
      <BpkPanel padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    ],
  },
  {
    id: 'full-width',
    title: 'Fullwidth',
    blurb: 'This option allows you to make a panel full width, which is especially useful on small viewports.',
    examples: [
      <BpkPanel fullWidth>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    ],
  },
];

const PanelsPage = () => <DocsPageBuilder
  title="Panel"
  blurb={[
    <BpkParagraph>
      Panels are useful for housing distinct areas of related content.
      Unlike cards these are not clickable. Be careful not to over use these,
      these should be used sparingly to avoid the UI becoming overly boxy.
    </BpkParagraph>,
  ]}
  components={components}
  readme={panelReadme}
  sassdocId="panels"
/>;

export default PanelsPage;
