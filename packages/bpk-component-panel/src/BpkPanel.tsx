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
import type { ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkPanel.module.scss';


const getClassName = cssModules(STYLES);

export type Props = {
  children: ReactNode;
  padded?: boolean,
  fullWidth?: boolean,
  className?: string | null,
  keyline?: boolean,
  [rest: string]: any;
};


const BpkPanel = ({
  children,
  className = null,
  fullWidth = false,
  keyline = true,
  padded = true,
  ...rest
}: Props) => {
  const classNames = [getClassName('bpk-panel')];

  if (padded) {
    classNames.push(getClassName('bpk-panel--padded'));
  }
  if (fullWidth) {
    classNames.push(getClassName('bpk-panel--full-width'));
  }
  if (keyline) {
    if (fullWidth) {
      classNames.push(getClassName('bpk-panel--full-width-keyline'));
    } else {
      classNames.push(getClassName('bpk-panel--keyline'));
    }
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <section className={classNames.join(' ')} data-backpack-ds-component="Panel" {...rest}>
      {children}
    </section>
  );
};

export default BpkPanel;
