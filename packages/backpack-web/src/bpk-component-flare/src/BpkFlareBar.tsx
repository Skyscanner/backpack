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

import type { HTMLAttributes } from 'react';

import { cssModules } from '../../bpk-react-utils';

// @ts-expect-error Generated import. See `decisions/imports-ts-suppressions.md`.
import Pointer from './__generated__/js/pointer';

import STYLES from './bpk-flare-bar.module.scss';

const getClassName = cssModules(STYLES);

type NativeDivProps = HTMLAttributes<HTMLDivElement>;

export type Props = Omit<NativeDivProps, 'className'> & {
  className?: string | null;
  svgClassName?: string | null;
  rounded?: boolean;
};

const BpkFlareBar = ({
  className = null,
  svgClassName = null,
  ...rest
}: Props) => {
  const classNames = [getClassName('bpk-flare-bar__container')];
  if (className) {
    classNames.push(className);
  }

  const curveClassNames = [getClassName('bpk-flare-bar__curve')];

  if (svgClassName) {
    curveClassNames.push(svgClassName);
  }

  return (
    <div className={classNames.join(' ')} {...rest}>
      <Pointer className={curveClassNames.join(' ')} />
    </div>
  );
};

export default BpkFlareBar;
