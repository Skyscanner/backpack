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

import { fireEvent, render, within } from '@testing-library/react';

import BpkDrawer from './BpkDrawer';

describe('BpkDrawer', () => {
  it('should render correctly in the given target if renderTarget is supplied', () => {
    const customRenderTarget = document.createElement('div');

    render(
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
        containerClassName='test-class'
      >
        Drawer content
      </BpkDrawer>,
    );
    const drawer = customRenderTarget.querySelector('#my-drawer');
    expect(drawer).not.toBeNull();
    // containerClassName is not applied to the drawer itself,
    // but to the container element: withScrim.
    expect(drawer?.classList.contains('test-class')).toBe(false);

  });

  it('should not render secondary panel content when secondaryPanel.isOpen is false', () => {
    const customRenderTarget = document.createElement('div');

    render(
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
        secondaryPanel={{
          isOpen: false,
          onClose: jest.fn(),
          children: <div>Secondary content</div>,
        }}
      >
        Primary content
      </BpkDrawer>,
    );

    expect(customRenderTarget.querySelector('[data-testid="secondary-panel"]')).toBeNull();
  });

  it('should render secondary panel content when secondaryPanel.isOpen is true', () => {
    const customRenderTarget = document.createElement('div');

    render(
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
        secondaryPanel={{
          isOpen: true,
          onClose: jest.fn(),
          children: <div>Secondary content</div>,
        }}
      >
        Primary content
      </BpkDrawer>,
    );

    expect(customRenderTarget.querySelector('[data-testid="secondary-panel"]')).not.toBeNull();
    expect(customRenderTarget.textContent).toContain('Secondary content');
  });

  it('should call secondaryPanel.onClose when the secondary close button is clicked', () => {
    const customRenderTarget = document.createElement('div');
    const onSecondaryClose = jest.fn();

    render(
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
        secondaryPanel={{
          isOpen: true,
          onClose: onSecondaryClose,
          children: <div>Secondary content</div>,
          closeLabel: 'Close secondary panel',
        }}
      >
        Primary content
      </BpkDrawer>,
    );

    fireEvent.click(within(customRenderTarget).getByRole('button', { name: 'Close secondary panel' }));

    expect(onSecondaryClose).toHaveBeenCalledTimes(1);
  });
});
