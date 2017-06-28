import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import progressReadme from 'bpk-component-progress/readme.md';

import ProgressContainer from './ProgressContainer';
import SteppedProgressContainer from './SteppedProgressContainer';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        This is the default progress bar which animates in and automatically hides when complete.
      </BpkParagraph>,
    ],
    examples: [
      <ProgressContainer />,
    ],
  },
  {
    id: 'small',
    title: 'Small',
    blurb: [
      <BpkParagraph>
        This is very similar to the default progress bar, but is a little thinner to fit nicely inline,
        e.g. at the top of a page.
      </BpkParagraph>,
    ],
    examples: [
      <ProgressContainer small />,
    ],
  },
  {
    id: 'stepped',
    title: 'Stepped',
    blurb: [
      <BpkParagraph>
        This option allows you to specify how many steps there are in a given task. These are great to guide users
        through longer processes such as completing a form.
      </BpkParagraph>,
    ],
    examples: [
      <SteppedProgressContainer />,
    ],
  },
];


const PopoversPage = () => <DocsPageBuilder
  title="Progress bars"
  blurb={[
    <BpkParagraph>
      Progress bars are a great way of providing feedback when a tasking is running. Unlike spinners,
      they give the user a clear idea of how long the given task will take.
    </BpkParagraph>,
  ]}
  components={components}
  readme={progressReadme}
/>;

export default PopoversPage;
