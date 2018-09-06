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

import STYLES from './BpkCode.css';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  alternate: boolean,
  className: ?string,
};
const BpkCode = (props: Props) => {
  const { children, alternate, className, ...rest } = props;
  const classNames = [getClassName('bpk-code')];

  if (alternate) {
    classNames.push(getClassName('bpk-code--alternate'));
  }

  if (className) {
    classNames.push(className);
  }

  return (
    <code className={classNames.join(' ')} {...rest}>
      {children}
    </code>
  );
};

BpkCode.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  alternate: PropTypes.bool,
};

BpkCode.defaultProps = {
  className: null,
  alternate: false,
};

export default BpkCode;
