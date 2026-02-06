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

import type { ChangeEvent, ReactElement, ReactNode } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import {
  CHECKBOX_CARD_VARIANTS,
  type CheckboxCardVariant,
  CHECKBOX_CARD_RADIUS,
  type CheckboxCardRadius,
} from './common-types';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

// Sub-component prop types
type CheckboxCardImageProps = {
  src: string;
  alt?: string;
};

type CheckboxCardLabelProps = {
  children: string;
};

type CheckboxCardDescriptionProps = {
  children: ReactNode;
};

type CheckboxCardTextProps = {
  children: ReactNode;
};

type CheckboxCardPriceProps = {
  children: ReactNode;
};

type CheckboxCardIconProps = {
  children: ReactElement;
};

type CheckboxCardStackProps = {
  children: ReactNode;
  space?: 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
};

type CheckboxCardInlineProps = {
  children: ReactNode;
  space?: 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
};

type BpkCheckboxCardProps = {
  /**
   * Whether the checkbox card is selected
   */
  checked: boolean;

  /**
   * Callback invoked when selection state changes
   * @param checked - New checked state
   * @param event - Change event from input element
   */
  onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Primary text label displayed on the card
   */
  label?: string;

  /**
   * Secondary descriptive text displayed below the label
   */
  description?: string;

  /**
   * Backpack icon component to display
   */
  icon?: ReactElement;

  /**
   * Image URL or React image element to display
   */
  image?: string | ReactElement;

  /**
   * Price information - accepts BpkPrice component or formatted string
   */
  price?: ReactElement | string;

  /**
   * Optional indicator badge or marker to display when selected
   */
  indicator?: ReactElement;

  /**
   * Whether the card is disabled and non-interactive
   * @default false
   */
  disabled?: boolean;

  /**
   * Visual variant based on canvas/surface background
   * - onCanvasDefault: For use on default/white backgrounds (selected: dark blue #05203C)
   * - onCanvasContrast: For use on contrast/colored backgrounds (selected: dark blue #05203C)
   * - onSurfaceContrast: For use on contrast surfaces (selected: accent blue #0062E3)
   * @default 'onCanvasDefault'
   */
  variant?: CheckboxCardVariant;

  /**
   * Border radius style
   * @default 'rounded'
   */
  radius?: CheckboxCardRadius;

  /**
   * Accessible label for screen readers
   * Required if no label prop provided
   */
  ariaLabel?: string;

  /**
   * Name attribute for grouping checkbox cards in forms
   */
  name?: string;

  /**
   * Value attribute for form submission
   */
  value?: string;

  /**
   * Children for composable API (optional)
   * When provided, takes precedence over props-based API (label, image, price, etc.)
   */
  children?: ReactNode;

  /**
   * Custom width for the card
   * Accepts CSS values (e.g., "200px", "100%", "auto") or numeric pixel values
   */
  width?: string | number;

  /**
   * Custom height for the card
   * Accepts CSS values (e.g., "150px", "auto") or numeric pixel values
   */
  height?: string | number;

  /**
   * Internal content layout orientation
   * @default "vertical"
   */
  layout?: 'vertical' | 'horizontal' | 'custom';

  /**
   * Additional HTML attributes to spread on the input element
   */
  [key: string]: any;
};

// Sub-components for composable API
const CheckboxCardImage = ({ alt = '', src }: CheckboxCardImageProps) => {
  const imageClassNames = getClassName('bpk-checkbox-card__image');
  return (
    <div className={imageClassNames}>
      <img src={src} alt={alt} />
    </div>
  );
};

const CheckboxCardLabel = ({ children }: CheckboxCardLabelProps) => {
  const labelClassNames = getClassName('bpk-checkbox-card__label');
  return <span className={labelClassNames}>{children}</span>;
};

const CheckboxCardDescription = ({ children }: CheckboxCardDescriptionProps) => {
  const descriptionClassNames = getClassName('bpk-checkbox-card__description');
  return <span className={descriptionClassNames}>{children}</span>;
};

const CheckboxCardText = ({ children }: CheckboxCardTextProps) => {
  const textClassNames = getClassName('bpk-checkbox-card__text');
  return <div className={textClassNames}>{children}</div>;
};

const CheckboxCardPrice = ({ children }: CheckboxCardPriceProps) => {
  const priceClassNames = getClassName('bpk-checkbox-card__price');
  return <div className={priceClassNames}>{children}</div>;
};

const CheckboxCardIcon = ({ children }: CheckboxCardIconProps) => {
  const iconClassNames = getClassName('bpk-checkbox-card__icon');
  return <div className={iconClassNames}>{children}</div>;
};

// Layout primitive components
const CheckboxCardStack = ({ alignItems = 'center', children, space = 'md' }: CheckboxCardStackProps) => {
  const stackClassNames = getClassName(
    'bpk-checkbox-card__stack',
    `bpk-checkbox-card__stack--space-${space}`,
    `bpk-checkbox-card__stack--align-${alignItems.replace('flex-', '')}`
  );
  return <div className={stackClassNames}>{children}</div>;
};

const CheckboxCardInline = ({ alignItems = 'center', children, space = 'md' }: CheckboxCardInlineProps) => {
  const inlineClassNames = getClassName(
    'bpk-checkbox-card__inline',
    `bpk-checkbox-card__inline--space-${space}`,
    `bpk-checkbox-card__inline--align-${alignItems.replace('flex-', '')}`
  );
  return <div className={inlineClassNames}>{children}</div>;
};

/**
 * BpkCheckboxCard is a selectable card component combining checkbox functionality
 * with rich content presentation including icons, images, labels, and prices.
 *
 * Supports two API modes:
 * 1. Props-based API (backward compatible)
 * 2. Composable API using sub-components
 *
 * Supports radius variants (square/rounded) and canvas style variants.
 * Commonly used across Hotels, Flights, and Car Hire for presenting search options.
 *
 * @param {BpkCheckboxCardProps} props - Component props
 * @returns {JSX.Element} The rendered checkbox card component
 *
 * @example Props-based API
 * <BpkCheckboxCard
 *   checked={selected}
 *   onChange={(checked) => setSelected(checked)}
 *   label="City Centre"
 *   price="£85"
 *   variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
 * />
 *
 * @example Composable API
 * <BpkCheckboxCard checked={selected} onChange={...}>
 *   <BpkCheckboxCard.Image src="url" />
 *   <BpkCheckboxCard.Text>
 *     <BpkCheckboxCard.Label>Car type</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Text>
 *   <BpkCheckboxCard.Price>from £74</BpkCheckboxCard.Price>
 * </BpkCheckboxCard>
 */
const BpkCheckboxCard = ({
  ariaLabel,
  checked,
  children,
  description,
  disabled = false,
  height,
  icon,
  image,
  indicator,
  label,
  layout = 'vertical',
  name,
  onChange,
  price,
  radius = CHECKBOX_CARD_RADIUS.rounded,
  value,
  variant = CHECKBOX_CARD_VARIANTS.onCanvasDefault,
  width,
  ...rest
}: BpkCheckboxCardProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked, event);
    }
  };

  const classNames = getClassName(
    'bpk-checkbox-card',
    variant === CHECKBOX_CARD_VARIANTS.onCanvasDefault &&
      'bpk-checkbox-card--on-canvas-default',
    variant === CHECKBOX_CARD_VARIANTS.onCanvasContrast &&
      'bpk-checkbox-card--on-canvas-contrast',
    variant === CHECKBOX_CARD_VARIANTS.onSurfaceContrast &&
      'bpk-checkbox-card--on-surface-contrast',
    radius === CHECKBOX_CARD_RADIUS.square && 'bpk-checkbox-card--square',
    radius === CHECKBOX_CARD_RADIUS.rounded && 'bpk-checkbox-card--rounded',
    checked && 'bpk-checkbox-card--checked',
    disabled && 'bpk-checkbox-card--disabled',
    checked && disabled && 'bpk-checkbox-card--checked--disabled',
    layout === 'vertical' && 'bpk-checkbox-card--layout-vertical',
    layout === 'horizontal' && 'bpk-checkbox-card--layout-horizontal',
    layout === 'custom' && 'bpk-checkbox-card--layout-custom',
  );

  // Calculate custom sizing styles
  const customStyles: React.CSSProperties = {};
  if (width !== undefined) {
    customStyles.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    customStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  const inputClassNames = getClassName('bpk-checkbox-card__input');
  const contentClassNames = getClassName('bpk-checkbox-card__content');
  const iconClassNames = getClassName('bpk-checkbox-card__icon');
  const imageClassNames = getClassName('bpk-checkbox-card__image');
  const textClassNames = getClassName('bpk-checkbox-card__text');
  const labelClassNames = getClassName('bpk-checkbox-card__label');
  const descriptionClassNames = getClassName('bpk-checkbox-card__description');
  const priceClassNames = getClassName('bpk-checkbox-card__price');
  const indicatorClassNames = getClassName('bpk-checkbox-card__indicator');

  // Determine which mode to use
  const usePropsMode = !children && (label || image || price || icon);

  // Development warning for missing accessibility label
  if (process.env.NODE_ENV === 'development') {
    if (!ariaLabel && !label && !children) {
      // eslint-disable-next-line no-console
      console.warn(
        'BpkCheckboxCard: Either "label", "ariaLabel" prop, or children must be provided for accessibility',
      );
    }
  }

  return (
    <label className={classNames} style={Object.keys(customStyles).length > 0 ? customStyles : undefined}>
      <input
        type="checkbox"
        className={inputClassNames}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
        aria-checked={checked}
        aria-disabled={disabled}
        {...rest}
      />
      <div className={contentClassNames}>
        {usePropsMode ? (
          // Props-based API (backward compatible)
          <>
            {icon && <div className={iconClassNames}>{icon}</div>}
            {image && (
              <div className={imageClassNames}>
                {typeof image === 'string' ? <img src={image} alt="" /> : image}
              </div>
            )}
            <div className={textClassNames}>
              {label && <span className={labelClassNames}>{label}</span>}
              {description && (
                <span className={descriptionClassNames}>{description}</span>
              )}
            </div>
            {price && <div className={priceClassNames}>{price}</div>}
            {checked && indicator && (
              <div className={indicatorClassNames}>{indicator}</div>
            )}
          </>
        ) : (
          // Composable API (new)
          <>
            {children}
            {checked && indicator && (
              <div className={indicatorClassNames}>{indicator}</div>
            )}
          </>
        )}
      </div>
    </label>
  );
};

// Attach sub-components to main component
BpkCheckboxCard.Image = CheckboxCardImage;
BpkCheckboxCard.Label = CheckboxCardLabel;
BpkCheckboxCard.Description = CheckboxCardDescription;
BpkCheckboxCard.Text = CheckboxCardText;
BpkCheckboxCard.Price = CheckboxCardPrice;
BpkCheckboxCard.Icon = CheckboxCardIcon;
BpkCheckboxCard.Stack = CheckboxCardStack;
BpkCheckboxCard.Inline = CheckboxCardInline;

export default BpkCheckboxCard;
export { CHECKBOX_CARD_VARIANTS, type CheckboxCardVariant, CHECKBOX_CARD_RADIUS, type CheckboxCardRadius };
export type {
  BpkCheckboxCardProps,
  CheckboxCardImageProps,
  CheckboxCardLabelProps,
  CheckboxCardDescriptionProps,
  CheckboxCardTextProps,
  CheckboxCardPriceProps,
  CheckboxCardIconProps,
  CheckboxCardStackProps,
  CheckboxCardInlineProps,
};
