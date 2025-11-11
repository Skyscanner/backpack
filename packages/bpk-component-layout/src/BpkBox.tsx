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

import type { ElementType, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkBox.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children?: ReactNode;
  className?: string | null;
  as?: ElementType;
  [rest: string]: any;
};

/**
 * BpkBox is a layout component that provides a flexible container using Chakra UI's Box component.
 * It follows the facade pattern, wrapping Chakra UI's Box to provide a Backpack-specific API.
 *
 * @example
 * ```tsx
 * <BpkBox padding="md" margin="lg">
 *   Content here
 * </BpkBox>
 * ```
 */
const BpkBox = ({
  children,
  className = null,
  as,
  ...rest
}: Props) => {
  const classNames = [getClassName('bpk-box')];

  if (className) {
    classNames.push(className);
  }

  return (
    <Box
      className={classNames.join(' ')}
      as={as}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default BpkBox;

