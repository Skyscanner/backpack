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
import { cssModules } from 'bpk-react-utils';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';

import STYLES from './examples.module.scss';
import {
  View,
  SimpleNav,
  NavigationBar,
  withNavigationBar,
} from './stories-components';

import BpkNavigationStack, { withNavigationStackState } from './index';

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

const DefaultExample = () => (
  <StatefulNavigationStack
    className={getClassName('bpk-navigation-stack-story-wrapper')}
    initialViews={[<View centered>{(props) => <SimpleNav {...props} />}</View>]}
  />
);

const WithNavBarExample = () => (
  <StatefulNavigationStack
    className={getClassName('bpk-navigation-stack-story-wrapper')}
    initialViews={[<View>{(props) => <NavigationBar {...props} />}</View>]}
  />
);

const WithNavBarOutsideExample = () => (
  <StatefulNavigationStackWithBarOutside
    className={getClassName('bpk-navigation-stack-story-wrapper')}
    initialViews={[<View noNavBar>{() => null}</View>]}
  />
);

export { DefaultExample, WithNavBarExample, WithNavBarOutsideExample };
