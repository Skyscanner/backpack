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

import BpkDrawerContent from './BpkDrawerContent';

jest.mock(
  'react-transition-group/Transition',
  () =>
    // @ts-ignore - This is a mock for a 3rd party lib
    ({ children }) =>
      children('entered'),
);

describe('BpkDrawerContent', () => {
  it('should render correctly', () => {
    render(
      <BpkDrawerContent
        id="my-drawer"
        title="Drawer title"
        onClose={jest.fn()}
        onCloseAnimationComplete={jest.fn()}
        closeLabel="Close"
        dialogRef={jest.fn()}
      >
        Drawer content
      </BpkDrawerContent>,
    );
    expect(screen.getByText('Drawer content')).toBeVisible();
  });

  it('should render correctly when it has a contentClassName', () => {
    render(
      <BpkDrawerContent
        id="my-drawer"
        contentClassName="my-classname"
        title="Drawer title"
        onClose={jest.fn()}
        onCloseAnimationComplete={jest.fn()}
        closeLabel="Close"
        dialogRef={jest.fn()}
      >
        Drawer content
      </BpkDrawerContent>,
    );
    expect(screen.getByText('Drawer content')).toBeVisible();
    expect(document.getElementsByClassName('bpk-drawer__content my-classname')[0]).toBeInTheDocument();
  });

  it('should render correctly with hideTitle', () => {
    render(
      <BpkDrawerContent
        id="my-drawer"
        title="Drawer title"
        onClose={jest.fn()}
        onCloseAnimationComplete={jest.fn()}
        closeLabel="Close"
        dialogRef={jest.fn()}
        hideTitle
      >
        Drawer content
      </BpkDrawerContent>,
    );
    expect(screen.getByText('Drawer content')).toBeVisible();
    expect(document.getElementsByClassName('bpk-drawer__heading bpk-drawer__heading--visually-hidden')[0]).toBeInTheDocument();
  });

  it('should render correctly with arbitrary attributes', () => {
    render(
      <BpkDrawerContent
        id="my-drawer"
        title="Drawer title"
        onClose={jest.fn()}
        onCloseAnimationComplete={jest.fn()}
        closeLabel="Close"
        dialogRef={jest.fn()}
        data-arbitrary="prop"
      >
        Drawer content
      </BpkDrawerContent>,
    );
    const find = document.querySelector('[data-arbitrary="prop"]');
    expect(find).toBeInTheDocument();
  });
});
