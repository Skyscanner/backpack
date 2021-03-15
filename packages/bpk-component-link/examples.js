/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';
import { action, BpkDarkExampleWrapper } from 'bpk-storybook-utils';
import {
  colorWhite,
  colorSkyGrayTint01,
  spacingBase,
} from 'bpk-tokens/tokens/base.es6';

import BpkLink, { BpkButtonLink } from './index';

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

const ButtonLinkExample = () => (
  <div>
    <BpkButtonLink onClick={action('#1 clicked')}>Link #1</BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')}>Link #2</BpkButtonLink>
  </div>
);

const LinkAlternativeExample = () => (
  <div style={{ backgroundColor: colorSkyGrayTint01, padding: spacingBase }}>
    <BpkLink href="#" onClick={action('#1 clicked')} alternate>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} alternate>
      Link #2
    </BpkLink>
  </div>
);

const ButtonLinkAlternativeExample = () => (
  <div style={{ backgroundColor: colorSkyGrayTint01, padding: spacingBase }}>
    <BpkButtonLink onClick={action('#1 clicked')} alternate>
      Link #1
    </BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')} alternate>
      Link #2
    </BpkButtonLink>
  </div>
);

const CombinedExample = () => (
  <div>
    Links can be both <BpkLink href="#">anchor tags</BpkLink> as well as{' '}
    <BpkButtonLink onClick={() => null}>button tags</BpkButtonLink>.
  </div>
);

const CombinedAlternativeExample = () => (
  <BpkDarkExampleWrapper style={{ padding: spacingBase, color: colorWhite }}>
    Links can be both <BpkLink href="#">anchor tags</BpkLink> as well as{' '}
    <BpkButtonLink onClick={() => null}>button tags</BpkButtonLink>.
  </BpkDarkExampleWrapper>
);

export {
  LinkExample,
  ButtonLinkExample,
  LinkAlternativeExample,
  ButtonLinkAlternativeExample,
  CombinedExample,
  CombinedAlternativeExample,
};
