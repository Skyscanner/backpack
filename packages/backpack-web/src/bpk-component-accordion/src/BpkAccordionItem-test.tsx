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

import { render } from '@testing-library/react';

import StopsIcon from '../../bpk-component-icon/sm/stops';

import { BpkAccordionContext } from './BpkAccordion';
import BpkAccordionItem from './BpkAccordionItem';

describe('BpkAccordionItem', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkAccordionItem id="my-accordion" title="My accordion item">
        My accordion content
      </BpkAccordionItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "expanded" prop', () => {
    const { asFragment } = render(
      <BpkAccordionItem id="my-accordion" title="My accordion item" expanded>
        My accordion content
      </BpkAccordionItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "tagName" prop set', () => {
    const { asFragment } = render(
      <BpkAccordionItem
        id="my-accordion"
        title="My accordion item"
        tagName="h3"
      >
        My accordion content
      </BpkAccordionItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "textStyle" prop set', () => {
    const { asFragment } = render(
      <BpkAccordionItem
        id="my-accordion"
        title="My accordion item"
        textStyle="xl"
      >
        My accordion content
      </BpkAccordionItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "className" prop', () => {
    const { asFragment } = render(
      <BpkAccordionItem
        id="my-accordion"
        title="My accordion item"
        className="my-custom-class"
      >
        My accordion content
      </BpkAccordionItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render an "initiallyExpanded" attribute on the html node', () => {
    const { asFragment } = render(
      <BpkAccordionItem
        id="my-accordion"
        title="My accordion item"
        initiallyExpanded
      >
        My accordion content
      </BpkAccordionItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an icon set', () => {
    const { asFragment } = render(
      <BpkAccordionItem
        id="my-accordion"
        title="My accordion item"
        icon={<StopsIcon />}
      >
        My accordion content
      </BpkAccordionItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with onDark set', () => {
    const { asFragment } = render(
      <BpkAccordionContext.Provider value={{ onDark: true, divider: true }}>
        <BpkAccordionItem id="my-accordion" title="My accordion item">
          My accordion content
        </BpkAccordionItem>
        ,
      </BpkAccordionContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with no divider', () => {
    const { asFragment } = render(
      <BpkAccordionContext.Provider value={{ onDark: true, divider: false }}>
        <BpkAccordionItem id="my-accordion" title="My accordion item">
          My accordion content
        </BpkAccordionItem>
        ,
      </BpkAccordionContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
