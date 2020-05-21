/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkSkipLink.scss';

const getClassName = cssModules(STYLES);

export type State = {
  hidden: boolean,
};

export type Props = {
  label: string,
  href: string,
  className: ?string,
};
class BpkSkipLink extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { hidden: true };
  }

  render() {
    const { label, href, className, ...rest } = this.props;
    const { hidden } = this.state;

    const classNames = getClassName(
      'bpk-skip-link',
      hidden && getClassName('bpk-skip-link--hidden'),
      className,
    );

    return (
      // $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'.
      <a
        onFocus={() => {
          clearTimeout(this.hideTimout);
          this.setState({ hidden: false });
        }}
        onBlur={() => {
          // We want the skiplink to remain visible for a short period of time after it is blurred so that
          // a user tabbing quickly has a chance to see that it appeared
          this.hideTimout = setTimeout(
            () => this.setState({ hidden: true }),
            200,
          );
        }}
        href={href}
        className={classNames}
        {...rest}
      >
        {label}
      </a>
    );
  }
}

BpkSkipLink.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BpkSkipLink.defaultProps = {
  className: null,
};

export default BpkSkipLink;
