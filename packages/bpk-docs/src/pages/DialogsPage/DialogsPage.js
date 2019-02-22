/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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
import AndroidDialogs from '../AndroidDialogPage';
import IOSDialogs from '../IOSDialogPage';
import WebDialogs from '../WebDialogPage';

const blurb = [
  <IntroBlurb>
    Dialogs inform users about a specific task and may contain critical
    information, or require decisions or acknowledgement.
  </IntroBlurb>,
];

const DialogsPage = () => (
  <DocsPageWrapper
    title="Dialog"
    blurb={blurb}
    androidSubpage={<AndroidDialogs wrapped />}
    iosSubpage={<IOSDialogs wrapped />}
    webSubpage={<WebDialogs wrapped />}
  />
);

export default DialogsPage;
