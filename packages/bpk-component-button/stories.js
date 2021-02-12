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
import { storiesOf } from '@storybook/react';
import { action } from 'bpk-storybook-utils';

import {
  PrimaryExample,
  SecondaryExample,
  DestructiveExample,
  LinkExample,
  FeaturedExample,
  OutlineExample,
  ComponentButtonPrimaryExample,
  ComponentButtonSecondaryExample,
  ComponentButtonDestructiveExample,
  ComponentButtonLinkExample,
  ComponentButtonLinkWithPaddingExample,
  ComponentButtonFeaturedExample,
  ComponentButtonOutlineExample,
  MixedExample,
  AnchorTagsExample,
} from './examples';

storiesOf('bpk-component-button', () => module)
  .add('BpkButton (Primary)', () => (
    <PrimaryExample onClick={action('Primary button clicked')} />
  ))
  .add('BpkButton (Secondary)', () => (
    <SecondaryExample onClick={action('Secondary button clicked')} />
  ))
  .add('BpkButton (Destructive)', () => (
    <DestructiveExample onClick={action('Destructive button clicked')} />
  ))
  .add('BpkButton (Link button)', () => (
    <LinkExample onClick={action('Link button clicked')} />
  ))
  .add('BpkButton (Featured)', () => (
    <FeaturedExample onClick={action('Featured button clicked')} />
  ))
  .add('BpkButton (Outline)', () => (
    <OutlineExample onClick={action('Outline button clicked')} />
  ))
  .add('Primary', () => (
    <ComponentButtonPrimaryExample onClick={action('Primary button clicked')} />
  ))
  .add('Secondary', () => (
    <ComponentButtonSecondaryExample
      onClick={action('Secondary button clicked')}
    />
  ))
  .add('Destructive', () => (
    <ComponentButtonDestructiveExample
      onClick={action('Destructive button clicked')}
    />
  ))
  .add('Link button', () => (
    <ComponentButtonLinkExample onClick={action('Link button clicked')} />
  ))
  .add('Link button with padding', () => (
    <ComponentButtonLinkWithPaddingExample
      onClick={action('Link button clicked')}
    />
  ))
  .add('Featured', () => (
    <ComponentButtonFeaturedExample
      onClick={action('Featured button clicked')}
    />
  ))
  .add('Outline', () => (
    <ComponentButtonOutlineExample onClick={action('Outline button clicked')} />
  ))
  .add('Mixture', () => <MixedExample onClick={action('Button clicked')} />)
  .add('Anchor tags', () => (
    <AnchorTagsExample onClick={action('Anchor button clicked')} />
  ));
