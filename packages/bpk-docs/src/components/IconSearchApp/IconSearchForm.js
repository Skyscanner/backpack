import _ from 'lodash';
import React, { PropTypes } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkSelect from 'bpk-component-select';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

import './IconSearchForm.scss';

const CATEGORY_SELECT_ID = 'icon_search_form_category';
const FILTER_INPUT_ID = 'icon_search_form_filter';

const IconSearchForm = (props) => {
  const { categories, category, filterValue, onCategoryChange, onFilterChange } = props;

  const categoryObjs = categories.map(categoryName => ({
    name: categoryName,
    value: categoryName,
  }));

  const uniqueCategoryObjs = _.uniqBy(categoryObjs, 'value');

  const finalCategoryObjs = [
    {
      name: 'Choose...',
      value: null,
    },
    ...uniqueCategoryObjs,
  ];

  return (
    <form onSubmit={e => e.preventDefault()} className="bpkdocs-icon-search-form">
      <fieldset className="bpkdocs-icon-search-form__fieldset">
        <BpkLabel label="Category" htmlFor={CATEGORY_SELECT_ID} />
        <BpkSelect
          id={CATEGORY_SELECT_ID}
          name="category"
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
        >
          {finalCategoryObjs.map(({ name, value }) => (
            <option key={name} value={value}>{name}</option>
          ))}
        </BpkSelect>
      </fieldset>
      <fieldset className="bpkdocs-icon-search-form__fieldset">
        <BpkLabel label="Filter" htmlFor={FILTER_INPUT_ID} />
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
  categories: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  category: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default IconSearchForm;
