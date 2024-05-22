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

import { renderToString } from 'react-dom/server';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkBottomSheet from './BpkBottomSheet';
// mock breakpoint to always match
jest.mock('../../bpk-component-breakpoint/src/useMediaQuery', () => jest.fn(() => true));
describe('BpkBottomSheet', () => {

  const props = {
    ariaLabelledby: 'bottom-sheet',
    id: "my-bottom-sheet",
    isOpen: true,
    onClose: jest.fn(),
  }

  it('renders without crashing with all props', () => {
    expect(() => renderToString(
      <BpkBottomSheet
        actionText='Action'
        ariaLabelledby='bottom-sheet'
        closeLabel="Close"
        closeOnEscPressed
        closeOnScrimClick
        id="my-bottom-sheet"
        isOpen
        onAction={jest.fn()}
        onClose={jest.fn()}
        title="Bottom sheet title"
        wide
      >
        Bottom Sheet content
      </BpkBottomSheet>
    )).not.toThrow();
  });
  it('renders without crashing with minimum props', () => {
    expect(() => renderToString(
      <BpkBottomSheet
        ariaLabelledby='bottom-sheet'
        id="my-bottom-sheet"
        isOpen
        onClose={jest.fn()}
      >
        Bottom Sheet content
      </BpkBottomSheet>
    )).not.toThrow();
  });
  it('renders correctly with minimum prop', () => {
    const { asFragment } = render(
      <BpkBottomSheet
        ariaLabelledby='bottom-sheet'
        id="my-bottom-sheet"
        isOpen
        onClose={jest.fn()}
      >
        Bottom Sheet content
      </BpkBottomSheet>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders correctly with wide prop', () => {
    const { asFragment } = render(
      <BpkBottomSheet
        {...props}
        wide
      >
        Bottom Sheet content
      </BpkBottomSheet>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders correctly with action props', () => {
    const { asFragment } = render(
      <BpkBottomSheet
        {...props}
        actionText='Action'
        onAction={jest.fn()}
        wide
      >
        Bottom Sheet content
      </BpkBottomSheet>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders correctly with ariaLabelledBy prop', () => {
    const { container } = render(
      <BpkBottomSheet
        {...props}
        ariaLabelledby='my-bottomsheet-title-id'
      >
        Bottom Sheet content
      </BpkBottomSheet>
    );

    expect(container.querySelector('dialog[aria-labelledby="my-bottomsheet-title-id"]')).toBeInTheDocument();
  });
  it('renders correctly with ariaLabel prop', () => {
    const { container } = render(
      <BpkBottomSheet
        {...props}
        ariaLabel='my a11y title'
      >
        Bottom Sheet content
      </BpkBottomSheet>

    );

    expect(container.querySelector('dialog[aria-label="my a11y title"]')).toBeInTheDocument();
  });
});
