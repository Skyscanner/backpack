import React, { Component } from 'react';
import BpkNudger from 'bpk-component-nudger';
import BpkParagraph from 'bpk-component-paragraph';
import BpkRouterLink from 'bpk-component-router-link';
import BpkLink from 'bpk-component-link';
import tooltipReadme from 'bpk-component-nudger/readme.md';

import { I18N } from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import './tooltips-page.scss';

class NudgerContainer extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 2,
    };
  }
  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <BpkNudger
        id="my-nudger"
        min={1}
        max={10}
        value={this.state.value}
        onChange={this.handleChange}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        Nudgers come with decrease and increase buttons to either side of the selected value. A minimum and maximum
        value needs to be provided.
      </BpkParagraph>,
    ],
    examples: [
      <NudgerContainer />,
    ],
  },
];

const PopoversPage = () => <DocsPageBuilder
  title="Tooltips"
  blurb={[
    <BpkParagraph>
      Nudgers allow users to quickly specify a value within a given range.
    </BpkParagraph>,
    <BpkParagraph>
      They should only be used for small number ranges. If users have to click many times to get to the desired value,
      a different UI element might be better suited.
    </BpkParagraph>,
    <BpkParagraph>
      <BpkLink href="#translation">Recommended translation strings</BpkLink> exist for this component (see
      also <BpkRouterLink to={I18N}>Internationalisation</BpkRouterLink>).
    </BpkParagraph>,
  ]}
  components={components}
  readme={tooltipReadme}
/>;

export default PopoversPage;
