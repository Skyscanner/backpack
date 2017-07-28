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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import readme from 'bpk-component-horizontal-nav/readme.md';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'bpk-component-horizontal-nav';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

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
    const { spaceAround, ...rest } = this.props;

    return (
      <BpkHorizontalNav {...rest}>
        <BpkHorizontalNavItem
          name="flights"
          selected={this.state.selected === 'flights'}
          onClick={this.onClick}
          spaceAround={spaceAround}
        >
          Flights
        </BpkHorizontalNavItem>
        <BpkHorizontalNavItem
          name="hotels"
          selected={this.state.selected === 'hotels'}
          onClick={this.onClick}
          spaceAround={spaceAround}
        >
          Hotels
        </BpkHorizontalNavItem>
        <BpkHorizontalNavItem
          name="car-hire"
          selected={this.state.selected === 'car-hire'}
          onClick={this.onClick}
          spaceAround={spaceAround}
        >
          Car hire
        </BpkHorizontalNavItem>
      </BpkHorizontalNav>
    );
  }
}

HorizontalNavContainer.propTypes = {
  spaceAround: PropTypes.bool,
};

HorizontalNavContainer.defaultProps = {
  spaceAround: false,
};

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
    <Paragraph>
      A simple navigation component, ideal for representing a section of a page that links to other pages or views
      within the page.
    </Paragraph>,
  ]}
  components={components}
  readme={readme}
/>;

export default HorizontalNavPage;
