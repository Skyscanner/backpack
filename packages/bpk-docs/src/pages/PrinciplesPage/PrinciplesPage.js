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
import BpkLink from 'bpk-component-link';
import BpkRouterLink from 'bpk-component-router-link';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import Paragraph from './../../components/Paragraph';
import IntroBlurb from './../../components/IntroBlurb';

const components = [
  {
    id: 'authentically-mobile',
    title: 'Authentically mobile',
    blurb: [
      <Paragraph>
        Whether it is for web or app, every component should be considered
        mobile-first and degrade to desktop. Components should take advantage of
        the platform. See our guide (coming soon) for more info on what is meant
        by &apos;Authentically mobile&apos;.
      </Paragraph>,
    ],
  },
  {
    id: 'holistic',
    title: 'Holistically considered',
    blurb: [
      <Paragraph>
        All Backpack components should work in multiple areas and situations,
        not just in the context of one screen. See the{' '}
        <BpkRouterLink to={ROUTES.CONTRIBUTING}>
          Contributing section
        </BpkRouterLink>{' '}
        for more info on what should live in Backpack.
      </Paragraph>,
    ],
  },
  {
    id: 'reuse',
    title: 'Reuse over reinvent',
    blurb: [
      <Paragraph>
        For any new component, we will look to the open source community for
        inspiration. If they meet the requirements, we will directly use them.
        For example, the{' '}
        <BpkRouterLink to={ROUTES.AUTOSUGGEST}>
          Autosuggest component
        </BpkRouterLink>{' '}
        is powered by{' '}
        <BpkLink href="https://react-autosuggest.js.org/" blank>
          React Autosuggest
        </BpkLink>.
      </Paragraph>,
    ],
  },
  {
    id: 'accessible',
    title: 'Accessible',
    blurb: [
      <Paragraph>
        Screen readers, keyboard navigation and other assistive technology is
        important as we look to support all kinds of travellers. All Skyscanner
        products should be accessible by everyone no matter their disability or
        situation. See our guide (coming soon) for best practises.
      </Paragraph>,
    ],
  },
  {
    id: 'rtl',
    title: 'RTL supported',
    blurb: [
      <Paragraph>
        See our guide (coming soon) for best practises and advice for
        right-to-left support.
      </Paragraph>,
    ],
  },
  {
    id: 'themeable',
    title: 'Themeable',
    blurb: [
      <Paragraph>
        All components should be themeable and be able to use colours from
        Skyscanner&apos;s partners.
      </Paragraph>,
    ],
  },
  {
    id: 'documented',
    title: 'Well documented',
    blurb: [
      <Paragraph>
        Each component should be fully documented, showing each configuration
        together with explanations where suitable. Additionally the components
        readme and available props should be shown. See our guide on{' '}
        <BpkLink
          href="https://github.com/Skyscanner/backpack/blob/master/decisions/writing-docs.md"
          blank
        >
          writing style
        </BpkLink>{' '}
        for best practises for writing documentation.
      </Paragraph>,
    ],
  },
];

const blurb = [
  <IntroBlurb>
    Backpack components, features and configurations are are created with the
    following principles in mind.
  </IntroBlurb>,
];
const PrinciplesPage = () => (
  <DocsPageBuilder title="Principles" blurb={blurb} components={components} />
);

export default PrinciplesPage;
