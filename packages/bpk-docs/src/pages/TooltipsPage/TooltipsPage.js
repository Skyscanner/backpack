import React from 'react';
import BpkButton from 'bpk-component-button';
import BpkTooltip from 'bpk-component-tooltip';
import BpkParagraph from 'bpk-component-paragraph';
import BpkBlockquote from 'bpk-component-blockquote';
import tooltipReadme from 'bpk-component-tooltip/readme.md';
import { spacingSm, colorGreen500 } from 'bpk-tokens/tokens/base.es6';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        By default, popovers come with a small textual close button at the bottom.
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
    id: 'with-title',
    title: 'Alternative positioning',
    blurb: [
      <BpkParagraph>
        Tooltips can be positioned to either side of the target element.
      </BpkParagraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip"
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
    id: 'with-title-and-text-button',
    title: 'Custom content and styling',
    blurb: [
      <BpkParagraph>
        You can apply custom content and styling to a tooltip.
      </BpkParagraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip"
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
      JAMES TO WRITE A WITTY INTRO BLURB PLEASE 🙏
    </BpkParagraph>,
    <BpkBlockquote>
      The tooltip component does not manage focus. If you need to include interactive elements in the tooltip,
      a popover might be better suited.
    </BpkBlockquote>,
  ]}
  components={components}
  readme={tooltipReadme}
  sassdocId="popovers"
/>;

export default PopoversPage;
