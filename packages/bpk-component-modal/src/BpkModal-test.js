/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';

import BpkModal from './BpkModal';

describe('BpkModal', () => {
  let closeEvents;

  beforeAll(() => {
    closeEvents = {
      onTouchStart: jest.fn(),
      onTouchMove: jest.fn(),
      onTouchEnd: jest.fn(),
      onMouseDown: jest.fn(),
      onMouseMove: jest.fn(),
      onMouseUp: jest.fn(),
    };
  });

  it('should render correctly in the given target if renderTarget is supplied', () => {
    const customRenderTarget = document.createElement('div');

    const tree = renderer
      .create(
        <BpkModal
          id="my-modal"
          title="Modal title"
          onClose={jest.fn()}
          closeLabel="Close"
          closeEvents={closeEvents}
          dialogRef={jest.fn()}
          isIphone={false}
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => customRenderTarget}
        >
          Modal content inside a custom target
        </BpkModal>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(customRenderTarget).toMatchSnapshot();
  });
});
