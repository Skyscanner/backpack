import React from 'react';
import { BpkCode, BpkCodeBlock } from 'bpk-component-code';
import { colors, lineHeightBase, iconSizeSm, lineHeightLg, iconSizeLg } from 'bpk-tokens/tokens/base.es6';
import { withAlignment, withButtonAlignment, withLargeButtonAlignment } from 'bpk-component-icon';
import BpkLink from 'bpk-component-link';
import BpkButton from 'bpk-component-button';
import BpkParagraph from 'bpk-component-paragraph';
import BpkHeading from 'bpk-component-heading';
import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const AlignedHeading4Arrow = withAlignment(LongArrowRightIcon, lineHeightBase, iconSizeSm);
const AlignedHeading3Arrow = withAlignment(LongArrowRightIcon, lineHeightLg, iconSizeLg);
const AlignedButtonArrow = withButtonAlignment(LongArrowRightIcon);
const AlignedLargeButtonArrow = withLargeButtonAlignment(LongArrowRightIcon);

const components = [
  {
    id: 'withinHeading4',
    title: 'Icon alignment within a "h4" heading',
    blurb: [
      <BpkParagraph>
        Aligning an icon within a heading can be done using <BpkCode >withAlignment</BpkCode>, providing
        suitable spacings (see the <BpkLink href="/components/bonds/typesetting" >Typesetting section</BpkLink>).
      </BpkParagraph>,
      <BpkParagraph>
        Using the HOC is done as follows:
      </BpkParagraph>,
      <BpkCodeBlock >
        {`import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightBase, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

const AlignedArrow = withAlignment(
  LongArrowRightIcon, lineHeightBase, iconSizeSm
);

<BpkHeading level="h4" >
  Heading Text
  <AlignedArrow />
</BpkHeading>
`}
      </BpkCodeBlock>,
    ],
    examples: [
      <BpkHeading level="h4" >
        Heading Text
        &nbsp;
        <AlignedHeading4Arrow fill={colors.colorGray700} />
      </BpkHeading>,
    ],
  },
  {
    id: 'withinHeading3',
    title: 'Icon alignment within a "h3" heading',
    blurb: [
      <BpkParagraph>
        Similarly, within a larger heading, alignment can be achieved as follows:
      </BpkParagraph>,
      <BpkCodeBlock >
        {`import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightLg, iconSizeLg } from 'bpk-tokens/tokens/base.es6';

const AlignedArrow = withAlignment(
  LongArrowRightIcon, lineHeightLg, iconSizeLg
);

<BpkHeading level="h3" >
  Heading Text
  <AlignedArrow />
</BpkHeading>
`}
      </BpkCodeBlock>,
    ],
    examples: [
      <BpkHeading level="h3" >
        Heading Text
        &nbsp;
        <AlignedHeading3Arrow fill={colors.colorGray700} />
      </BpkHeading>,
    ],
  },
  {
    id: 'withinButton',
    title: 'Icon alignment within a button',
    blurb: [
      <BpkParagraph>
         HOC wrappers exist for common alignment tasks, such as aligning an icon within a button:
      </BpkParagraph>,
      <BpkCodeBlock>
        {`import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import { withButtonAlignment } from 'bpk-component-icon';

const AlignedArrow = withButtonAlignment(LongArrowRightIcon);

<BpkButton >
  Button Text
  <AlignedArrow />
</BpkButton>
`}
      </BpkCodeBlock>,
    ],
    examples: [
      <BpkButton >
        Button Text
        &nbsp;
        <AlignedButtonArrow fill={colors.colorWhite} />
      </BpkButton>,
    ],
  },
  {
    id: 'withinLargeButton',
    title: 'Icon alignment within a large button',
    blurb: [
      <BpkParagraph>
         Similarly, a HOC exists for aligning icons to a large button:
          </BpkParagraph>,
      <BpkCodeBlock>
        {`import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import { withLargeButtonAlignment } from 'bpk-component-icon';

const AlignedArrow = withLargeButtonAlignment(LongArrowRightIcon);

<BpkButton >
  Button Text
  <AlignedArrow />
</BpkButton>
`}
      </BpkCodeBlock>,
    ],
    examples: [
      <BpkButton large>
        Button Text
        &nbsp;
        <AlignedLargeButtonArrow fill={colors.colorWhite} />
      </BpkButton>,
    ],
  },
];

const AlignmentPage = () => <DocsPageBuilder
  title="Alignment"
  blurb={[
    <BpkParagraph>
      Alignment higher-order-components (HOCs) allow components to be aligned vertically within a given space.
    </BpkParagraph>,
  ]}
  components={components}
/>;

export default AlignmentPage;
