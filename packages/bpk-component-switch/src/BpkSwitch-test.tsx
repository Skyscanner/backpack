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

import BpkSwitch from './BpkSwitch';

describe('BpkSwitch', () => {
  it('should render correctly', () => {
    const { container } = render(<BpkSwitch ariaLabel="Switch" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-label',
      'Switch',
    );
    expect(container.querySelectorAll('.bpk-switch__switch')[0].className).toBe(
      'bpk-switch__switch',
    );
  });

  it('should render small switch', () => {
    const { container } = render(<BpkSwitch ariaLabel="Switch" small />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(
      container.querySelectorAll('.bpk-switch__checkbox')[0].className,
    ).toBe('bpk-switch__checkbox');
    expect(
      container.querySelectorAll('.bpk-switch__switch--small')[0].className,
    ).toBe('bpk-switch__switch bpk-switch__switch--small');
  });

  it('should render correctly when checked', () => {
    const { container } = render(
      <BpkSwitch checked onChange={() => {}} ariaLabel="Switch" />,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(
      container.querySelectorAll('.bpk-switch__checkbox')[0],
    ).toHaveAttribute('checked');
  });

  it('should support custom class names', () => {
    const { container } = render(
      <BpkSwitch ariaLabel="Switch" className="custom-classname" />,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(
      container.querySelectorAll('.custom-classname')[0],
    ).toBeInTheDocument();
  });

  it('should support arbitrary props', () => {
    render(<BpkSwitch ariaLabel="Switch" data-testid="my-switch" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getAllByTestId('my-switch')).toHaveLength(1);
  });
});
