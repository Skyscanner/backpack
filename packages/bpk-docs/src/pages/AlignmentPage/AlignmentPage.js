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
import { BpkCode, BpkCodeBlock } from 'bpk-component-code';
import { colors, lineHeightBase, iconSizeSm, lineHeightLg, iconSizeLg } from 'bpk-tokens/tokens/base.es6';
import { withAlignment, withButtonAlignment, withLargeButtonAlignment } from 'bpk-component-icon';
import BpkLink from 'bpk-component-link';
import BpkButton from 'bpk-component-button';
import BpkParagraph from 'bpk-component-paragraph';
import BpkHeading from 'bpk-component-heading';
import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import AwardIcon from 'bpk-component-icon/lg/award';
import LongArrowRightIconSm from 'bpk-component-icon/sm/long-arrow-right';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import * as ROUTES from './../../constants/routes';

const AlignedHeading4Arrow = withAlignment(LongArrowRightIconSm, lineHeightBase, iconSizeSm);
const AlignedHeading3Arrow = withAlignment(LongArrowRightIcon, lineHeightLg, iconSizeLg);
const AlignedButtonArrow = withButtonAlignment(LongArrowRightIconSm);
const AlignedLargeButtonArrow = withLargeButtonAlignment(LongArrowRightIcon);
const AlignedSpan = withAlignment('span', iconSizeLg, lineHeightBase);

const components = [
  {
    id: 'withinHeading4',
    title: 'Icon alignment within a "h4" heading',
    blurb: [
      <BpkParagraph>
        Aligning an icon within a heading can be done using <BpkCode >withAlignment</BpkCode>, providing
        suitable spacings (see the <BpkLink href={ROUTES.TYPESETTING} >Typesetting section</BpkLink>).
      </BpkParagraph>,
      <BpkParagraph>
        Using the HOC is done as follows:
      </BpkParagraph>,
      <BpkCodeBlock >
        {`import LongArrowRightIconSm from 'bpk-component-icon/sm/long-arrow-right';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightBase, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

const AlignedArrow = withAlignment(
  LongArrowRightIconSm, lineHeightBase, iconSizeSm
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
    id: 'withIcon',
    title: '"h4" heading alignment within an icon',
    blurb: [
      <BpkParagraph>
        If wishing to use an icon taller than the heading, alignment must be performed on the heading as follows:
      </BpkParagraph>,
      <BpkCodeBlock >
        {`import AwardIcon from 'bpk-component-icon/lg/award';
import { withAlignment } from 'bpk-component-icon';
import { iconSizeLg, lineHeightLg } from 'bpk-tokens/tokens/base.es6';

const AlignedSpan = withAlignment(
  'span', iconSizeLg, lineHeightBase
);

<BpkHeading level="h4" >
  <AwardIcon fill={colors.colorGray700} />
  <AlignedSpan >
    &nbsp;
    Heading Text
  </AlignedSpan>
</BpkHeading>
`}
      </BpkCodeBlock>,
    ],
    examples: [
      <BpkHeading level="h4" >
        <AwardIcon fill={colors.colorGray700} />
        <AlignedSpan >
          &nbsp;
          Heading Text
        </AlignedSpan>
      </BpkHeading>,
    ],
  },
  {
    id: 'withinButton',
    title: 'Icon alignment within a button',
    blurb: [
      <BpkParagraph>
        HOC wrappers exist for common alignment tasks, such as aligning an icon within a button.
         Other examples can be seen in the <BpkLink href={ROUTES.BUTTONS}>Buttons page</BpkLink>.
      </BpkParagraph>,
      <BpkCodeBlock>
        {`import LongArrowRightIconSm from 'bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment } from 'bpk-component-icon';

const AlignedArrow = withButtonAlignment(LongArrowRightIconSm);

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
        Similarly, a HOC exists for aligning icons to a large button.
         Other examples can be seen in the <BpkLink href={ROUTES.BUTTONS}>Buttons page</BpkLink>.
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
    <BpkHeading level="h2" >
      Installation
    </BpkHeading>,
    <BpkParagraph>
      The alignment HOCs are provided in the <BpkCode>bpk-component-icon</BpkCode> package.
      See <BpkLink href={ROUTES.ICONS}>Icons</BpkLink> for installation instructions.
    </BpkParagraph>,
    <BpkParagraph>
      Note that the alignment HOCs do not support an offset &lt; 0. That is, when aligning two components,
      the smaller must be aligned to the larger, not vice versa.
    </BpkParagraph>,
  ]}
  components={components}
/>;

export default AlignmentPage;
