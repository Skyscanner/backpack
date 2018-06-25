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
import BpkText from 'bpk-component-text';
import BpkLink from 'bpk-component-link';
import BpkRouterLink from 'bpk-component-router-link';

import DocsPageBuilder from './../../components/DocsPageBuilder';

import * as ROUTES from './../../constants/routes';
import Paragraph from './../../components/Paragraph';
import IntroBlurb from './../../components/IntroBlurb';

const components = [
  {
    id: 'how',
    title: 'How can I contribute?',
    blurb: [
      <div>
        <Paragraph>
          We always like to start with a chat, mostly to ensure you don’t waste
          your time working on something that either the Backpack team are
          either working on or someone else is.
        </Paragraph>
        <Paragraph>
          Chances are you are an employee of Skyscanner, so ping us using one of
          our existing comms tools. If you’re not, don’t let that put you off.
          Your contribution is as important to us as any other. Open a{' '}
          <BpkLink
            href="https://github.com/Skyscanner/backpack/issues/new"
            blank
          >
            GitHub issue
          </BpkLink>, where one of the team will reach out to you.
        </Paragraph>
        <Paragraph>
          Backpack brings design and engineering together and therefore all
          contributions must have both design and engineering input.
        </Paragraph>
        <BpkText tagName="h4" textStyle="lg">
          Don’t have a designer or an engineer?
        </BpkText>
        <Paragraph>
          No worries, we’ll cover this off in the discussion stage and do our
          best to pair you with someone in the team to prioritise accordingly.
        </Paragraph>
        <BpkText tagName="h4" textStyle="lg">
          Looking for code guidelines?
        </BpkText>
        <Paragraph>
          Check out{' '}
          <BpkLink
            href="https://github.com/Skyscanner/backpack/blob/master/contributing.md"
            blank
          >
            contributing.md
          </BpkLink>{' '}
          on GitHub.
        </Paragraph>
      </div>,
    ],
  },
  {
    id: 'what',
    title: 'What should I contribute?',
    blurb: [
      <div>
        <Paragraph>
          Any contribution is welcomed, no matter its size. It might be a bug
          fix, a change to the way we organise something in Sketch, a new
          configuration for a component, a tweak to documentation or even as big
          as a new component. Whatever it is, you can count on us to work with
          you to bring this into Backpack.
        </Paragraph>
        <BpkText tagName="h4" textStyle="lg">
          Should everything belong in Backpack?
        </BpkText>
        <Paragraph>
          As a rule of thumb, any component or pattern that lives in Backpack
          should be used in at least three places. Making something reusable is
          generally harder and more time consuming than making a one-off.
          Backpack’s role isn’t to serve every piece of UI in Skyscanner’s
          product, it’s here to help teams ship quicker in a consistent way.
        </Paragraph>
        <Paragraph>
          As well as ensuring a good pairing of design and engineering, we also
          ensure all new components, features or configurations meet the
          Backpack{' '}
          <BpkRouterLink to={ROUTES.PRINCIPLES}>principles</BpkRouterLink>.
        </Paragraph>
      </div>,
    ],
  },
  {
    id: 'expect',
    title: 'What can you expect from Backpack?',
    blurb: [
      <div>
        <Paragraph>
          Firstly, we don’t want you to be put off by the above list. We realise
          it&apos;s a lot to ask of someone when contributing. If you are able
          to handle the whole thing, great, if not we will help you to get each
          part over the line, to ensure none of these things are a blocker.
        </Paragraph>
        <BpkText tagName="h4" textStyle="lg">
          Priority support
        </BpkText>
        <Paragraph>
          You&apos;re not alone. We always prioritise third-party contributions
          and are on hand for advice, pairing and general design/engineering
          support throughout the process.
        </Paragraph>
      </div>,
    ],
  },
  {
    id: 'whats-next',
    title: 'I contributed, now what?',
    blurb: [
      <div>
        <Paragraph>
          Firstly, a huge thanks! The Backpack team will communicate this
          change/addition in the same manner as when one of our team publishes
          something new.
        </Paragraph>
        <Paragraph>
          We hope your experience contributing was a good one, but we always
          want to make it better. Please take five minutes to complete{' '}
          <BpkLink href="https://buzz12.typeform.com/to/LkxelN" blank>
            this short survey
          </BpkLink>. All responses are anonymous (unless you give us explicit
          consent to attribute your name) so please be honest. We take all
          feedback really seriously and regularly review to ensure Backpack is
          serving you well.
        </Paragraph>
      </div>,
    ],
  },
];

const blurb = [
  <IntroBlurb>
    Contributing to Backpack is not only a great way to shape how Skyscanner’s
    products look, feel and behave, but also a great opportunity to evolve the
    Skyscanner design language and the way we build products.
  </IntroBlurb>,
];
const ContributingPage = () => (
  <DocsPageBuilder title="Contributing" blurb={blurb} components={components} />
);

export default ContributingPage;
