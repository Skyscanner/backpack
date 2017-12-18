/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import STYLES from './bpk-content-container.scss';

const getClassName = cssModules(STYLES);

const BpkContentContainer = props => {
  const TagName = props.tagName;
  const classNames = [getClassName('bpk-content-container')];

  if (props.bareHtml) {
    classNames.push(getClassName('bpk-content-container--bare-html'));
  }

  /* eslint-disable react/no-danger-with-children */
  return (
    <TagName
      className={classNames.join(' ')}
      dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
    >
      {props.children}
    </TagName>
  );
  /* eslint-enable */
};

BpkContentContainer.propTypes = {
  children: PropTypes.node,
  dangerouslySetInnerHTML: PropTypes.shape({
    __html: PropTypes.string.isRequired,
  }),
  tagName: PropTypes.oneOf(['article', 'aside', 'div', 'main', 'section']),
  bareHtml: PropTypes.bool,
};

BpkContentContainer.defaultProps = {
  children: null,
  dangerouslySetInnerHTML: null,
  tagName: 'div',
  bareHtml: false,
};

export default BpkContentContainer;
