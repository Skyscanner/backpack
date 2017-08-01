/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { BpkList, BpkListItem } from 'bpk-component-list';
import { cssModules } from 'bpk-react-utils';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';

import STYLES from './statefulness-page.scss';

const getClassName = cssModules(STYLES);
const ScottHurffLink = 'http://scotthurff.com/dppl/';

const StatefulnessPage = () => <DocsPageBuilder
  title="Statefulness"
  blurb={[
    <Paragraph>
    Statefulness refers to a component&#39;s ability to change its appearance depending on the context
    or interaction behaviour.
    </Paragraph>,
    <Heading level="h2">The 5 view states</Heading>,
    <Paragraph>
      Every screen users interact with has different states. Leaning on the research and
      work by <BpkLink href={ScottHurffLink} blank>Scott Hurff</BpkLink> we can assume that in most cases
      there are five.
    </Paragraph>,
    <Paragraph>
      Unfortunately, things go wrong from time to
      time and users don’t always use the product in the way we intended, so it’s important we take these realities
      into account and surface different states to the user depending on the context.
    </Paragraph>,
    <Heading level="h3">1. Ideal state</Heading>,
    <Paragraph>
      This is often the state most people design for. It’s the state which showcases the product’s potential.
      It essentially maximises value and is full of useful and actionable content.
    </Paragraph>,
    <Paragraph>
      It&#39;s worth considering this state first as it helps set the foundation for every other state.
    </Paragraph>,
    <Heading level="h3">2. Empty state</Heading>,
    <Paragraph>
      Empty states provide an opportunity to create a great first impression. They’re great for onboarding, to drive
      people to perform a task and keep them interested of the value the feature/product will provide.
    </Paragraph>,
    <Paragraph><strong>There are three different types of empty state:</strong></Paragraph>,
    <BpkList>
      <BpkListItem>What is seen by users when they first use the product.</BpkListItem>
      <BpkListItem>What users see when they clear existing data e.g. an empty inbox.</BpkListItem>
      <BpkListItem>What happens when there is nothing to show e.g. no search results.</BpkListItem>
    </BpkList>,
    <Heading level="h3">3. Error state</Heading>,
    <Paragraph>
      An error state is a screen that is shown when things go wrong and users get something other than their desired
      result. Since errors can occur in different combinations, these states can include anything from invalid data
      input to the inability of an app to connect to the server, or the failure to process a user request.
    </Paragraph>,
    <Heading level="h3">4. Partial state</Heading>,
    <Paragraph>
      The partial state is the screen someone will see when the page is no longer empty, but neither ideal – usually
      when it is sparsely populated. The challenge with these states is to prevent users from getting discouraged
      and giving up.
    </Paragraph>,
    <Paragraph>
    This can be a good opportunity to build micro interactions to help guide users to the ideal state.
    </Paragraph>,
    <Heading level="h3">5. Loading state</Heading>,
    <Paragraph>
      Loading states appear when loading data, waiting for an internet connection, or transitioning to another screen.
      This can be represented in many different ways. e.g. it could consist of an entire page takeover, lazy loading
      of content panes, or inline loading.
    </Paragraph>,
    <Paragraph>
      The perception of loading is also important. In some cases, filling screens with spinners, can cause users
      to fixate on loading with the lack of content making it feel slower than it is. A common pattern to get
      around this is to use placeholder content to represent the content from the ideal state.
    </Paragraph>,
    <Paragraph>
      These five states and the seamless transitions between them are important to avoid confusing or
      surprising users as new states appear and disappear.
    </Paragraph>,
    <Heading level="h2">Micro states</Heading>,
    <Paragraph>
      As well as the five view based states, it is important to remember to consider micro states. These could
      include, but are not limited to the below:
    </Paragraph>,
    <BpkList>
      <BpkListItem>Normal</BpkListItem>
      <BpkListItem>Hover</BpkListItem>
      <BpkListItem>Focussed</BpkListItem>
      <BpkListItem>Active</BpkListItem>
      <BpkListItem>Selected</BpkListItem>
      <BpkListItem>Disabled</BpkListItem>
    </BpkList>,
    <Paragraph>
      As a general rule of thumb, the more you interact with something the darker it should appear in colour e.g.
    </Paragraph>,
    <section className={getClassName('bpkdocs-statefulness-page__states')}>
      <div
        className={
          ['bpkdocs-statefulness-page__state-example', 'bpkdocs-statefulness-page__state-normal']
            .map(getClassName)
            .join(' ')
        }
      >Normal</div>
      <div
        className={
          ['bpkdocs-statefulness-page__state-example', 'bpkdocs-statefulness-page__state-hover']
            .map(getClassName)
            .join(' ')
        }
      >Hover</div>
      <div
        className={
          ['bpkdocs-statefulness-page__state-example', 'bpkdocs-statefulness-page__state-active']
            .map(getClassName)
            .join(' ')
        }
      >Active</div>
      <div
        className={
          ['bpkdocs-statefulness-page__state-example', 'bpkdocs-statefulness-page__state-focussed']
            .map(getClassName)
            .join(' ')
        }
      >Focussed</div>
      <div
        className={
          ['bpkdocs-statefulness-page__state-example', 'bpkdocs-statefulness-page__state-selected']
            .map(getClassName)
            .join(' ')
        }
      >Selected</div>
    </section>,
  ]}
/>;

export default StatefulnessPage;
