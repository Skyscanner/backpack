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
// @ts-nocheck

import PropTypes from 'prop-types';
import type { ComponentProps, ReactNode, SyntheticEvent } from 'react';

export const CHIP_TYPES = {
  default: 'default',
  onDark: 'on-dark',
  onImage: 'on-image',
} as const;

// onClick is already part of the button props, but we need to specify that they are required
interface ButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void | null;
  children?: ReactNode | string;
  type?: (typeof CHIP_TYPES)[keyof typeof CHIP_TYPES]; // this is different from the native button type
}
export interface CommonProps extends ButtonProps {
  accessibilityLabel: string;
  disabled?: boolean;
  selected?: boolean;
  leadingAccessoryView?: ReactNode;
  trailingAccessoryView?: ReactNode;
}
