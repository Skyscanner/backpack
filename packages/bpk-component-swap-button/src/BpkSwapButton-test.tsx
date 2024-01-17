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
import { axe } from 'jest-axe';

import BpkSwapButton from './BpkSwapButton';

const props = {
  onClick: jest.fn(),
  ariaLabel: 'Swap Button',
  ariaLiveTextProp: 'Swapped'
};

describe('BpkSwapButton', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkSwapButton {...props }/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have any programmatically detectable accessibility issues', async () => {
      const { container } = render(<BpkSwapButton {...props } />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('calls onClick prop when clicked', async () => {
      const mockOnClick = jest.fn();
      render(<BpkSwapButton {...props} onClick={mockOnClick}/>);

      await userEvent.click(screen.getByRole('button'));

      expect(mockOnClick).toHaveBeenCalled();
    });
  });
