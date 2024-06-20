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

import BpkJourneyArrow from './BpkJourneyArrow';

describe('BpkJourneyArrow', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkJourneyArrow />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with stops', () => {
    const { asFragment } = render(<BpkJourneyArrow stops={3} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not support custom class names', () => {
    const { container } = render(
      <BpkJourneyArrow className="custom-classname" />,
    );
    expect(container.className).not.toContain('custom-classname');
  });

  it('should support arbitrary props', () => {
    const { getAllByTestId } = render(
      <BpkJourneyArrow data-testid="123" />,
    );
    expect(getAllByTestId('123').length).toBe(1);
  });
});
