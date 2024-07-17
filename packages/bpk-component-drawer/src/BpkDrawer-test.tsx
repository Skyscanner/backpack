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

import { render, screen } from '@testing-library/react';

import BpkDrawer from './BpkDrawer';

describe('BpkDrawer', () => {
  it('should render correctly in the given target if renderTarget is supplied', () => {
    render(
      <div id="pagewrap">
        <BpkDrawer
          id="my-drawer"
          title="Drawer title"
          onClose={jest.fn()}
          closeLabel="Close"
          dialogRef={jest.fn()}
          isIphone={false}
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => document.getElementById('pagewrap')}
        >
          Drawer content
        </BpkDrawer>
      </div>,
    );
    expect(screen.getByText('Drawer content')).toBeVisible();
  });
});
