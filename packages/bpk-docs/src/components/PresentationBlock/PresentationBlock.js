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

import STYLES from './PresentationBlock.css';

const getClassName = cssModules(STYLES);

const PresentationBlock = props => {
  const classNames = [getClassName('bpkdocs-presentation-block')];
  const { className, darkBackground, whiteBackground, ...rest } = props;

  if (className) {
    classNames.push(className);
  }

  if (whiteBackground) {
    classNames.push(
      getClassName('bpkdocs-presentation-block--white-background'),
    );
  } else if (darkBackground) {
    classNames.push(
      getClassName('bpkdocs-presentation-block--dark-background'),
    );
  }

  return <section className={classNames.join(' ')} {...rest} />;
};

PresentationBlock.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  whiteBackground: PropTypes.bool,
  darkBackground: PropTypes.bool,
};

PresentationBlock.defaultProps = {
  className: null,
  whiteBackground: false,
  darkBackground: false,
};

export default PresentationBlock;
