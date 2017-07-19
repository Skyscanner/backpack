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
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkInteractiveStarRating from './BpkInteractiveStarRating';
import withInteractiveStarRatingState from './withInteractiveStarRatingState';

const InteractiveStarRating = withInteractiveStarRatingState(BpkInteractiveStarRating);

describe('withInteractiveStarRatingState', () => {
  it('should render correctly', () => {
    const tree = shallow(<InteractiveStarRating id="my-star-rating" getStarLabel={() => 'my-label'} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = shallow(<InteractiveStarRating id="my-star-rating" getStarLabel={() => 'my-label'} large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should have a rating of 3 when onRatingSelect is called with 3', () => {
    const interactiveItem = shallow(<InteractiveStarRating id="my-star-rating" getStarLabel={() => 'my-label'} />);
    interactiveItem.instance().onRatingSelect(3);
    expect(interactiveItem.state('rating')).toBe(3);
  });

  it('should have a hover rating of 4 when onRatingHover is called with 4', () => {
    const interactiveItem = shallow(<InteractiveStarRating id="my-star-rating" getStarLabel={() => 'my-label'} />);

    interactiveItem.instance().onRatingHover(4);
    expect(interactiveItem.state('hoverRating')).toBe(4);

    interactiveItem.instance().onMouseLeave();
    expect(interactiveItem.state('hoverRating')).toBe(0);
  });
});
