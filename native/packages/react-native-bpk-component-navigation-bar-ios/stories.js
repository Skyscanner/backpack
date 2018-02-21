/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
/* @flow */

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BpkNavigationBariOS from './index';

storiesOf('BpkNavigationBariOS', module)
  .add('docs:default', () => <BpkNavigationBariOS title="Backpack rocks" />)
  .add('with back button', () => (
    <BpkNavigationBariOS
      title="Backpack rocks"
      leftButtonText="Back"
      onLeftButtonTap={action('Back tapped')}
    />
  ))
  .add('with right button', () => (
    <BpkNavigationBariOS
      title="Backpack rocks"
      rightButtonText="Done"
      onRightButtonTap={action('Done button tapped')}
    />
  ))
  .add('with back button and right button', () => (
    <BpkNavigationBariOS
      title="Backpack rocks"
      rightButtonText="Done"
      leftButtonText="Back"
      onLeftButtonTap={action('Back tapped')}
      onRightButtonTap={action('Done button tapped')}
    />
  ))
  .add('with large title', () => (
    <BpkNavigationBariOS
      title="Backpack rocks"
      rightButtonText="Done"
      leftButtonText="Back"
      onLeftButtonTap={action('Back tapped')}
      onRightButtonTap={action('Done button tapped')}
      prefersLargeTitles
    />
  ));
