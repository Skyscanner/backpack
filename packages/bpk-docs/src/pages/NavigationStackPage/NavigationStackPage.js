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
import navigationStackReadme from 'bpk-component-navigation-stack/README.md';
import { cssModules } from 'bpk-react-utils';

import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import Paragraph from '../../components/Paragraph';
import IntroBlurb from '../../components/IntroBlurb';
import {
  View,
  StackWithNavBar,
  StatefulNavigationStack,
  SimplePage,
} from './page-components';
import STYLES from './NavigationStackPage.css';

const getClassName = cssModules(STYLES);

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [],
    examples: [
      <StatefulNavigationStack
        className={getClassName('bpk-navigation-stack-page')}
        initialViews={[<SimplePage index={0} />]}
      />,
    ],
  },
  {
    id: 'with-navigation-bar',
    title: 'With navigation bar',
    blurb: [
      <Paragraph>
        The navigation stack can be composed with the navigation bar component.
      </Paragraph>,
    ],
    examples: [
      <StackWithNavBar
        className={getClassName('bpk-navigation-stack-page')}
        initialViews={[<View index={0} />]}
      />,
    ],
  },
];

const blurb = [
  <IntroBlurb>
    The navigation stack component presents content in full-screen and makes use
    of the navigation bar component to allow pagination between screens.
  </IntroBlurb>,
];

const NavigationStackSubPage = ({ ...rest }: { [string]: any }) => (
  <DocsPageBuilder
    title="Navigation stack"
    components={components}
    readme={navigationStackReadme}
    {...rest}
  />
);

const NavigationStackPage = () => (
  <DocsPageWrapper
    title="Navigation stack"
    blurb={blurb}
    webSubpage={<NavigationStackSubPage wrapped />}
  />
);

export default NavigationStackPage;
