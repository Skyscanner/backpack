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

import BpkDrawer from './BpkDrawer';

describe('BpkDrawer', () => {
  it('should render correctly in the given target if renderTarget is supplied', () => {
    const customRenderTarget = document.createElement('div');

    const { asFragment } = render(
      <BpkDrawer
        id="my-drawer"
        title="Drawer title"
        onClose={jest.fn()}
        closeLabel="Close"
        dialogRef={jest.fn()}
        isIphone={false}
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
      >
        Drawer content
      </BpkDrawer>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(customRenderTarget).toMatchSnapshot();
  });
});
