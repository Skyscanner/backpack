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
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import IntroBlurb from './../../components/neo/IntroBlurb';
import Code from '../../components/Code';
import CodeBlock from '../../components/CodeBlock';

const createReactAppHref =
  'https://github.com/facebookincubator/create-react-app';
const backpackReactScriptsChangelogHref =
  'https://github.com/Skyscanner/backpack-react-scripts/blob/master/packages/react-scripts/CHANGELOG.md';

const components = [
  {
    id: 'tldr',
    title: 'TL;DR',
    blurb: [
      <CodeBlock>
        {`npm install -g create-react-app

create-react-app my-app --scripts-version=backpack-react-scripts
cd my-app
npm start`}
      </CodeBlock>,
      <Paragraph>
        Then open{' '}
        <BpkLink href="http://localhost:3000/" blank>
          http://localhost:3000/
        </BpkLink>{' '}
        to see your app.
      </Paragraph>,
      <Paragraph>
        When you’re ready to deploy to production, create a minified bundle with{' '}
        <Code>npm run build</Code>.
      </Paragraph>,
    ],
    examples: [],
  },
  {
    id: 'how-does-this-work',
    title: 'How does this work?',
    blurb: [
      <Paragraph>
        <Code>backpack-react-scripts</Code> is designed to be used in
        conjunction with Facebook&apos;s{' '}
        <BpkLink href={createReactAppHref} blank>
          Create React App
        </BpkLink>. It is almost identical in terms of its feature set, apart
        from some custom configuration which adds support for compilation of
        Backpack components (Sass stylesheets etc).
      </Paragraph>,
      <Paragraph>
        The generated project also comes with Backpack integration out the box -
        the base stylesheet, bpk-mixins as well as a few Backpack components are
        already integrated to get you up and running as quickly as possible.
      </Paragraph>,
      <Paragraph>
        For more comprehensive documentation, please refer to the Create React
        App{' '}
        <BpkLink href={createReactAppHref} blank>
          readme
        </BpkLink>, as the majority of it&apos;s content still applies to{' '}
        <Code>backpack-react-scripts</Code>.
      </Paragraph>,
    ],
    examples: [],
  },
  {
    id: 'rationale',
    title: 'Rationale',
    blurb: [
      <Paragraph>
        Modern front-end development can be quite daunting. Getting started with
        React, es2015, Babel, Webpack and friends is so complex that
        &quot;boilerplate&quot; projects have sprung up all over GitHub. The
        main problem with these boilerplate projects is that there are literally
        hundreds of them making it hard to know which one to pick. Additionally,
        once you have downloaded a boilerplate project, you&apos;ve just
        inadvertently inherited a whole bunch of front-end tooling technical
        debt. If updates are made to the boilerplate project in the future, how
        are you supposed to upgrade?
      </Paragraph>,
      <Paragraph>
        <Code>backpack-react-scripts</Code> is aimed at providing teams and
        codebases with a standardised way of building production web apps with
        Backpack + React at Skyscanner. When you create an app using{' '}
        <Code>
          create-react-app my-app --scripts-version=backpack-react-scripts
        </Code>, you&apos;ll notice that your project&apos;s{' '}
        <Code>package.json</Code> has a dependency on{' '}
        <Code>backpack-react-scripts</Code>. When we release new versions going
        forward (i.e. support for server-side rendering etc), all you need to do
        is bump the version number and run <Code>npm install</Code> to reap the
        rewards.
      </Paragraph>,
    ],
    examples: [],
  },
  {
    id: 'future-updates',
    title: 'Future updates',
    blurb: [
      <Paragraph>
        Please consult the{' '}
        <BpkLink href={backpackReactScriptsChangelogHref} blank>
          changelog
        </BpkLink>{' '}
        when performing updates to your <Code>backpack-react-scripts</Code>{' '}
        dependency.
      </Paragraph>,
    ],
    examples: [],
  },
];

const blurb = [
  <IntroBlurb>
    Create React + Backpack apps with no build configuration.
  </IntroBlurb>,
];

const BackpackReactScriptsPage = () => (
  <DocsPageBuilder
    title="Backpack React Scripts"
    blurb={blurb}
    components={components}
  />
);

export default BackpackReactScriptsPage;
