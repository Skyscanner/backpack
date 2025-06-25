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

import BpkRadio from './BpkRadio';

describe('BpkRadio', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkRadio name="radio" label="Direct" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when label is a node', () => {
    const { asFragment } = render(
      <BpkRadio name="radio" label={<span>Direct</span>} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with id attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2322): Type '{ id: string; name: string; label: string; }... Remove this comment to see the full error message
      <BpkRadio id="radio" name="radio" label="Direct" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with checked attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2322): Type '{ name: string; label: string; checked: true... Remove this comment to see the full error message
      <BpkRadio name="radio" label="Direct" checked onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with disabled attribute', () => {
    const { asFragment } = render(
      <BpkRadio name="radio" label="Direct" disabled />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with white attribute', () => {
    const { asFragment } = render(
      <BpkRadio name="radio" label="Direct" white />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with value attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2322): Type '{ name: string; label: string; value: string... Remove this comment to see the full error message
      <BpkRadio name="radio" label="Direct" value="my-value" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when invalid', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2322): Type '{ name: string; label: string; value: string... Remove this comment to see the full error message
      <BpkRadio name="radio" label="Direct" value="my-value" valid={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with ariaLabel attribute', () => {
    const { asFragment } = render(
      <BpkRadio
        // @ts-expect-error TS(2322): Type '{ id: string; name: string; label: string; a... Remove this comment to see the full error message
        id="radio"
        name="radio"
        label="Direct"
        ariaLabel="Is this direct"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
