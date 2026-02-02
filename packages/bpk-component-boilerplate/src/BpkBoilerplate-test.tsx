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

import BpkBoilerplate from './BpkBoilerplate';

describe('BpkBoilerplate', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkBoilerplate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not support custom class names', () => {
    const { container } = render(
      <BpkBoilerplate className="custom-classname" />,
    );
    expect(container.className).not.toContain('custom-classname');
  });

  it('should support arbitrary props', () => {
    const { getAllByTestId } = render(<BpkBoilerplate data-testid="123" />);
    expect(getAllByTestId('123').length).toBe(1);
  });
});
