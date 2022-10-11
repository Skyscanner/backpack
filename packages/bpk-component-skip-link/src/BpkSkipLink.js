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
import React from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSkipLink.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  label: string,
  href: string,
  className: ?string,
};

const BpkSkipLink = (props: Props) => {
  const { className, href, label, ...rest } = props;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <a
      href={href}
      className={getClassName('bpk-skip-link', className)}
      {...rest}
    >
      {label}
    </a>
  );
};

BpkSkipLink.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BpkSkipLink.defaultProps = {
  className: null,
};

export default BpkSkipLink;
