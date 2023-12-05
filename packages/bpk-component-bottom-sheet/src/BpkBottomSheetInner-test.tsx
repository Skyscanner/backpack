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

import BpkBottomSheetInner from './BpkBottomSheetInner';

describe('BpkBottomSheetInner', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkBottomSheetInner
        id="my-bottom-sheet"
        title="Bottom sheet title"
        closeLabel="Close"
        onClose={jest.fn()}
      >
        Bottom sheet content
      </BpkBottomSheetInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when it has a className', () => {
    const { asFragment } = render(
      <BpkBottomSheetInner
        id="my-bottom-sheet"
        title="Bottom sheet title"
        closeLabel="Close"
        onClose={jest.fn()}
        className="my-classname"
      >
        Bottom sheet content
      </BpkBottomSheetInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom content classname', () => {
    const { asFragment } = render(
      <BpkBottomSheetInner
        id="my-bottom-sheet"
        title="Bottom sheet title"
        closeLabel="Close"
        onClose={jest.fn()}
        contentClassName="my-classname"
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
        onClose={jest.fn()}
        wide
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
        onClose={jest.fn()}
        actionText="Dismiss"
        onAction={jest.fn()}
      >
        Bottom sheet content
      </BpkBottomSheetInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

});
