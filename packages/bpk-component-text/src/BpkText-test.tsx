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

import { render } from '@testing-library/react';

import type { TextStyle } from './BpkText';
import BpkText from './BpkText';

describe('BpkText', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with tageName="h1", textStyle="xxl"', () => {
    const { asFragment } = render(
      <BpkText textStyle="xxl" tagName="h1">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with tageName="text"', () => {
    const { asFragment } = render(
      <BpkText tagName="text">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should pass down unknown props', () => {
    const { asFragment } = render(
      // eslint-disable-next-line backpack/use-tokens
      <BpkText style={{ color: 'red' }}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  ['xs', 'sm', 'base', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'].forEach(
    (textStyle) => {
      it(`should render correctly with textStyle="${textStyle}"`, () => {
        const { asFragment } = render(
          <BpkText textStyle={textStyle as TextStyle}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        );
        expect(asFragment()).toMatchSnapshot();
      });
    },
  );
});
