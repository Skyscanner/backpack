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
import type { Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import themeAttributes from './themeAttributes';

import STYLES from './BpkLink.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  className: ?string,
  onClick: (event: SyntheticEvent<>) => mixed,
  alternate: boolean,
  implicit?: boolean;
};

const BpkButtonLink = ({
  alternate = false,
  children,
  className = null,
  implicit = false,
  onClick,
  ...rest
}: Props) => {
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

export { themeAttributes };
export default BpkButtonLink;
