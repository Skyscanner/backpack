import React, { Component } from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import BpkCtaButton from 'bpk-component-cta-button';
import BpkRouterLink from 'bpk-component-router-link';
import ctaButtonReadme from 'bpk-component-cta-button/readme.md';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';

class CtaButtonContainer extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      loading: true,
    });
  }

  render() {
    const { ...rest } = this.props;

    delete rest.onClick;
    delete rest.loading;

    return (
      <BpkCtaButton
        loading={this.state.loading}
        onClick={this.onClick}
        {...this.props}
      >
        Search
      </BpkCtaButton>
    );
  }
}

const components = [
  {
    id: 'examples',
    title: 'Examples',
    blurb: [],
    examples: [
      <CtaButtonContainer />,
      ' ',
      <CtaButtonContainer large />,
    ],
  },
];

const CallToActionsPage = () => <DocsPageBuilder
  title="Call to actions"
  blurb={[
    <BpkParagraph>
      Call to action buttons support all the same props as
      the <BpkRouterLink to={ROUTES.BUTTONS}>button</BpkRouterLink> component. They are distinct in that they
      encapsulate the composition of <BpkRouterLink to={ROUTES.ICONS}>icons</BpkRouterLink> as well
      as <BpkRouterLink to={ROUTES.SPINNERS}>spinners</BpkRouterLink> to form a nice, compelling call to action.
    </BpkParagraph>,
  ]}
  components={components}
  readme={ctaButtonReadme}
  sassdocId="buttons"
/>;

export default CallToActionsPage;
