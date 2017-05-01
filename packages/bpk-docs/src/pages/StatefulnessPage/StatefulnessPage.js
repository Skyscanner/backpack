import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import BpkHeading from 'bpk-component-heading';
import BpkLink from 'bpk-component-link';
import { BpkList, BpkListItem } from 'bpk-component-list';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import './statefulness-page.scss';

const ScottHurffLink = 'http://scotthurff.com/dppl/';

const StatefulnessPage = () => <DocsPageBuilder
  title="Statefulness"
  blurb={[
    <BpkParagraph>
    Statefulness refers to a component&#39;s ability to change its appearance depending on the context
    or interaction behaviour.
    </BpkParagraph>,
    <BpkHeading level="h2">The 5 view states</BpkHeading>,
    <BpkParagraph>
      Every screen users interact with has different states. Leaning on the research and
      work by <BpkLink href={ScottHurffLink} blank>Scott Hurff</BpkLink> we can assume that in most cases
      there are five.
    </BpkParagraph>,
    <BpkParagraph>
      Unfortunately, things go wrong from time to
      time and users don’t always use the product in the way we intended, so it’s important we take these realities
      into account and surface different states to the user depending on the context.
    </BpkParagraph>,
    <BpkHeading level="h3">1. Ideal state</BpkHeading>,
    <BpkParagraph>
      This is often the state most people design for. It’s the state which showcases the product’s potential.
      It essentially maximises value and is full of useful and actionable content.
    </BpkParagraph>,
    <BpkParagraph>
      It&#39;s worth considering this state first as it helps set the foundation for every other state.
    </BpkParagraph>,
    <BpkHeading level="h3">2. Empty state</BpkHeading>,
    <BpkParagraph>
      Empty states provide an opportunity to create a great first impression. They’re great for onboarding, to drive
      people to perform a task and keep them interested of the value the feature/product will provide.
    </BpkParagraph>,
    <BpkParagraph><strong>There are three different types of empty state:</strong></BpkParagraph>,
    <BpkList>
      <BpkListItem>What is seen by users when they first use the product.</BpkListItem>
      <BpkListItem>What users see when they clear existing data e.g. an empty inbox.</BpkListItem>
      <BpkListItem>What happens when there is nothing to show e.g. no search results.</BpkListItem>
    </BpkList>,
    <BpkHeading level="h3">3. Error state</BpkHeading>,
    <BpkParagraph>
      An error state is a screen that is shown when things go wrong and users get something other than their desired
      result. Since errors can occur in different combinations, these states can include anything from invalid data
      input to the inability of an app to connect to the server, or the failure to process a user request.
    </BpkParagraph>,
    <BpkHeading level="h3">4. Partial state</BpkHeading>,
    <BpkParagraph>
      The partial state is the screen someone will see when the page is no longer empty, but neither ideal – usually
      when it is sparsely populated. The challenge with these states is to prevent users from getting discouraged
      and giving up.
    </BpkParagraph>,
    <BpkParagraph>
    This can be a good opportunity to build micro interactions to help guide users to the ideal state.
    </BpkParagraph>,
    <BpkHeading level="h3">5. Loading state</BpkHeading>,
    <BpkParagraph>
      Loading states appear when loading data, waiting for an internet connection, or transitioning to another screen.
      This can be represented in many different ways. e.g. it could consist of an entire page takeover, lazy loading
      of content panes, or inline loading.
    </BpkParagraph>,
    <BpkParagraph>
      The perception of loading is also important. In some cases, filling screens with spinners, can cause users
      to fixate on loading with the lack of content making it feel slower than it is. A common pattern to get
      around this is to use placeholder content to represent the content from the ideal state.
    </BpkParagraph>,
    <BpkParagraph>
      These five states and the seamless transitions between them are important to avoid confusing or
      surprising users as new states appear and disappear.
    </BpkParagraph>,
    <BpkHeading level="h2">Micro states</BpkHeading>,
    <BpkParagraph>
      As well as the five view based states, it is important to remember to consider micro states. These could
      include, but are not limited to the below:
    </BpkParagraph>,
    <BpkList>
      <BpkListItem>Normal</BpkListItem>
      <BpkListItem>Hover</BpkListItem>
      <BpkListItem>Focussed</BpkListItem>
      <BpkListItem>Active</BpkListItem>
      <BpkListItem>Selected</BpkListItem>
      <BpkListItem>Disabled</BpkListItem>
    </BpkList>,
    <BpkParagraph>
      As a general rule of thumb, the more you interact with something the darker it should appear in colour e.g.
    </BpkParagraph>,
    <section className="bpkdocs-statefulness-page__states">
      <div className="bpkdocs-statefulness-page__state-example bpkdocs-statefulness-page__state-normal">Normal</div>
      <div className="bpkdocs-statefulness-page__state-example bpkdocs-statefulness-page__state-hover">Hover</div>
      <div className="bpkdocs-statefulness-page__state-example bpkdocs-statefulness-page__state-active">Active</div>
      <div className="bpkdocs-statefulness-page__state-example bpkdocs-statefulness-page__state-focussed">Focussed</div>
      <div className="bpkdocs-statefulness-page__state-example bpkdocs-statefulness-page__state-selected">Selected</div>
    </section>,
  ]}
/>;

export default StatefulnessPage;
