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

import _ from 'lodash';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './IconSearchResults.css';
import customPropTypes from './propTypes';
import IconSearchResult from './IconSearchResult';
import Heading from '../Heading';

const getClassName = cssModules(STYLES);

const IconSearchResults = props => {
  const categories = _.groupBy(props.icons, 'categoryName');
  const categoryNames = Object.keys(categories);

  return (
    <div>
      <Heading
        level="h3"
        className={getClassName('bpkdocs-icon-search-results__heading')}
      >
        Results
      </Heading>
      <dl className={getClassName('bpkdocs-icon-search-results__list')}>
        {categoryNames.length > 0 ? (
          categoryNames.map(categoryName => (
            <IconSearchResult
              key={categoryName}
              categoryName={categoryName}
              icons={categories[categoryName]}
            />
          ))
        ) : (
          <div>There are no icons by that name.</div>
        )}
      </dl>
    </div>
  );
};

IconSearchResults.propTypes = {
  icons: customPropTypes.icons.isRequired,
};

export default IconSearchResults;
