import React, { Component } from 'react';
import BpkProgress from 'bpk-component-progress';
import BpkButton from 'bpk-component-button';
import BpkParagraph from 'bpk-component-paragraph';
import progressReadme from 'bpk-component-progress/readme.md';

import ProgressContainer from './ProgressContainer';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import './tooltips-page.scss';

class SteppedContainer extends Component {
  constructor() {
    super();

    this.state = {
      progress: 1,
    };

    this.setProgress = this.setProgress.bind(this);
  }

  setProgress(progress) {
    if (progress >= 1 && progress <= 5) {
      this.setState({ progress });
    }
  }

  render() {
    return (
      <div>
        <BpkProgress
          min={0}
          max={5}
          value={this.state.progress}
          stepped
        />
        <br />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BpkButton
            secondary
            onClick={() => this.setProgress(this.state.progress - 1)}
            disabled={this.state.progress <= 1}
            getValueText={(value, min, max) => `Step ${value} of ${max}`}
          >
            Back
          </BpkButton>
          <span>{ `Step ${this.state.progress} of 5` }</span>
          <BpkButton
            onClick={() => this.setProgress(this.state.progress + 1)}
            disabled={this.state.progress === 5}
          >
            Continue
          </BpkButton>
        </div>
      </div>
    );
  }
}

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
      <ProgressContainer
        initialValue={0}
      />,
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
      <ProgressContainer
        initialValue={0}
        small
      />,
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
      <SteppedContainer />,
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
