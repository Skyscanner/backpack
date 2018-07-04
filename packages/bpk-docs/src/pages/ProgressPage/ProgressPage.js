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
import DocsPageWrapper from '../../components/DocsPageWrapper';
import IntroBlurb from '../../components/IntroBlurb';

import WebProgress from '../WebProgressPage';
import NativeProgress from '../NativeProgressPage';

const ProgressPage = () => (
  <DocsPageWrapper
    title="Progress"
    blurb={[
      <IntroBlurb>
        Progress bars are a great way of providing feedback when a tasking is
        running. Unlike spinners, they give the user a clear idea of how long
        the given task will take.
      </IntroBlurb>,
    ]}
    webSubpage={<WebProgress wrapped />}
    nativeSubpage={<NativeProgress wrapped />}
  />
);

export default ProgressPage;
