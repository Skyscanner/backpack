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

import STYLES from './IconSearchResult.css';
import customPropTypes from './propTypes';

const getClassName = cssModules(STYLES);

const IconSearchResult = props => (
  <div>
    <dt className={getClassName('bpkdocs-icon-search-result__title')}>
      {props.categoryName}
    </dt>
    <dd className={getClassName('bpkdocs-icon-search-result__content')}>
      <ul className={getClassName('bpkdocs-icon-search-result__list')}>
        {props.icons.map(icon => (
          <li
            key={icon.name}
            className={getClassName('bpkdocs-icon-search-result__list-item')}
          >
            <span
              className={getClassName(
                'bpkdocs-icon-search-result__icon-container',
              )}
            >
              <icon.component
                className={[
                  'bpkdocs-icon-search-result__icon',
                  `bpkdocs-icon-search-result__icon--${icon.categoryId}`,
                ]
                  .map(getClassName)
                  .join(' ')}
              />
            </span>
            <span
              className={getClassName(
                'bpkdocs-icon-search-result__name-container',
              )}
            >
              {icon.name}
            </span>
          </li>
        ))}
      </ul>
    </dd>
  </div>
);

IconSearchResult.propTypes = {
  categoryName: PropTypes.string.isRequired,
  icons: customPropTypes.icons.isRequired,
};

export default IconSearchResult;
