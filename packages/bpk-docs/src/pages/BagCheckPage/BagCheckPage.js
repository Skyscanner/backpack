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
import BpkLink from 'bpk-component-link';
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bag-check-page.scss';

const getClassName = cssModules(STYLES);

const Page = () => {
  if (typeof window === 'undefined' || !window.location) {
    return null;
  }

  const link = `${window.location.origin}/bagCheck.js`;
  const script = `javascript:(function(){var t=document.createElement("script");t.type="application/javascript",t.src="${link}",document.getElementsByTagName("body")[0].appendChild(t)}());`;

  return (
    <div className={getClassName('bpk-docs-bag-check-page')}>
      <BpkText tagName="h1" textStyle="lg">
        Drag and drop the link bellow to your bookmarks toolbar
      </BpkText>
      <BpkLink
        href={script}
        className={getClassName('bpk-docs-bag-check-page__link')}
      >
        <BpkText textStyle="xl">BagCheck</BpkText>
      </BpkLink>
    </div>
  );
};

export default Page;
