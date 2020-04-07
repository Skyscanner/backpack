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

import STYLES from './BpkText.scss';

const getClassName = cssModules(STYLES);

const TEXT_STYLES = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  'xxl',
  'xxxl',
  'xxxxl',
  'xxxxxl',
];

type Props = {
  children: Node,
  // eslint-disable-next-line flowtype/space-after-type-colon
  textStyle:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'xxxxl'
    | 'xxxxxl',
  tagName: 'span' | 'p' | 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  className: ?string,
  bold: boolean,
};

const BpkText = (props: Props) => {
  const {
    bold,
    className,
    children,
    tagName: TagName,
    textStyle,
    ...rest
  } = props;
  const classNames = getClassName(
    'bpk-text',
    `bpk-text--${textStyle}`,
    bold && 'bpk-text--bold',
    className,
  );

  return (
    <TagName
      className={classNames}
      // $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'.
      {...rest}
    >
      {children}
    </TagName>
  );
};

BpkText.propTypes = {
  children: PropTypes.node.isRequired,
  textStyle: PropTypes.oneOf(TEXT_STYLES),
  tagName: PropTypes.oneOf([
    'span',
    'p',
    'text',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ]),
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
