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
import BpkIcon from './BpkIcon';

const commonTests = () => {
  describe('BpkIcon', () => {
    it('should render correctly', () => {
      const tree = renderer.create(
        <BpkIcon
          iconName="beer"
          color="blue"
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render small icon correctly', () => {
      const tree = renderer.create(
        <BpkIcon
          iconName="beer"
          color="blue"
          small
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should apply user styling', () => {
      const tree = renderer.create(
        <BpkIcon
          iconName="beer"
          color="blue"
          style={{ width: 50 }}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('should apply user props', () => {
    const tree = renderer.create(
      <BpkIcon
        iconName="beer"
        color="blue"
        someExtraProp
      />,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should only accept iconName values which exist in the icon mapping', () => {
    expect(BpkIcon.propTypes.iconName({
      iconName: 'some-icon-that-does-not-exist',
    }, 'iconName', 'BpkIcon').toString()).toEqual('Error: Invalid prop `iconName` supplied to `BpkIcon`. No icon matches the name `some-icon-that-does-not-exist`.'); // eslint-disable-line max-len
  });
};

export default commonTests;
