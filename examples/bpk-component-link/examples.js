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
    <BpkLink href="#" onClick={action('#1 clicked')}>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')}>
      Link #2
    </BpkLink>
  </div>
);

const ImplicitLinkExample = () => (
  <div>
    <BpkLink href="#" onClick={action('#1 clicked')} implicit>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} implicit>
      Link #2
    </BpkLink>
  </div>
);

const ButtonLinkExample = () => (
  <div>
    <BpkButtonLink onClick={action('#1 clicked')}>Link #1</BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')}>Link #2</BpkButtonLink>
  </div>
);

const LinkAlternativeExample = () => (
  <BpkDarkExampleWrapper>
    <BpkLink href="#" onClick={action('#1 clicked')} alternate>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} alternate>
      Link #2
    </BpkLink>
  </BpkDarkExampleWrapper>
);

const LinkAlternativeImplicitExample = () => (
  <BpkDarkExampleWrapper>
    <BpkLink href="#" onClick={action('#1 clicked')} alternate implicit>
      Link #1
    </BpkLink>
    <br />
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
    Links can be both <BpkLink href="#">anchor tags</BpkLink> as well as{' '}
    <BpkButtonLink onClick={() => null}>button tags</BpkButtonLink>.
  </div>
);

const CombinedAlternativeExample = () => (
  <BpkDarkExampleWrapper style={{ color: colorSkyGrayTint04 }}>
    Links can be both{' '}
    <BpkLink href="#" style={{ color: colorWhite }}>
      anchor tags
    </BpkLink>{' '}
    as well as{' '}
    <BpkButtonLink onClick={() => null} style={{ color: colorWhite }}>
      button tags
    </BpkButtonLink>
    .
  </BpkDarkExampleWrapper>
);

const OverviewExample = () => (
    <>
      <div style={{ padding: '1rem', paddingBottom: '1rem' }}>
        Big skies, big landscapes and cool cities, the great American Northwest is the place to discover the great outdoors. Get a real taste of the Frontier spirit and explore a rich history of what was once the Wild West.{' '}
        <BpkLink href="#" style={{ color: fontColorBase }}>
          Explore incredible national parks
        </BpkLink>{' '}
        , ancient forests, rugged coastlines, and beautiful islands.
      </div>
      <BpkDarkExampleWrapper style={{ color: colorWhite, padding: '1rem' }}>
        Big skies, big landscapes and cool cities, the great American Northwest is the place to discover the great outdoors. Get a real taste of the Frontier spirit and explore a rich history of what was once the Wild West.{' '}
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
};
