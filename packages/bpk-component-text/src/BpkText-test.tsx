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

import '@testing-library/jest-dom';

import { textSecondaryDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkText, { TEXT_COLORS } from './BpkText';

import type { Tag, TextStyle } from './BpkText';

describe('BpkText', () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

  it('should render correctly', () => {
    const { getByText } = render(<BpkText>{text}</BpkText>);

    expect(getByText(text)).toHaveClass('bpk-text bpk-text--body-default');
  });

  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tagName) => {
    it(`should render correctly with tagName="${tagName}"`, () => {
      const { getByRole } = render(
        <BpkText tagName={tagName as Tag} textStyle="xxl">
          {text}
        </BpkText>,
      );

      expect(getByRole('heading')).toHaveClass('bpk-text bpk-text--xxl');
    });
  });

  it('should render correctly with tagName="text"', () => {
    const { getByText } = render(<BpkText tagName="text">{text}</BpkText>);

    expect(getByText(text)).toHaveClass('bpk-text bpk-text--body-default');
  });

  it('should render correctly with tagName="span"', () => {
    const { getByText } = render(<BpkText tagName="span">{text}</BpkText>);

    expect(getByText(text)).toHaveClass('bpk-text bpk-text--body-default');
    expect(getByText(text)).toBeInstanceOf(HTMLSpanElement);
  });

  it('should render correctly with tagName="p"', () => {
    const { getByText } = render(<BpkText tagName="p">{text}</BpkText>);

    expect(getByText(text)).toHaveClass('bpk-text bpk-text--body-default');
    expect(getByText(text)).toBeInstanceOf(HTMLParagraphElement);
  });

  it('should pass down unknown props', () => {
    const { getByText } = render(
      // eslint-disable-next-line backpack/use-tokens
      <BpkText style={{ backgroundColor: 'red' }}>{text}</BpkText>,
    );

    expect(getByText(text)).toHaveClass('bpk-text bpk-text--body-default');
    expect(getByText(text)).toHaveAttribute('style', 'background-color: red;');
  });

  ['xs', 'sm', 'base', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'].forEach(
    (textStyle) => {
      it(`should render correctly with textStyle="${textStyle}"`, () => {
        const { getByText } = render(
          <BpkText textStyle={textStyle as TextStyle}>{text}</BpkText>,
        );

        expect(getByText(text)).toHaveClass(`bpk-text bpk-text--${textStyle}`);
      });
    },
  );

  ['editorial1', 'editorial2', 'editorial3'].forEach((textStyle) => {
    it(`should render correctly with textStyle="${textStyle}"`, () => {
      const { getByText } = render(
        <BpkText textStyle={textStyle as TextStyle}>{text}</BpkText>,
      );

      expect(getByText(text)).toHaveClass(`bpk-text bpk-text--${textStyle}`);
    });
  });

  it('should render correctly with prop color is token textSecondary', () => {
    const { getByText } = render(
      <BpkText color={TEXT_COLORS.textSecondary}>{text}</BpkText>,
    );

    expect(getByText(text)).toHaveClass(
      `bpk-text bpk-text--body-default bpk-text--textSecondary`,
    );
  });

  it('should render correctly with prop color is invalid', () => {
    // @ts-expect-error Type '"invalid"' is not assignable to type 'TextColor | null | undefined'.
    const { getByText } = render(<BpkText color="invalid">{text}</BpkText>);

    expect(getByText(text)).toHaveClass('bpk-text bpk-text--body-default');
    expect(getByText(text)).not.toHaveAttribute('style');
  });

  it('should render correctly with prop color with className', () => {
    const { getByText } = render(
      <BpkText color={TEXT_COLORS.textSecondary} className="test-classname">
        {text}
      </BpkText>,
    );

    expect(getByText(text)).toHaveClass(
      `bpk-text bpk-text--body-default bpk-text--textSecondary test-classname`,
    );
  });
});
