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
import BpkBottomSheetInner from './BpkBottomSheetInner';

describe('BpkBottomSheetInner', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkBottomSheetInner
        id="my-bottom-sheet"
        title="Bottom sheet title"
        dialogRef={jest.fn()}
        closeLabel="Close"
        onClose={jest.fn()}
        exiting={false}
      >
        Bottom sheet content
      </BpkBottomSheetInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with wide prop', () => {
    const { asFragment } = render(
      <BpkBottomSheetInner
        id="my-bottom-sheet"
        title="Bottom sheet title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        wide
        exiting={false}
      >
        Bottom sheet content
      </BpkBottomSheetInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with actionText prop', () => {
    const { asFragment } = render(
      <BpkBottomSheetInner
        id="my-bottom-sheet"
        title="Bottom sheet title"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        actionText="Dismiss"
        onAction={jest.fn()}
        exiting={false}
      >
        Bottom sheet content
      </BpkBottomSheetInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without title prop', () => {
    const { asFragment, container } = render(
      <BpkBottomSheetInner
        id="my-bottom-sheet"
        title=""
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        actionText="Dismiss"
        onAction={jest.fn()}
        exiting={false}
      >
        Bottom sheet content
      </BpkBottomSheetInner>,
    );

    const titleElement = container.querySelector('h2');
    expect(titleElement).not.toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
