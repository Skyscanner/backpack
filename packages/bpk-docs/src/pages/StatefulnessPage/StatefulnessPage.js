import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import BpkHeading from 'bpk-component-heading';
import BpkLink from 'bpk-component-link';
import { BpkList, BpkListItem } from 'bpk-component-list';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const ScottHurffLink = 'http://scotthurff.com/dppl/';

const StatefulnessPage = () => <DocsPageBuilder
  title="Statefulness"
  blurb={[
    <BpkParagraph>
      Every screen users interact with has different states. Leaning on the research and
      work by <BpkLink href={ScottHurffLink} blank>Scott Hurff</BpkLink> we can assume that in most cases
      there are five.
    </BpkParagraph>,
    <BpkParagraph>
      These states are revealed to the user depending on the context. Unfortunately, things go wrong from time to
      time and users don’t always use the product in the way we intended, so it’s important we take these realities
      into account.
    </BpkParagraph>,
    <BpkHeading level="h2">Ideal state</BpkHeading>,
    <BpkParagraph>
      This is often the state most people design for. It’s the state which showcases the product’s potential.
      It essentially maximises value and is full of useful and actionable content.
    </BpkParagraph>,
    <BpkParagraph>
      Its worth considering focusing on this state first as its helps set the foundation for every other state.
    </BpkParagraph>,
    <BpkHeading level="h2">Empty state</BpkHeading>,
    <BpkParagraph>
      Empty states provide an opportunity to create a great first impression. They’re great for on boarding, to drive
      people to perform a task and keep them interested of the value the feature/product will provide.
    </BpkParagraph>,
    <BpkHeading level="h3">There are three different types of empty state:</BpkHeading>,
    <BpkList>
      <BpkListItem>What is seen by users when they first use the product.</BpkListItem>
      <BpkListItem>What users see when they clear existing data e.g. an empty inbox.</BpkListItem>
      <BpkListItem>What happens when there is nothing to show e.g. no search results.</BpkListItem>
    </BpkList>,
    <BpkHeading level="h2">Error state</BpkHeading>,
    <BpkParagraph>
      An error state is a screen that is shown when things go wrong and users get something other than their desired
      result. Since errors can occur in different combinations, these states can include anything from invalid data
      input) to the inability of an app to connect to the server, or the failure to process a user request.
    </BpkParagraph>,
    <BpkHeading level="h2">Partial state</BpkHeading>,
    <BpkParagraph>
      The partial state is the screen someone will see when the page is no longer empty, but neither ideal. Usually
      when its sparsely populated. The challenge with these states is to prevent users from getting discouraged
      and giving up.
    </BpkParagraph>,
    <BpkParagraph>
    This can be a good opportunity to build micro interactions to help guide users to the ideal state.
    </BpkParagraph>,
    <BpkHeading level="h2">Loading state</BpkHeading>,
    <BpkParagraph>
      Loading states appear when loading data, waiting for an internet connection, or transitioning to another screen.
      This can be represented in many different ways. e.g. it could consist of an entire page takeover, lazy loading
      of content panes, or inline loading, potentially used when one might look up username availability
      from a form field.
    </BpkParagraph>,
    <BpkParagraph>
      The perception of loading is also important. In some cases, filling screens with spinners, can cause users
      to fixate on loading and the lack of content making it feel slower than it is. A common pattern to get
      around this is to use placeholder content to represent the content from the ideal state.
    </BpkParagraph>,
    <BpkParagraph>
      These five states and the seamless transitions between them are important to avoid confusing or
      surprising users as new states appear and disappear.
    </BpkParagraph>,
  ]}
/>;

export default StatefulnessPage;
