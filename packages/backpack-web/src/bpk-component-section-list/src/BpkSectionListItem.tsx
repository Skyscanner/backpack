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

import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';

import { withRtlSupport } from '../../bpk-component-icon';
import BpkLargeChevronRightIcon from '../../bpk-component-icon/lg/chevron-right';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSectionListItem.module.scss';

const BpkLargeChevronRightIconWithRtlSupport = withRtlSupport(
  BpkLargeChevronRightIcon,
);

const getClassName = cssModules(STYLES);

export type Props = Omit<HTMLAttributes<HTMLElement>, 'onClick' | 'className'> & {
  blank?: boolean;
  children: ReactNode;
  className?: string | null;
  href?: string | null;
  onClick?: ((event: MouseEvent<HTMLElement>) => void) | null;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const BpkSectionListItem = ({
  blank = false,
  children,
  className = null,
  href = null,
  onClick = null,
  ...rest
}: Props) => {
  const classNames = [
    getClassName(
      'bpk-section-list-item',
      (href || onClick) && 'bpk-section-list-item--interactive',
      className,
    ),
  ];

  if (href) {
    const target = blank ? '_blank' : undefined;
    return (
      <a
        href={href}
        target={target}
        onClick={onClick ?? undefined}
        className={classNames.join(' ')}
        {...rest}
      >
        {children}
        <span className={getClassName('bpk-section-list-item__chevron')}>
          <BpkLargeChevronRightIconWithRtlSupport />
        </span>
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames.join(' ')}
        {...rest}
      >
        {children}
        <span className={getClassName('bpk-section-list-item__chevron')}>
          <BpkLargeChevronRightIconWithRtlSupport />
        </span>
      </button>
    );
  }

  return (
    <div className={classNames.join(' ')} {...rest}>
      {children}
    </div>
  );
};

export default BpkSectionListItem;
