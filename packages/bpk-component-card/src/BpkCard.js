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

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCard.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  className: ?string,
  href: ?string,
  padded: boolean,
  blank: boolean,
  atomic: boolean,
};

const BpkCard = (props: Props) => {
  const { atomic, blank, children, className, href, padded, ...rest } = props;

  const classNames = [getClassName('bpk-card')];
  if (padded) {
    classNames.push(getClassName('bpk-card--padded'));
  }
  if (className) {
    classNames.push(className);
  }

  const classNameFinal = classNames.join(' ');

  const atomicProps: { tabIndex: ?number, role: ?string } = {};

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
        className={classNameFinal}
        {...atomicProps}
        {...blankProps}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // If the card is atomic, we need to enable keyboard focus and provide an appropriate role.
  if (atomic) {
    atomicProps.tabIndex = 0;
    atomicProps.role = 'button';
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div {...atomicProps} className={classNameFinal} {...rest}>
      {children}
    </div>
  );
};

BpkCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  padded: PropTypes.bool,
  blank: PropTypes.bool,
  atomic: PropTypes.bool,
};

BpkCard.defaultProps = {
  className: null,
  href: null,
  padded: true,
  blank: false,
  atomic: true,
};

export default BpkCard;
