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

import STYLES from './BpkCard.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: ReactNode | string;
  className?: string | null;
  href?: string | null;
  padded?: boolean;
  blank?: boolean;
  atomic?: boolean;
  [rest: string]: any;
};

const BpkCard = ({
  atomic = true,
  blank = false,
  children,
  className = null,
  href = null,
  padded = true,
  ...rest
}: Props) => {
  const classNames = getClassName(
    'bpk-card',
    atomic && !href && 'bpk-card--atomic-button',
    padded && 'bpk-card--padded',
    className,
  );

  const atomicProps: { tabIndex?: number; role?: string } = {};

  if (href) {
    let blankProps = {};

    if (blank) {
      blankProps = { target: '_blank', rel: 'noopener noreferrer' };
    }

    // If the link is non-atomic, disable keyboard focus and make the screen-reader ignore the outer element.
    if (!atomic) {
      atomicProps.tabIndex = -1;
      atomicProps.role = 'group';
    }

    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <a
        href={href}
        className={classNames}
        {...atomicProps}
        {...blankProps}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (atomic) {
    return (
      <button type="button" className={classNames} {...rest}>
        {children}
      </button>
    );
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export default BpkCard;
