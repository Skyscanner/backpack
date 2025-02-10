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
import { type ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import * as STYLES from './BpkDescriptionList.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: ReactNode | string;
  className?: string;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

export default ({ children, className, ...rest }: Props) => (
  <dl
    className={[getClassName('bpk-description-list'), className]
      .filter((x) => x) // inline drops the className if undefined
      .join(' ')}
    {...rest}
  >
    {children}
  </dl>
);
