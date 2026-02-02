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
import '@testing-library/jest-dom';

import BpkLabel from './BpkLabel';

describe('BpkLabel', () => {
  it('should render correctly', () => {
    const { container } = render(<BpkLabel>Origin</BpkLabel>);
    const label = container.querySelector('label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('bpk-label');
    expect(label).toHaveTextContent('Origin');
    expect(
      label?.querySelector('.bpk-label__asterisk'),
    ).not.toBeInTheDocument();
  });

  it('should render correctly with a "white" attribute', () => {
    const { container } = render(<BpkLabel white>Origin</BpkLabel>);
    const label = container.querySelector('label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('bpk-label');
    expect(label).toHaveClass('bpk-label--white');
    expect(label).toHaveTextContent('Origin');
  });

  it('should render correctly with a "required" attribute', () => {
    const { container } = render(<BpkLabel required>Origin</BpkLabel>);
    const label = container.querySelector('label');
    const asterisk = label?.querySelector('.bpk-label__asterisk');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('bpk-label');
    expect(label).toHaveTextContent('Origin');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent('*');
  });

  it('should render correctly with "valid" attribute false', () => {
    const { container } = render(<BpkLabel valid={false}>Origin</BpkLabel>);
    const label = container.querySelector('label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('bpk-label');
    expect(label).toHaveClass('bpk-label--invalid');
    expect(label).toHaveTextContent('Origin');
  });

  it('should render correctly with "valid" attribute false and "required" attributes', () => {
    const { container } = render(
      <BpkLabel required valid={false}>
        Origin
      </BpkLabel>,
    );
    const label = container.querySelector('label');
    const asterisk = label?.querySelector('.bpk-label__asterisk');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('bpk-label');
    expect(label).toHaveClass('bpk-label--invalid');
    expect(label).toHaveTextContent('Origin');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent('*');
  });

  it('should render correctly without an asterisk when disabled and required', () => {
    const { container } = render(
      <BpkLabel disabled required>
        Origin
      </BpkLabel>,
    );
    const label = container.querySelector('label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('bpk-label');
    expect(label).toHaveClass('bpk-label--disabled');
    expect(label).toHaveTextContent('Origin');
    expect(
      label?.querySelector('.bpk-label__asterisk'),
    ).not.toBeInTheDocument();
  });

  it('should render correctly with a "className" attribute', () => {
    const { container } = render(<BpkLabel className="test">Origin</BpkLabel>);
    const label = container.querySelector('label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('bpk-label');
    expect(label).toHaveClass('test');
    expect(label).toHaveTextContent('Origin');
  });
});
