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

import { createContext } from 'react';
import type { ReactNode } from 'react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkAccordion.module.scss';

const getClassName = cssModules(STYLES);

export type BpkAccordionProps = {
  children: ReactNode;
  className?: string;
  divider?: boolean;
  onDark?: boolean;
};

export const BpkAccordionContext = createContext({
  onDark: false,
  divider: true,
});

const BpkAccordion = (props: BpkAccordionProps) => {
  const {
    children,
    className,
    divider = true,
    onDark = false,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpk-accordion',
    onDark && 'bpk-accordion--on-dark',
    className,
  );

  return (
    <BpkAccordionContext.Provider value={{ onDark, divider }}>
      <div
        className={classNames}
        {...getDataComponentAttribute('Accordion')}
        {...rest}
      >
        {children}
      </div>
    </BpkAccordionContext.Provider>
  );
};

export default BpkAccordion;