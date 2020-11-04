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

import React from 'react';
import PropTypes from 'prop-types';

import {
  type Props as CommonProps,
  defaultProps,
  propTypes,
} from './common-types';
import BpkButtonBase, { cssModules } from './BpkButtonBase';
import STYLES from './BpkButtonLink.scss';

const getClassName = cssModules(STYLES);

type Props = {
  ...CommonProps,
  padded: boolean,
};
const BpkButtonLink = (props: Props) => {
  const { className, padded, ...rest } = props;

  const classNames = [getClassName('bpk-button--link')];

  if (padded) {
    classNames.push(getClassName('bpk-button--padded'));
  }

  if (className) {
    classNames.push(className);
  }
  const classNamesFinal = classNames.join(' ');

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkButtonBase className={classNamesFinal} {...rest} />
  );
};

BpkButtonLink.propTypes = { ...propTypes, padded: PropTypes.bool };
BpkButtonLink.defaultProps = { ...defaultProps, padded: false };

export default BpkButtonLink;
