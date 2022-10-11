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
import React, { type Node } from 'react';

import BpkLink from '../../bpk-component-link';
import BpkText from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';
import { withRtlSupport } from '../../bpk-component-icon';
import ArrowRight from '../../bpk-component-icon/sm/arrow-right';

import STYLES from './BpkBreadcrumbItem.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  active: boolean,
  href: ?string,
  className: ?string,
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
        <BpkText
          className={getClassName('bpk-breadcrumb-item__active-item')}
          aria-current="page"
          {...linkProps}
        >
          {children}
        </BpkText>
      ) : (
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
        <BpkLink
          href={href}
          className={getClassName('bpk-breadcrumb-item__link')}
          {...linkProps}
        >
          {children}
        </BpkLink>
      )}
      {!active && (
        <RtlSupportedArrowRight
          className={getClassName('bpk-breadcrumb-item__arrow')}
        />
      )}
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
