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



import PropTypes from 'prop-types';
// @ts-expect-error TS(2305): Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import themeAttributes from './themeAttributes';


import STYLES from './BpkLink.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  className: ?string,
  // @ts-expect-error TS(2304): Cannot find name 'SyntheticEvent'.
  onClick: (event: SyntheticEvent<>) => mixed,
  alternate: boolean,
  implicit?: boolean;
};

const BpkButtonLink = (props: Props) => {
  const { alternate, children, className, implicit, onClick, ...rest } = props;
  const classNames = [getClassName('bpk-link')];
  const underlinedClassNames = [getClassName('bpk-link-underlined')];

  if (className) {
    classNames.push(className);
  }
  if (implicit) {
    classNames.push(getClassName('bpk-link--implicit'));
  }
  if (alternate) {
    classNames.push(getClassName('bpk-link--alternate'));
  }

  if (implicit && !alternate) {
    underlinedClassNames.push(getClassName('bpk-link-underlined--implicit'));
  } else if (alternate && !implicit) {
    underlinedClassNames.push(getClassName('bpk-link-underlined--alternate'));
  } else if (implicit && alternate) {
    underlinedClassNames.push(getClassName('bpk-link-underlined-implicit--alternate'));
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={onClick}
      {...rest}
    >
      <span className={underlinedClassNames.join(' ')}>{children}</span>
    </button>
  );
};

BpkButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  alternate: PropTypes.bool,
  implicit: PropTypes.bool,
};

BpkButtonLink.defaultProps = {
  className: null,
  alternate: false,
  implicit: false,
};

export { themeAttributes };
export default BpkButtonLink;
