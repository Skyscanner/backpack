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

import { render } from '@testing-library/react';

import BpkCheckbox from './BpkCheckbox';

describe('BpkCheckbox', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with id attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" id="checkbox" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with checked attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox
        name="checkbox"
        label="Prefer directs"
        checked
        onChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with disabled attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" disabled />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with white attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" white />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with valid=false attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" valid={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with required attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" required />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with value attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" value="my-value" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a small label', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" smallLabel />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with indeterminate attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" indeterminate />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with indeterminate state when both checked and indeterminate attributes', () => {
    const { asFragment } = render(
      <BpkCheckbox
        name="checkbox"
        label="Prefer directs"
        indeterminate
        checked
        onChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as disabled when required and disabled', () => {
    const { asFragment } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" required disabled />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
