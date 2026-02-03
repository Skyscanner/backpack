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
  it('should have no children if stops is zero', () => {
    const { container } = render(<BpkJourneyArrow />);
    expect(container.querySelectorAll(".bpk-journey-arrow__stop").length).toBe(0);
  });

  it('should render with the correct number of stop spots', () => {
    const { container } = render(<BpkJourneyArrow stops={2} />);
    expect(container.querySelectorAll(".bpk-journey-arrow__stop").length).toBe(2);
  });

  it('should render with capped spot count', () => {
    const { container } = render(<BpkJourneyArrow stops={37} />);
    expect(container.querySelectorAll(".bpk-journey-arrow__stop").length).toBe(3);
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
