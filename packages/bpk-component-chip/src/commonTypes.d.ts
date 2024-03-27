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

import type PropTypes from 'prop-types';
import type { ComponentProps, ReactNode, SyntheticEvent } from 'react';

export declare const CHIP_TYPES: {
  readonly default: 'default';
  readonly onDark: 'on-dark';
  readonly onImage: 'on-image';
};
interface ButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void | null;
  children?: ReactNode | string;
  type?: typeof CHIP_TYPES[keyof typeof CHIP_TYPES];
}
export interface CommonProps extends ButtonProps {
  accessibilityLabel: string;
  disabled?: boolean;
  selected?: boolean;
  leadingAccessoryView?: ReactNode;
}
export declare const COMMON_PROP_TYPES: {
  accessibilityLabel: PropTypes.Validator<string>;
  children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
  onClick: PropTypes.Validator<(...args: any[]) => any>;
  className: PropTypes.Requireable<string>;
  disabled: PropTypes.Requireable<boolean>;
  leadingAccessoryView: PropTypes.Requireable<PropTypes.ReactNodeLike>;
  selected: PropTypes.Requireable<boolean>;
  trailingAccessoryView: PropTypes.Requireable<PropTypes.ReactNodeLike>;
  type: PropTypes.Requireable<'default' | 'on-dark' | 'on-image'>;
};
export declare const COMMON_DEFAULT_PROPS: {
  disabled: boolean;
  leadingAccessoryView: null;
  selected: boolean;
  trailingAccessoryView: null;
  type: 'default';
};
export {};
