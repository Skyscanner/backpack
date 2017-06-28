import React from 'react';
import BpkHeading from 'bpk-component-heading';
import BpkTooltip from 'bpk-component-tooltip';
import BpkParagraph from 'bpk-component-paragraph';
import BpkRouterLink from 'bpk-component-router-link';
import tooltipReadme from 'bpk-component-tooltip/readme.md';
import { spacingSm, colorGreen500 } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import STYLES from './tooltips-page.scss';

const getClassName = cssModules(STYLES);

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        By default, tooltips come with some padding so all you need to do is drop in some content.
      </BpkParagraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip"
        target={<BpkHeading level="h3" className={getClassName('bpkdocs-tooltips-page__heading')}>LHR</BpkHeading>}
      >
        London Heathrow
      </BpkTooltip>,
    ],
  },
  {
    id: 'alt-positioning',
    title: 'Alternative positioning',
    blurb: [
      <BpkParagraph>
        Tooltips can also be positioned to either side of the target element.
      </BpkParagraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip-2"
        tetherOptions={{
          attachment: 'middle left',
          constraints: [
            {
              to: 'window',
              attachment: 'together',
              pin: true,
            },
          ],
        }}
        target={<BpkHeading level="h3" className={getClassName('bpkdocs-tooltips-page__heading')}>EDI</BpkHeading>}
      >
        Edinburgh
      </BpkTooltip>,
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    blurb: [
      <BpkParagraph>
        Tooltips are also available without padding should you wish to display fullwidth content e.g. an image.
      </BpkParagraph>,
      <BpkParagraph>
        An example of this can be seen below where a coloured border is included to denote directness for a tooltip
        used on the map.
      </BpkParagraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip-3"
        padded={false}
        target={<BpkHeading level="h3" className={getClassName('bpkdocs-tooltips-page__heading')}>JFK</BpkHeading>}
      >
        <div
          style={{
            borderBottomWidth: '5px',
            borderBottomColor: colorGreen500,
            borderBottomStyle: 'solid',
            padding: spacingSm,
          }}
        >
          New York John F. Kennedy
        </div>
      </BpkTooltip>,
    ],
  },
];

const TooltipsPage = () => <DocsPageBuilder
  title="Tooltips"
  blurb={[
    <BpkParagraph>
      Tooltips appear on hover of a particular element and are used to provide additional context/information to the
      user. They generally are text-only and are triggered on pointer based interfaces.
    </BpkParagraph>,
    <BpkParagraph>
      By default, <em>tooltips do not work on touch devices</em>. Using tooltips in touch-based interfaces is
      generally bad practise due to the lack of hover state.
      We also don&apos;t recommend using tooltips on interactive elements that can receive focus, such as links,
      buttons, and inputs.
    </BpkParagraph>,
    <BpkParagraph>
      Tooltips do not manage focus. If you need to include interactive elements in a tooltip,
      a <BpkRouterLink to={ROUTES.POPOVERS}>popover</BpkRouterLink> might be better suited.
    </BpkParagraph>,
  ]}
  components={components}
  readme={tooltipReadme}
/>;

export default TooltipsPage;
