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
import { renderToString } from 'react-dom/server';

import BpkBottomSheet from './BpkBottomSheet';

describe('BpkBottomSheet', () => {
  it('should render correctly in the given target if renderTarget is supplied', () => {
    const customRenderTarget = document.createElement('div');
    const { asFragment } = render(
      <BpkBottomSheet
        id="my-bottom-sheet"
        title="Bottom Sheet title"
        onClose={jest.fn()}
        closeLabel="Close"
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
      >
        Bottom Sheet content inside a custom target
      </BpkBottomSheet>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(customRenderTarget).toMatchSnapshot();
  });
});

describe('Server Side Rendering', () => {
  it('renders without crashing', () => {
    const WrappedComponent = () => <div data-testid="dialog-content">Wrapped Component</div>;

    expect(() => renderToString(
      <div id="pagewrap">
        <div> Content hidden from AT</div>
        <BpkBottomSheet
          id="my-bottom-sheet"
          isOpen
          onClose={jest.fn()}
          getApplicationElement={() => document.getElementById('pagewrap')}
        >
          {WrappedComponent}
        </BpkBottomSheet>
      </div>
    )).not.toThrow();
  });
});
