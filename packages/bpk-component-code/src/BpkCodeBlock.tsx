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

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkCodeBlock.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: ReactNode;
  alternate?: boolean;
  className?: string;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const BpkCodeBlock = ({
  alternate = false,
  children,
  className,
  ...rest
}: Props) => {
  const preClassNames = getClassName(
    'bpk-code__pre',
    alternate && 'bpk-code__pre--alternate',
    className,
  );

  const codeClassNames = getClassName('bpk-code', 'bpk-code--block');

  return (
    <pre className={preClassNames} {...getDataComponentAttribute('CodeBlock')} {...rest}>
      <code className={codeClassNames}>{children}</code>
    </pre>
  );
};

export default BpkCodeBlock;