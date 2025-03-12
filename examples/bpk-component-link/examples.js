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
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkLink, { BpkButtonLink } from '../../packages/bpk-component-link';
import {
  action,
  BpkDarkExampleWrapper,
} from '../bpk-storybook-utils';

const LinkExample = () => (
  <div>
    <BpkLink href="#" onClick={action('#1 clicked')} explicit>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')}>
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

const MixedExample = () => (
  <div>
    <CombinedExample />
    <CombinedAlternativeExample />
  </div>
);

export {
  LinkExample,
  ButtonLinkExample,
  LinkAlternativeExample,
  ButtonLinkAlternativeExample,
  CombinedExample,
  CombinedAlternativeExample,
  MixedExample,
};
