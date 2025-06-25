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
// @ts-expect-error TS(2305): Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

// @ts-expect-error TS(2307): Cannot find module './BpkCodeBlock.module.scss' or... Remove this comment to see the full error message
import STYLES from './BpkCodeBlock.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  alternate: boolean,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  className: ?string,
};
const BpkCodeBlock = (props: Props) => {
  const { alternate, children, className, ...rest } = props;
  const preClassNames = getClassName(
    'bpk-code__pre',
    alternate && 'bpk-code__pre--alternate',
    className,
  );

  const codeClassNames = getClassName('bpk-code', 'bpk-code--block');

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <pre className={preClassNames} {...rest}>
      <code className={codeClassNames}>{children}</code>
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
