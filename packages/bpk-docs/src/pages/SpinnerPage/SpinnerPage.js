/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import DocsPageWrapper from '../../components/DocsPageWrapper';
import IntroBlurb from '../../components/IntroBlurb';
import Android from '../AndroidSpinnerPage';
import IOS from '../IOSSpinnerPage';
import Web from '../WebSpinnersPage';
import Native from '../NativeSpinnerPage';

const blurb = [
  <IntroBlurb>
    Spinners are used to indicate that a part of the product is loading or
    performing a task when the amount of time needed is unknown.
  </IntroBlurb>,
];

const Page = () => (
  <DocsPageWrapper
    title="Spinner"
    blurb={blurb}
    androidSubpage={<Android wrapped />}
    iosSubpage={<IOS wrapped />}
    webSubpage={<Web wrapped />}
    nativeSubpage={<Native wrapped />}
  />
);

export default Page;
