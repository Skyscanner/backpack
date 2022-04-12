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

import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  PrimaryExample,
  PrimaryOnDarkExample,
  PrimaryOnLightExample,
  SecondaryExample,
  DestructiveExample,
  LinkExample,
  FeaturedExample,
  ComponentButtonPrimaryExample,
  ComponentButtonPrimaryOnDarkExample,
  ComponentButtonPrimaryOnLightExample,
  ComponentButtonSecondaryExample,
  ComponentButtonDestructiveExample,
  ComponentButtonLinkExample,
  ComponentButtonFeaturedExample,
  MixedExample,
  AnchorTagsExample,
} from './examples';

storiesOf('bpk-component-button', () => module)
  .add('BpkButton (Primary)', () => <PrimaryExample />)
  .add('BpkButton (PrimaryOnDark)', () => <PrimaryOnDarkExample />)
  .add('BpkButton (PrimaryOnLight)', () => <PrimaryOnLightExample />)
  .add('BpkButton (Secondary)', () => <SecondaryExample />)
  .add('BpkButton (Destructive)', () => <DestructiveExample />)
  .add('BpkButton (Link button)', () => <LinkExample />)
  .add('BpkButton (Featured)', () => <FeaturedExample />)
  .add('Primary', () => <ComponentButtonPrimaryExample />)
  .add('PrimaryOnDark', () => <ComponentButtonPrimaryOnDarkExample />)
  .add('PrimaryOnLight', () => <ComponentButtonPrimaryOnLightExample />)
  .add('Secondary', () => <ComponentButtonSecondaryExample />)
  .add('Destructive', () => <ComponentButtonDestructiveExample />)
  .add('Link button', () => <ComponentButtonLinkExample />)
  .add('Featured', () => <ComponentButtonFeaturedExample />)
  .add('Mixture', () => <MixedExample />)
  .add('Anchor tags', () => <AnchorTagsExample />)
  .add('Visual test', () => <MixedExample />);
