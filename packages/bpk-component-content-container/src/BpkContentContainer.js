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

import STYLES from './bpk-content-container.css';

const getClassName = cssModules(STYLES);

const BpkContentContainer = props => {
  const {
    tagName: TagName,
    className,
    bareHtml,
    alternate,
    dangerouslySetInnerHTML,
    children,
    ...rest
  } = props;
  const classNames = [getClassName('bpk-content-container')];

  if (bareHtml) {
    classNames.push(getClassName('bpk-content-container--bare-html'));

    if (alternate) {
      classNames.push(
        getClassName('bpk-content-container--bare-html-alternate'),
      );
    }
  }

  if (className) {
    classNames.push(className);
  }

  /* eslint-disable react/no-danger-with-children */
  return (
    <TagName
      className={classNames.join(' ')}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      {...rest}
    >
      {children}
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
  alternate: PropTypes.bool,
  className: PropTypes.string,
};

BpkContentContainer.defaultProps = {
  children: null,
  dangerouslySetInnerHTML: null,
  tagName: 'div',
  bareHtml: false,
  alternate: false,
  className: null,
};

export default BpkContentContainer;
