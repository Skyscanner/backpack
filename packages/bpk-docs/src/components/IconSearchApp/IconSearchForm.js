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
import BpkLabel from 'bpk-component-label';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';

import STYLES from './IconSearchForm.css';

const getClassName = cssModules(STYLES);
const FILTER_INPUT_ID = 'icon_search_form_filter';

const IconSearchForm = props => {
  const { filterValue, onFilterChange } = props;

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className={getClassName('bpkdocs-icon-search-form')}
    >
      <fieldset className={getClassName('bpkdocs-icon-search-form__fieldset')}>
        <BpkLabel htmlFor={FILTER_INPUT_ID}>Filter</BpkLabel>
        <BpkInput
          id={FILTER_INPUT_ID}
          type={INPUT_TYPES.TEXT}
          name="filter"
          value={filterValue}
          onChange={e => onFilterChange(e.target.value)}
          placeholder="Filter by name"
        />
      </fieldset>
    </form>
  );
};

IconSearchForm.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default IconSearchForm;
