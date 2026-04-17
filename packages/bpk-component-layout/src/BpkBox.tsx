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

import { forwardRef } from 'react';

import { Box } from '@chakra-ui/react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { processBpkComponentProps } from './tokenUtils';

import type { BpkBoxProps } from './types';

import STYLES from './BpkLayout.module.scss';


const getClassName = cssModules(STYLES);

// A general-purpose layout primitive that renders a styled container element.
// Built on Chakra UI's Box and supports Backpack spacing, colour, and border tokens via style props.
export const BpkBox = forwardRef<HTMLDivElement, BpkBoxProps>(
  ({ backgroundColor, children, color, ...props }, ref) => {
    const processedProps = processBpkComponentProps(props, { component: 'BpkBox' });
    const classNames = (color || backgroundColor)
      ? getClassName(
          'bpk-layout',
          color ? `bpk-layout--${color}` : '',
          backgroundColor ? `bpk-layout--${backgroundColor}` : '',
        )
      : undefined;
    return (
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      <Box ref={ref} className={classNames} {...getDataComponentAttribute('Box')} {...processedProps}>
        {children}
      </Box>
    );
  },
);

BpkBox.displayName = 'BpkBox';

export type { BpkBoxProps };
