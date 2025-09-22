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

import { withRtlSupport } from '../../bpk-component-icon';
import ArrowRight from '../../bpk-component-icon/sm/arrow-right';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkLink from '../../bpk-component-link';
import BpkText from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkBreadcrumbItem.module.scss';

const getClassName = cssModules(STYLES);

export type Props {
  children: ReactNode;
  active?: boolean;
  href?: string;
  className?: string;
  linkProps?: { [key: string]: any };
  [key: string]: any; // Allow arbitrary props to be passed through
}

const RtlSupportedArrowRight = withRtlSupport(ArrowRight);

const BpkBreadcrumbItem = (props: Props) => {
  const { active = false, children, className, href, linkProps, ...rest } = props;

  return (
    <li className={getClassName('bpk-breadcrumb-item', className)} {...rest}>
      {active ? (
        <div className={getClassName('bpk-breadcrumb-item__active-item')}>
          <BpkText
            aria-current="page"
            {...linkProps}
          >
            {children}
          </BpkText>
        </div>
      ) : (
        <div className={getClassName('bpk-breadcrumb-item__link')}>
          <BpkLink
            href={href}
            {...linkProps}
          >
            {children}
          </BpkLink>
        </div>
      )}
      <div className={getClassName('bpk-breadcrumb-item__arrow')}>
        {!active && (
          <RtlSupportedArrowRight/>
        )}
      </div>
    </li>
  );
};

export default BpkBreadcrumbItem;