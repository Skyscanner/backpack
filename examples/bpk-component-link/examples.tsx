/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import {
  colorWhite,
  colorSkyGrayTint04,
  fontColorBase,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkLink, { BpkButtonLink } from '../../packages/bpk-component-link';
import {
  action,
  BpkDarkExampleWrapper,
} from '../bpk-storybook-utils';

const LinkExample = () => (
  <div>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#1 clicked')}>
      Link #1
    </BpkLink>
    <br />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#2 clicked')}>
      Link #2
    </BpkLink>
  </div>
);

const ImplicitLinkExample = () => (
  <div>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#1 clicked')} implicit>
      Link #1
    </BpkLink>
    <br />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#2 clicked')} implicit>
      Link #2
    </BpkLink>
  </div>
);

const LinkInGridExample = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '800px',
  }}>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#1 clicked')}>
      Link #1
    </BpkLink>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#2 clicked')}>
      Link #2
    </BpkLink>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#3 clicked')}>
      Link #3
    </BpkLink>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#5 clicked')}>
      Link #4
    </BpkLink>
  </div>
)

const ButtonLinkExample = () => (
  <div>
    <BpkButtonLink onClick={action('#1 clicked')}>Link #1</BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')}>Link #2</BpkButtonLink>
  </div>
);

const ImplicitButtonLinkExample = () => (
  <div>
    <BpkButtonLink onClick={action('#1 clicked')} implicit>Link #1</BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')} implicit>Link #2</BpkButtonLink>
  </div>
);

const LinkAlternativeExample = () => (
  <BpkDarkExampleWrapper>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#1 clicked')} alternate>
      Link #1
    </BpkLink>
    <br />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#2 clicked')} alternate>
      Link #2
    </BpkLink>
  </BpkDarkExampleWrapper>
);

const LinkAlternativeImplicitExample = () => (
  <BpkDarkExampleWrapper>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#1 clicked')} alternate implicit>
      Link #1
    </BpkLink>
    <br />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; onClick: (... Remove this comment to see the full error message
    <BpkLink href="#" onClick={action('#2 clicked')} alternate implicit>
      Link #2
    </BpkLink>
  </BpkDarkExampleWrapper>
);

const ButtonLinkAlternativeExample = () => (
  <BpkDarkExampleWrapper>
    <BpkButtonLink onClick={action('#1 clicked')} alternate>
      Link #1
    </BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')} alternate>
      Link #2
    </BpkButtonLink>
  </BpkDarkExampleWrapper>
);

const CombinedExample = () => (
  <div>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2740): Type '{ children: string; href: string; }' is miss... Remove this comment to see the full error message
    // @ts-expect-error TS(2740) FIXME: Type '{ children: string; href: string; }' is miss... Remove this comment to see the full error message
    Links can be both <BpkLink href="#">anchor tags</BpkLink> as well as{' '}
    <BpkButtonLink onClick={() => null}>button tags</BpkButtonLink>.
  </div>
);

const CombinedAlternativeExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: any[]; style: { color: "rgb(178,... Remove this comment to see the full error message
  <BpkDarkExampleWrapper style={{ color: colorSkyGrayTint04 }}>
    Links can be both{' '}
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2739): Type '{ children: string; href: string; alternate:... Remove this comment to see the full error message
    // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; alternate:... Remove this comment to see the full error message
    <BpkLink href="#" alternate>
      anchor tags
    </BpkLink>{' '}
    as well as{' '}
    <BpkButtonLink onClick={() => null} alternate>
      button tags
    </BpkButtonLink>
    .
  </BpkDarkExampleWrapper>
);

const OverviewExample = () => (
    <>
      <div style={{ paddingBottom: '1rem' }}>
        Big skies, big landscapes and cool cities, the great American Northwest is the place to discover the great outdoors. Get a real taste of the Frontier spirit and explore a rich history of what was once the Wild West.{' '}
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
        // @ts-expect-error TS(2322): Type '{ children: string; href: string; style: { c... Remove this comment to see the full error message
        // @ts-expect-error TS(2322) FIXME: Type '{ children: string; href: string; style: { c... Remove this comment to see the full error message
        <BpkLink href="#" style={{ color: fontColorBase }}>
          Explore incredible national parks
        </BpkLink>{' '}
        , ancient forests, rugged coastlines, and beautiful islands.
      </div>
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
      // @ts-expect-error TS(2322): Type '{ children: (string | Element)[]; style: { c... Remove this comment to see the full error message
      // @ts-expect-error TS(2322) FIXME: Type '{ children: any[]; style: { color: "rgb(255,... Remove this comment to see the full error message
      <BpkDarkExampleWrapper style={{ color: colorWhite, padding: '1rem' }}>
        Big skies, big landscapes and cool cities, the great American Northwest is the place to discover the great outdoors. Get a real taste of the Frontier spirit and explore a rich history of what was once the Wild West.{' '}
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
        // @ts-expect-error TS(2739): Type '{ children: string; href: string; alternate:... Remove this comment to see the full error message
        // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; alternate:... Remove this comment to see the full error message
        <BpkLink href="#" alternate>
          Explore incredible national parks
        </BpkLink>{' '}
        , ancient forests, rugged coastlines, and beautiful islands.
      </BpkDarkExampleWrapper>
    </>
);

const MixedExample = () => (
  <div>
    <CombinedExample />
    <CombinedAlternativeExample />
  </div>
);

export {
  LinkExample,
  ImplicitLinkExample,
  ButtonLinkExample,
  LinkAlternativeExample,
  LinkAlternativeImplicitExample,
  ButtonLinkAlternativeExample,
  CombinedExample,
  CombinedAlternativeExample,
  OverviewExample,
  MixedExample,
  LinkInGridExample,
  ImplicitButtonLinkExample,
};
