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

/* @flow strict */

import PropTypes from 'prop-types';
// @ts-expect-error TS(2305): Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';

import { withRtlSupport } from '../../bpk-component-icon';
import ArrowRight from '../../bpk-component-icon/sm/arrow-right';
import BpkLink from '../../bpk-component-link';
import BpkText from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

// @ts-expect-error TS(2307): Cannot find module './BpkBreadcrumbItem.module.scs... Remove this comment to see the full error message
import STYLES from './BpkBreadcrumbItem.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  active: boolean,
  href: ?string,
  className: ?string,
  // @ts-expect-error TS(2693): 'string' only refers to a type, but is being used ... Remove this comment to see the full error message
  linkProps: ?{ [string]: any },
};

const RtlSupportedArrowRight = withRtlSupport(ArrowRight);

const BpkBreadcrumbItem = (props: Props) => {
  const { active, children, className, href, linkProps, ...rest } = props;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <li className={getClassName('bpk-breadcrumb-item', className)} {...rest}>
      {active ? (
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
        <div className={getClassName('bpk-breadcrumb-item__active-item')}>
          <BpkText
            aria-current="page"
            {...linkProps}
          >
            {children}
          </BpkText>
        </div>
      ) : (
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
        <div className={getClassName('bpk-breadcrumb-item__link')}>
          // @ts-expect-error TS(2740): Type '{ children: Node; href: string | null; }' is... Remove this comment to see the full error message
          // @ts-expect-error TS(2740) FIXME: Type '{ children: Node; href: string | null; }' is... Remove this comment to see the full error message
          // @ts-expect-error TS(2740): Type '{ children: Node; href: string | null; }' is... Remove this comment to see the full error message
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

BpkBreadcrumbItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  href: PropTypes.string,
  className: PropTypes.string,
  linkProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkBreadcrumbItem.defaultProps = {
  active: false,
  href: null,
  className: null,
  linkProps: null,
};

export default BpkBreadcrumbItem;
