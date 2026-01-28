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

import { screen, render } from '@testing-library/react';

import BpkInputV2 from '../BpkInputV2';

import BpkInputGroup from './BpkInputGroup';

describe('BpkInputGroup', () => {
  it('should render correctly with startElement', () => {
    const { asFragment } = render(
      <BpkInputGroup startElement={<span>$</span>}>
        <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
      </BpkInputGroup>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with endElement', () => {
    const { asFragment } = render(
      <BpkInputGroup endElement={<span>USD</span>}>
        <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
      </BpkInputGroup>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with both startElement and endElement', () => {
    const { asFragment } = render(
      <BpkInputGroup startElement={<span>$</span>} endElement={<span>USD</span>}>
        <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
      </BpkInputGroup>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without start/end elements', () => {
    const { asFragment } = render(
      <BpkInputGroup>
        <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
      </BpkInputGroup>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render start element at the beginning', () => {
    render(
      <BpkInputGroup startElement={<span data-testid="start-element">$</span>}>
        <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
      </BpkInputGroup>,
    );
    const startElement = screen.getByTestId('start-element');
    expect(startElement).toBeInTheDocument();
    expect(startElement.textContent).toBe('$');
  });

  it('should render end element at the end', () => {
    render(
      <BpkInputGroup endElement={<span data-testid="end-element">USD</span>}>
        <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
      </BpkInputGroup>,
    );
    const endElement = screen.getByTestId('end-element');
    expect(endElement).toBeInTheDocument();
    expect(endElement.textContent).toBe('USD');
  });

  it('should ensure input still functions correctly within group', () => {
    render(
      <BpkInputGroup startElement={<span>$</span>}>
        <BpkInputV2 id="test" name="test" value="100" onChange={() => {}} />
      </BpkInputGroup>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('100');
  });
});
