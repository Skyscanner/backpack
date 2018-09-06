/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-ticket.css';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  stub: Node,
  stubProps: { [string]: any },
  padded: boolean,
  vertical: boolean,
  withNotches: boolean,
  className: ?string,
  stubClassName: ?string,
  href: ?string,
};

const BpkTicket = (props: Props) => {
  const {
    children,
    href,
    padded,
    stub,
    vertical,
    withNotches,
    className,
    stubClassName,
    stubProps,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpk-ticket',
    className,
    vertical && 'bpk-ticket--vertical',
    withNotches && 'bpk-ticket--with-notches',
  );

  const mainClassNames = getClassName(
    'bpk-ticket__paper',
    'bpk-ticket__main',
    padded && 'bpk-ticket__main--padded',
    vertical && 'bpk-ticket__main--vertical',
    !vertical && 'bpk-ticket__main--horizontal',
    withNotches && 'bpk-ticket__paper--with-notches',
  );

  const mainInnerClassNames = getClassName(
    'bpk-ticket__main-inner',
    vertical && 'bpk-ticket__main-inner--vertical',
    !vertical && 'bpk-ticket__main-inner--horizontal',
  );

  const stubClassNames = getClassName(
    'bpk-ticket__paper',
    'bpk-ticket__stub',
    stubClassName,
    padded && 'bpk-ticket__stub--padded',
    vertical && 'bpk-ticket__stub--vertical',
    !vertical && 'bpk-ticket__stub--horizontal',
    withNotches && 'bpk-ticket__paper--with-notches',
  );

  const stubInnerClassNames = getClassName(
    'bpk-ticket__stub-inner',
    vertical && 'bpk-ticket__stub-inner--vertical',
    !vertical && 'bpk-ticket__stub-inner--horizontal',
  );

  const punchlineClassNames = getClassName(
    'bpk-ticket__punchline',
    vertical &&
      (withNotches
        ? 'bpk-ticket__punchline--horizontal-with-notches'
        : 'bpk-ticket__punchline--horizontal'),
    !vertical &&
      (withNotches
        ? 'bpk-ticket__punchline--vertical-with-notches'
        : 'bpk-ticket__punchline--vertical'),
  );

  const startNotchClassNames = getClassName(
    'bpk-ticket__notch',
    vertical && 'bpk-ticket__notch--left',
    !vertical && 'bpk-ticket__notch--top',
  );

  const endNotchClassNames = getClassName(
    'bpk-ticket__notch',
    vertical && 'bpk-ticket__notch--right',
    !vertical && 'bpk-ticket__notch--bottom',
  );

  const mainContent = padded ? (
    children
  ) : (
    <div className={mainInnerClassNames}>{children}</div>
  );

  const stubContent = padded ? (
    stub
  ) : (
    <div className={stubInnerClassNames}>{stub}</div>
  );

  const contents = [
    <div key="main" className={mainClassNames}>
      {mainContent}
    </div>,
    <div
      key="punchline"
      className={punchlineClassNames}
      role="presentation"
      aria-hidden="true"
    >
      {withNotches && <div className={startNotchClassNames} />}
      {withNotches && <div className={endNotchClassNames} />}
    </div>,
    <div key="stub" className={stubClassNames} {...stubProps}>
      {stubContent}
    </div>,
  ];

  if (href) {
    return (
      <a href={href} className={classNames} {...rest}>
        {contents}
      </a>
    );
  }

  return (
    <div role="button" className={classNames} {...rest}>
      {contents}
    </div>
  );
};

BpkTicket.propTypes = {
  children: PropTypes.node.isRequired,
  stub: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  padded: PropTypes.bool,
  vertical: PropTypes.bool,
  stubClassName: PropTypes.string,
  stubProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  withNotches: PropTypes.bool,
};

BpkTicket.defaultProps = {
  className: null,
  href: null,
  padded: true,
  vertical: false,
  stubClassName: null,
  stubProps: {},
  withNotches: true,
};

export default BpkTicket;
