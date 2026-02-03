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
import { axe } from 'jest-axe';

import BpkScrim from './BpkScrim';
import withScrim from './withScrim';
import withScrimmedPortal from './withScrimmedPortal';

describe('BpkScrim accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(<BpkScrim />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('withScrim accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const TestComponent = (props: any) => <div {...props} />;
    const Component = withScrim(TestComponent);
    const { container } = render(
      <Component
        onClose={jest.fn()}
        getApplicationElement={jest.fn()}
        isIphone={false}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('withScrimmedPortal accessibility tests', () => {
  it('should not have programatically-detectable accessibility issues', async () => {
    const WrappedComponent = (props: any) => <div {...props} />;
    const Component = withScrimmedPortal(WrappedComponent);
    const { container } = render(
      <Component
        getApplicationElement={jest.fn()}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  })
});