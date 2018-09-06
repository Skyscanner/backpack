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

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkCodeBlock.css';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  alternate: boolean,
  className: ?string,
};
const BpkCodeBlock = (props: Props) => {
  const { children, alternate, className, ...rest } = props;
  const preClassNames = [getClassName('bpk-code__pre')];
  const codeClassNames = ['bpk-code', 'bpk-code--block'].map(getClassName);

  if (alternate) {
    preClassNames.push(getClassName('bpk-code__pre--alternate'));
  }

  if (className) {
    preClassNames.push(className);
  }

  return (
    <pre className={preClassNames.join(' ')} {...rest}>
      <code className={codeClassNames.join(' ')}>{children}</code>
    </pre>
  );
};

BpkCodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  alternate: PropTypes.bool,
  className: PropTypes.string,
};

BpkCodeBlock.defaultProps = {
  alternate: false,
  className: null,
};

export default BpkCodeBlock;
