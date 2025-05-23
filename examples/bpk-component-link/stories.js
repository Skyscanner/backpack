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


import BpkButtonLink from '../../packages/bpk-component-link/src/BpkButtonLink';
import BpkLink from '../../packages/bpk-component-link/src/BpkLink';

import {
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
} from './examples';

export default {
  title: 'bpk-component-link',
  component: BpkLink,
  subcomponents: {
    BpkButtonLink
  },
};

export const Example = LinkExample;
export const ExampleImplicit = ImplicitLinkExample;
export const ExampleLinksInGrid = LinkInGridExample;
export const ExampleButtons = ButtonLinkExample;
export const ExampleImlicitButtons = ImplicitButtonLinkExample;

export const ExampleAlternate = LinkAlternativeExample;
export const ExampleAlternateImplicit = LinkAlternativeImplicitExample;

export const ExampleAlternateButtons = ButtonLinkAlternativeExample;

export const Combined = CombinedExample;
export const CombinedAlternative = CombinedAlternativeExample;

export const Overview = OverviewExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
