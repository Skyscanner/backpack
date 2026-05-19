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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import BpkAccordionItem from './BpkAccordionItem';
import withAccordionItemState from './withAccordionItemState';

const EnhancedComponent = withAccordionItemState(BpkAccordionItem);

describe('withAccordionItemState(BpkAccordionItem)', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <EnhancedComponent id="my-accordion" title="My accordion item">
        My accordion content
      </EnhancedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "expanded" prop', () => {
    const { asFragment } = render(
      <EnhancedComponent id="my-accordion" title="My accordion item" expanded>
        My accordion content
      </EnhancedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "initiallyExpanded" prop', () => {
    const { asFragment } = render(
      <EnhancedComponent
        id="my-accordion"
        title="My accordion item"
        initiallyExpanded
      >
        My accordion content
      </EnhancedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should expand on click', async () => {
    render(
      <EnhancedComponent id="my-accordion" title="My accordion item">
        My accordion content
      </EnhancedComponent>,
    );

    expect(screen.getByText('My accordion content')).not.toBeVisible();

    const accordionItem = screen.getByText('My accordion item');
    await userEvent.click(accordionItem);

    expect(screen.getByText('My accordion content')).toBeVisible();
  });
});
