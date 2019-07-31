/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import { type Props, defaultProps, propTypes } from './common-types';
import STYLES from './BpkButtonSecondary.scss';
import BpkButtonBase from './BpkButtonBase';

// This was originally depended upon from the bpk-react-utils package, however
// we decided to inline it in this particular component so as not to bloat the
// the bundles of consumers who are not yet on webpack 2
// We'll revisit this again soon.
const cssModules = (styles = {}) => className =>
  styles[className] ? styles[className] : className;

const getClassName = cssModules(STYLES);

const BpkButtonSecondary = (props: Props) => {
  const { className, ...rest } = props;

  const classNames = [getClassName('bpk-button--secondary')];

  if (className) {
    classNames.push(className);
  }
  const classNamesFinal = classNames.join(' ');

  return <BpkButtonBase className={classNamesFinal} {...rest} />;
};

BpkButtonSecondary.propTypes = propTypes;
BpkButtonSecondary.defaultProps = defaultProps;

export default BpkButtonSecondary;
