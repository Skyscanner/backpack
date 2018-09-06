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

import STYLES from './BpkText.css';

const getClassName = cssModules(STYLES);

const TEXT_STYLES = ['xs', 'sm', 'base', 'lg', 'xl', 'xxl'];

const classes = {};
TEXT_STYLES.forEach(textStyle => {
  classes[textStyle] = getClassName(`bpk-text--${textStyle}`);
});

const BpkText = props => {
  const {
    bold,
    className,
    children,
    tagName: TagName,
    textStyle,
    ...rest
  } = props;
  const classNames = [getClassName('bpk-text'), classes[props.textStyle]];

  if (bold) {
    classNames.push(getClassName('bpk-text--bold'));
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <TagName className={classNames.join(' ')} {...rest}>
      {children}
    </TagName>
  );
};

BpkText.propTypes = {
  children: PropTypes.node.isRequired,
  textStyle: PropTypes.oneOf(TEXT_STYLES),
  tagName: PropTypes.oneOf(['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
  bold: PropTypes.bool,
};

BpkText.defaultProps = {
  textStyle: 'base',
  tagName: 'span',
  className: null,
  bold: false,
};

export default BpkText;
