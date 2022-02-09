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

/* @flow strict */

import React from 'react';
import { render } from '@testing-library/react';

import BpkText, { WEIGHT_STYLES } from './BpkText';

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

  it('should render correctly with deprecated `bold` prop', () => {
    const consoleWarnFn = jest.fn();
    jest.spyOn(console, 'warn').mockImplementation(consoleWarnFn);
    const { asFragment } = render(
      <BpkText bold>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(consoleWarnFn.mock.calls.length).toBe(1);
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

  it('should render correctly with weight="bold"', () => {
    const { asFragment } = render(
      <BpkText weight={WEIGHT_STYLES.bold}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  ['xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'].forEach((textStyle) => {
    it(`should render correctly with weight="black" and supported textStyle="${textStyle}"`, () => {
      const { asFragment } = render(
        <BpkText textStyle={textStyle} weight={WEIGHT_STYLES.black}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should not apply black styles when weight="black" and not an xl textStyle', () => {
    const { asFragment } = render(
      <BpkText weight={WEIGHT_STYLES.black}>
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
          <BpkText textStyle={textStyle}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        );
        expect(asFragment()).toMatchSnapshot();
      });
    },
  );

  it('should render correctly with deprecated `weight` prop', () => {
    const consoleWarnFn = jest.fn();
    jest.spyOn(console, 'warn').mockImplementation(consoleWarnFn);
    const { asFragment } = render(
      <BpkText weight="bold">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(consoleWarnFn.mock.calls.length).toBe(1);
  });

  it('should render correctly with no `weight` prop', () => {
    const consoleWarnFn = jest.fn();
    jest.spyOn(console, 'warn').mockImplementation(consoleWarnFn);
    const { asFragment } = render(
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(consoleWarnFn.mock.calls.length).toBe(0);
  });
});
