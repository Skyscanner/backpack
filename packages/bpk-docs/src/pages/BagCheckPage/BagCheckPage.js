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
import BpkLink from 'bpk-component-link';
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bag-check-page.scss';

/* eslint-disable */
// $FlowFixMe
const bookmarklet = require('!!raw-loader!uglify-loader!babel-loader!../../bag-check-bookmarklet');
/* eslint-enable */

const getClassName = cssModules(STYLES);

const Page = () => (
  <div className={getClassName('bpk-docs-bag-check-page')}>
    <BpkText tagName="h1" textStyle="lg">
      Drag and drop the link below to your bookmarks toolbar.
    </BpkText>
    <BpkLink
      href={`javascript:(function(){${bookmarklet}})();`}
      className={getClassName('bpk-docs-bag-check-page__link')}
    >
      <BpkText textStyle="xl">BagCheck</BpkText>
    </BpkLink>
  </div>
);

export default Page;
