/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkDrawerContent from './BpkDrawerContent';

jest.mock('react-transition-group/Transition', () => ({ children }) => children('entered'));

describe('BpkDrawerContent', () => {
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

  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkDrawerContent
        id="my-drawer"
        title="Drawer title"
        onClose={jest.fn()}
        onCloseAnimationComplete={jest.fn()}
        closeLabel="Close"
        closeEvents={closeEvents}
        dialogRef={jest.fn()}
        isIphone={false}
      >
        Drawer content
      </BpkDrawerContent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when it has a className', () => {
    const tree = renderer.create(
      <BpkDrawerContent
        id="my-drawer"
        className="my-classname"
        title="Drawer title"
        onClose={jest.fn()}
        onCloseAnimationComplete={jest.fn()}
        closeLabel="Close"
        closeEvents={closeEvents}
        dialogRef={jest.fn()}
        isIphone={false}
      >
        Drawer content
      </BpkDrawerContent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when it has a contentClassName', () => {
    const tree = renderer.create(
      <BpkDrawerContent
        id="my-drawer"
        contentClassName="my-classname"
        title="Drawer title"
        onClose={jest.fn()}
        onCloseAnimationComplete={jest.fn()}
        closeLabel="Close"
        closeEvents={closeEvents}
        dialogRef={jest.fn()}
        isIphone={false}
      >
        Drawer content
      </BpkDrawerContent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with hideTitle', () => {
    const tree = renderer.create(
      <BpkDrawerContent
        id="my-drawer"
        title="Drawer title"
        onClose={jest.fn()}
        onCloseAnimationComplete={jest.fn()}
        closeLabel="Close"
        closeEvents={closeEvents}
        dialogRef={jest.fn()}
        hideTitle
      >
        Drawer content
      </BpkDrawerContent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
