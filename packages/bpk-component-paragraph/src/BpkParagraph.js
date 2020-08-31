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
import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkParagraph.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  className: ?string,
};

const BpkParagraph = (props: Props) => {
  const classNames = [getClassName('bpk-paragraph')];
  const { className, ...rest } = props;

  if (className) {
    classNames.push(className);
  }

  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
  return <p className={classNames.join(' ')} {...rest} />;
};

BpkParagraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BpkParagraph.defaultProps = {
  className: null,
};

export default BpkParagraph;
