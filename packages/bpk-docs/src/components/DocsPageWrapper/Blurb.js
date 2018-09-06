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
import isString from 'lodash/isString';
import { cssModules } from 'bpk-react-utils';
import Paragraph from '../Paragraph';
import STYLES from './DocsPageWrapper.css';

const getClassName = cssModules(STYLES);

const Blurb = ({ content }) =>
  isString(content) ? (
    <Paragraph>{content}</Paragraph>
  ) : (
    <div className={getClassName('bpkdocs-page-wrapper__blurb')}>
      {React.Children.toArray(content)}
    </div>
  );

Blurb.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Blurb;
