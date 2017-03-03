import React from 'react';
import BpkButton from 'bpk-component-button';
import BpkTooltip from 'bpk-component-tooltip';
import BpkParagraph from 'bpk-component-paragraph';
import BpkRouterLink from 'bpk-component-router-link';
import tooltipReadme from 'bpk-component-tooltip/readme.md';
import { spacingSm, colorGreen500 } from 'bpk-tokens/tokens/base.es6';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';

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
        target={<BpkButton onClick={() => null}>Buy now!</BpkButton>}
      >
        Save up to 40%! 🤑
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
        target={<BpkButton onClick={() => null}>Buy now!</BpkButton>}
      >
        Save up to 40%! 🤑
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
        target={<BpkButton onClick={() => null}>Buy now!</BpkButton>}
      >
        <div
          style={{
            borderBottomWidth: '5px',
            borderBottomColor: colorGreen500,
            borderBottomStyle: 'solid',
            padding: spacingSm,
          }}
        >
          Save up to 40%! 🤑
        </div>
      </BpkTooltip>,
    ],
  },
];

const PopoversPage = () => <DocsPageBuilder
  title="Tooltips"
  blurb={[
    <BpkParagraph>
      Tooltips appear on hover of a particular element and are used to provide additional context/information to the
      user. They generally are text-only and are triggered on a pointer based interfaces.
    </BpkParagraph>,
    <BpkParagraph>
      Using tooltips on mobile is generally bad practise due to lack of hover state.
    </BpkParagraph>,
    <BpkParagraph>
      Tooltips do not manage focus. If you need to include interactive elements in a tooltip,
      a <BpkRouterLink to={ROUTES.POPOVERS}>popover</BpkRouterLink> might be better suited.
    </BpkParagraph>,
  ]}
  components={components}
  readme={tooltipReadme}
  sassdocId="popovers"
/>;

export default PopoversPage;
