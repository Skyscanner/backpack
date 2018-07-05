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

import React from 'react';
import breadcrumbReadme from 'bpk-component-breadcrumb/readme.md';
import BpkBreadcrumb, { BpkBreadcrumbItem } from 'bpk-component-breadcrumb';

import IntroBlurb from '../../components/IntroBlurb';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const blurb = [
  <IntroBlurb>
    Breadcrumbs give user a context of the currently open page and provide an
    easy way to navigate back.
  </IntroBlurb>,
];

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <BpkBreadcrumb label="Example breadcrumbs">
        <BpkBreadcrumbItem href="">Home</BpkBreadcrumbItem>
        <BpkBreadcrumbItem href="">Page 1</BpkBreadcrumbItem>
        <BpkBreadcrumbItem href="" active>
          Page 2
        </BpkBreadcrumbItem>
      </BpkBreadcrumb>,
    ],
  },
];

const BreadcrumbSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Breadcrumb"
    components={components}
    readme={breadcrumbReadme}
    {...rest}
  />
);

const BreadcrumbPage = () => (
  <DocsPageWrapper
    title="Breadcrumb"
    blurb={blurb}
    webSubpage={<BreadcrumbSubPage wrapped />}
  />
);

export default BreadcrumbPage;
