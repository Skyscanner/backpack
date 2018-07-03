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
import BpkText from 'react-native-bpk-component-text';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';
import BpkCarousel from './BpkCarousel';
import BpkCarouselItem from './BpkCarouselItem';

const accessibilityLabel = "I'm accessible";

// Manually triggers the onLayout callback with the value provided
const renderWithLayout = (
  component: any,
  layout: { width?: number, height?: number } = {
    width: spacingSm,
    height: spacingSm,
  },
) => {
  const rendered = renderer.create(component);
  const mockNativeEvent = {
    nativeEvent: {
      layout,
    },
  };
  rendered.toJSON().props.onLayout(mockNativeEvent);
  return rendered;
};

const commonTests = () => {
  describe('BpkCarousel', () => {
    it('should render correctly', () => {
      const tree = renderWithLayout(
        <BpkCarousel
          accessibilityLabel={accessibilityLabel}
          style={{ width: spacingSm }}
        >
          <BpkCarouselItem>
            <BpkText>View 1</BpkText>
          </BpkCarouselItem>
        </BpkCarousel>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with an "accessibilityLabel" function', () => {
      const tree = renderWithLayout(
        <BpkCarousel
          accessibilityLabel={(page, total) => `${page} of ${total}`}
        >
          <BpkCarouselItem>
            <BpkText>View 1</BpkText>
          </BpkCarouselItem>
        </BpkCarousel>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly without indicators', () => {
      const tree = renderWithLayout(
        <BpkCarousel
          accessibilityLabel={accessibilityLabel}
          showIndicator={false}
        >
          <BpkCarouselItem>
            <BpkText>View 1</BpkText>
          </BpkCarouselItem>
        </BpkCarousel>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
