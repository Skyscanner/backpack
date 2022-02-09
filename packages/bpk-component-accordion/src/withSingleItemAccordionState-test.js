/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

/* @flow strict */

import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';

import BpkAccordion from './BpkAccordion';
import withSingleItemAccordionState from './withSingleItemAccordionState';

const EnhancedComponent = withSingleItemAccordionState(BpkAccordion);

describe('withSingleItemAccordionState(BpkAccordion)', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <EnhancedComponent>
        <div>Accordion Item 1</div>
        <div>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </EnhancedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <EnhancedComponent className="someClass" foo="bar">
        <div>Accordion Item 1</div>
        <div>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </EnhancedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom initially expanded item', () => {
    const { asFragment } = render(
      <EnhancedComponent>
        <div>Accordion Item 1</div>
        <div initiallyExpanded>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </EnhancedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly even when multiple items are marked as initially expanded', () => {
    const { asFragment } = render(
      <EnhancedComponent>
        <div>Accordion Item 1</div>
        <div initiallyExpanded>Accordion Item 2</div>
        <div initiallyExpanded>Accordion Item 3</div>
      </EnhancedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should update "expanded" value with key of clicked child', () => {
    const accordionContainer = shallow(
      <EnhancedComponent>
        <div>Accordion Item 1</div>
        <div initiallyExpanded>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </EnhancedComponent>,
    );

    expect(accordionContainer.state('expanded')).toEqual('.1');

    accordionContainer
      .findWhere((e) => e.text() === 'Accordion Item 1')
      .first()
      .prop('onClick')();
    expect(accordionContainer.state('expanded')).toEqual('.0');

    accordionContainer
      .findWhere((e) => e.text() === 'Accordion Item 3')
      .first()
      .prop('onClick')();
    expect(accordionContainer.state('expanded')).toEqual('.2');
  });
});
