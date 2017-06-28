import PropTypes from 'prop-types';
import React from 'react';
import BpkLabel from 'bpk-component-label';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';

import STYLES from './IconSearchForm.scss';

const getClassName = cssModules(STYLES);
const FILTER_INPUT_ID = 'icon_search_form_filter';

const IconSearchForm = (props) => {
  const { filterValue, onFilterChange } = props;

  return (
    <form onSubmit={e => e.preventDefault()} className={getClassName('bpkdocs-icon-search-form')}>
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
