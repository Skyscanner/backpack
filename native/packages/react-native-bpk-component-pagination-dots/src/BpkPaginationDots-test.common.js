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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkPaginationDots from './BpkPaginationDots';

const commonTests = () => {
  describe('BpkPaginationDots', () => {
    // Using 10 as an arbitrary high number to test lots of permutations.
    const NUM_OF_PERMUTATIONS_TO_TEST = 10;
    new Array(NUM_OF_PERMUTATIONS_TO_TEST).fill().forEach((_, pageCount) => {
      new Array(NUM_OF_PERMUTATIONS_TO_TEST)
        .fill()
        .forEach((blank, selectedIndex) => {
          it(`should render correctly when pageCount is ${pageCount +
            1} and selectedIndex is ${selectedIndex}`, () => {
            const tree = renderer
              .create(
                <BpkPaginationDots
                  accessibilityLabel={`${selectedIndex} of ${pageCount + 1}`}
                  pageCount={pageCount + 1}
                  selectedIndex={selectedIndex}
                />,
              )
              .toJSON();
            expect(tree).toMatchSnapshot();
          });
        });
    });

    it(`should render correctly with custom styles`, () => {
      const tree = renderer
        .create(
          <BpkPaginationDots
            accessibilityLabel="0 of 5"
            pageCount={5}
            selectedIndex={0}
            style={{ marginTop: 10 }}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it(`should render correctly when accessibilityLabel is a function`, () => {
      const accessibilityLabel = (pageCount, selectedIndex) =>
        `Page ${pageCount} of ${selectedIndex}`;
      const tree = renderer
        .create(
          <BpkPaginationDots
            accessibilityLabel={accessibilityLabel}
            pageCount={5}
            selectedIndex={0}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it(`should render correctly with arbitrary props`, () => {
      const tree = renderer
        .create(
          <BpkPaginationDots
            accessibilityLabel="0 of 5"
            pageCount={5}
            selectedIndex={0}
            testID="123" // Arbitrary prop.
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
