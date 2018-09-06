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
import { cssModules } from 'bpk-react-utils';
import { storiesOf } from '@storybook/react';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';

import STYLES from './stories.css';
import BpkNavigationStack, { withNavigationStackState } from './index';
import {
  View,
  SimpleNav,
  NavigationBar,
  withNavigationBar,
} from './stories-components';

const RtlAwareNavigationStack = updateOnDirectionChange(BpkNavigationStack);

const StatefulNavigationStack = withNavigationStackState(
  RtlAwareNavigationStack,
);

const NavigationStackWithBarOutside = withNavigationBar(
  RtlAwareNavigationStack,
);

const StatefulNavigationStackWithBarOutside = withNavigationStackState(
  NavigationStackWithBarOutside,
  false,
);

const getClassName = cssModules(STYLES);

storiesOf('bpk-component-navigation-stack', module)
  .add('Default', () => (
    <StatefulNavigationStack
      className={getClassName('bpk-navigation-stack-story-wrapper')}
      initialViews={[<View centered>{props => <SimpleNav {...props} />}</View>]}
    />
  ))
  .add('With navigation bar', () => (
    <StatefulNavigationStack
      className={getClassName('bpk-navigation-stack-story-wrapper')}
      initialViews={[<View>{props => <NavigationBar {...props} />}</View>]}
    />
  ))
  .add('With navigation bar outside', () => (
    <StatefulNavigationStackWithBarOutside
      className={getClassName('bpk-navigation-stack-story-wrapper')}
      initialViews={[<View noNavBar>{() => null}</View>]}
    />
  ));
