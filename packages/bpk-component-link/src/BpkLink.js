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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import themeAttributes, {
  linkAlternateThemeAttributes,
} from './themeAttributes';

import STYLES from './bpk-link.css';

const getClassName = cssModules(STYLES);

const BpkLink = props => {
  const {
    children,
    className,
    href,
    onClick,
    blank,
    rel: propRel,
    white,
    alternate,
    ...rest
  } = props;

  const classNames = [getClassName('bpk-link')];

  const target = blank ? '_blank' : null;
  const rel = blank ? propRel || 'noopener noreferrer' : propRel;

  if (white || alternate) {
    classNames.push(getClassName('bpk-link--alternate'));
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <a
      className={classNames.join(' ')}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </a>
  );
};

BpkLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  blank: PropTypes.bool,
  rel: PropTypes.string,
  alternate: PropTypes.bool,
  // DEPRECATED
  white: PropTypes.bool,
};

BpkLink.defaultProps = {
  className: null,
  onClick: null,
  blank: false,
  rel: null,
  alternate: false,
  // DEPRECATED
  white: false,
};

export default BpkLink;
export { themeAttributes, linkAlternateThemeAttributes };
