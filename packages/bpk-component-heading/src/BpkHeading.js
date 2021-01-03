/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkHeading.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  className: ?string,
  id: ?string,
  bottomMargin: boolean,
};

const BpkHeading = (props: Props) => {
  const { children, level, className, id, bottomMargin } = props;
  const classNames = [getClassName(`bpk-heading-${level}`)];
  const Level = level;

  if (className) {
    classNames.push(className);
  }
  if (!bottomMargin) {
    classNames.push(getClassName('bpk-heading--no-bottom-margin'));
  }

  return (
    <Level className={classNames.join(' ')} id={id}>
      {children}
    </Level>
  );
};

BpkHeading.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  bottomMargin: PropTypes.bool,
};

BpkHeading.defaultProps = {
  className: null,
  id: null,
  bottomMargin: true,
};

export default BpkHeading;
