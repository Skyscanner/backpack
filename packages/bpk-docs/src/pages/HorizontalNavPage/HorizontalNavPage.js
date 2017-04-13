import React, { Component } from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import readme from 'bpk-component-horizontal-nav/readme.md';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'bpk-component-horizontal-nav';

import DocsPageBuilder from './../../components/DocsPageBuilder';

class HorizontalNavContainer extends Component {
  constructor() {
    super();

    this.state = {
      selected: 'flights',
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({
      selected: e.target.name,
    });
  }

  render() {
    return (
      <BpkHorizontalNav {...this.props}>
        <BpkHorizontalNavItem
          name="flights"
          selected={this.state.selected === 'flights'}
          onClick={this.onClick}
        >
          Flights
        </BpkHorizontalNavItem>
        <BpkHorizontalNavItem
          name="hotels"
          selected={this.state.selected === 'hotels'}
          onClick={this.onClick}
        >
          Hotels
        </BpkHorizontalNavItem>
        <BpkHorizontalNavItem
          name="car-hire"
          selected={this.state.selected === 'car-hire'}
          onClick={this.onClick}
        >
          Car hire
        </BpkHorizontalNavItem>
      </BpkHorizontalNav>
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: 'By default, navigation items are left aligned.',
    examples: [
      <HorizontalNavContainer />,
    ],
  },
  {
    id: 'space-around',
    title: 'Space around',
    blurb: 'Navigation items can be configured to have space around them.',
    examples: [
      <HorizontalNavContainer spaceAround />,
    ],
  },
];

const HorizontalNavPage = () => <DocsPageBuilder
  title="Horizontal navigation"
  blurb={[
    <BpkParagraph>
      A simple navigation component, ideal for representing a section of a page that links to other pages or views
      within the page.
    </BpkParagraph>,
  ]}
  components={components}
  readme={readme}
  sassdocId="horizontal-nav"
/>;

export default HorizontalNavPage;
