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
import BpkStar, { STAR_TYPES } from './BpkStar';

describe('BpkStar', () => {
  it('should render correctly with empty star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.EMPTY} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with half star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.HALF} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with full star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.FULL} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a large empty star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.EMPTY} large />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a large half star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.HALF} large />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a large full star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.FULL} large />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" prop', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.FULL} className="my-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
