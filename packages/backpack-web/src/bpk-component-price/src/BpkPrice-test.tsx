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

import NewWindowIcon from '../../bpk-component-icon/sm/new-window';

import BpkPrice, { type Props as BpkPriceProps } from './BpkPrice';
import { ALIGNS, SIZES } from './common-types';

const price = '£1,830';
const previousPrice = '£2,000';
const leadingText = 'from';
const trailingText = 'per day';
const separator = String.fromCodePoint(67871);

const priceTextClassBySize = {
  [SIZES.xsmall]: 'bpk-text--heading-5',
  [SIZES.small]: 'bpk-text--heading-4',
  [SIZES.medium]: 'bpk-text--heading-3',
  [SIZES.large]: 'bpk-text--xxl',
} as const;

const defaultTextClassBySize = {
  [SIZES.xsmall]: 'bpk-text--xs',
  [SIZES.small]: 'bpk-text--xs',
  [SIZES.medium]: 'bpk-text--xs',
  [SIZES.large]: 'bpk-text--sm',
} as const;

let props: BpkPriceProps;

describe.each([
  [SIZES.xsmall, ALIGNS.left],
  [SIZES.small, ALIGNS.left],
  [SIZES.medium, ALIGNS.left],
  [SIZES.large, ALIGNS.left],
  [SIZES.xsmall, ALIGNS.right],
  [SIZES.small, ALIGNS.right],
  [SIZES.medium, ALIGNS.right],
  [SIZES.large, ALIGNS.right],
])(`%s %s view`, (size, align) => {
  const isAlignRight = align === ALIGNS.right;
  const expectedPriceClass = priceTextClassBySize[size];
  const expectedDefaultClass = defaultTextClassBySize[size];

  beforeEach(() => {
    props = {
      price,
      size,
      align,
    };
  });

  it('should render the price with the size-appropriate text style', () => {
    const { container } = render(<BpkPrice {...props} />);

    const root = container.querySelector('.bpk-price');
    expect(root).toBeInTheDocument();
    expect(root!.classList.contains('bpk-price--right')).toBe(isAlignRight);
    expect(screen.getByText(price)).toHaveClass(expectedPriceClass);
  });

  it('should render the trailing text with the size-appropriate text style', () => {
    const { container } = render(
      <BpkPrice {...props} trailingText={trailingText} />,
    );

    const trailing = container.querySelector('.bpk-price__trailing');
    expect(trailing).toHaveTextContent(trailingText);
    // Right-aligned trailing text appears on a new line (block element);
    // left-aligned trailing text is inline.
    expect(trailing!.tagName).toBe(isAlignRight ? 'DIV' : 'SPAN');
    expect(screen.getByText(trailingText)).toHaveClass(expectedDefaultClass);
  });

  it('should render the leading text without separator when no previous price', () => {
    render(<BpkPrice {...props} leadingText={leadingText} />);

    expect(screen.getByText(leadingText)).toHaveClass(expectedDefaultClass);
    expect(screen.queryByText(separator)).not.toBeInTheDocument();
  });

  it('should render the previous price', () => {
    const { container } = render(
      <BpkPrice
        {...props}
        previousPrice={previousPrice}
        trailingText={trailingText}
      />,
    );

    const previous = container.querySelector('.bpk-price__previous-price');
    expect(previous).toHaveTextContent(previousPrice);
    expect(screen.getByText(previousPrice)).toHaveClass(expectedDefaultClass);
  });

  it('should render previous price and leading text separated by a separator', () => {
    const { container } = render(
      <BpkPrice
        {...props}
        previousPrice={previousPrice}
        leadingText={leadingText}
        trailingText={trailingText}
      />,
    );

    expect(screen.getByText(previousPrice)).toBeInTheDocument();
    expect(screen.getByText(leadingText)).toBeInTheDocument();
    expect(container.querySelector('.bpk-price__separator')).toHaveTextContent(
      separator,
    );
  });

  it('should append data-price-your-pick to price element when pass dataAttributes', () => {
    render(
      <BpkPrice
        {...props}
        previousPrice={previousPrice}
        leadingText={leadingText}
        trailingText={trailingText}
        dataAttributes={{ 'data-price-your-pick': 'true' }}
      />,
    );

    expect(screen.getByText(price)).toHaveAttribute(
      'data-price-your-pick',
      'true',
    );
  });

  it('should render the icon inside the icon wrapper when supplied', () => {
    const { container } = render(
      <BpkPrice
        {...props}
        previousPrice={previousPrice}
        leadingText={leadingText}
        trailingText={trailingText}
        icon={<NewWindowIcon />}
      />,
    );

    const iconWrapper = container.querySelector('.bpk-price__icon');
    expect(iconWrapper).toBeInTheDocument();
    expect(iconWrapper!.querySelector('svg')).toBeInTheDocument();
  });

  it('should append the custom className to the root element', () => {
    const { container } = render(
      <BpkPrice {...props} className="custom-classname" />,
    );

    expect(container.querySelector('.bpk-price')).toHaveClass(
      'custom-classname',
    );
  });

  it('should append the custom leading className to the leading container', () => {
    const { container } = render(
      <BpkPrice {...props} leadingClassName="leading-classname" />,
    );

    expect(
      container.querySelector('.leading-classname'),
    ).toBeInTheDocument();
  });
});
