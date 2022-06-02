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
import { render } from '@testing-library/react';
import BpkBreakpoint from 'bpk-component-breakpoint';

import BpkPrice from './BpkPrice';

jest.mock('bpk-component-breakpoint');

const title = '£1,830';
const subtitle = '£200';
const description = '/ night';

describe('Mobile layout', () => {
  beforeEach(() => {
    BpkBreakpoint.mockImplementation(({ children }) => children(true));
  });

  it('should render correctly', () => {
    const { asFragment } = render(<BpkPrice title={title} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support description attribute', () => {
    const { asFragment } = render(
      <BpkPrice title={title} description={description} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support subtitle attribute', () => {
    const { asFragment } = render(
      <BpkPrice title={title} subtitle={subtitle} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkPrice title={title} className="custom-classname" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(<BpkPrice title={title} testid="123" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Desktop layout', () => {
  beforeEach(() => {
    BpkBreakpoint.mockImplementation(({ children }) => children(true));
  });

  it('should render correctly', () => {
    const { asFragment } = render(<BpkPrice title={title} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support description attribute', () => {
    const { asFragment } = render(
      <BpkPrice title={title} description={description} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support subtitle attribute', () => {
    const { asFragment } = render(
      <BpkPrice title={title} subtitle={subtitle} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkPrice title={title} className="custom-classname" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(<BpkPrice title={title} testid="123" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
