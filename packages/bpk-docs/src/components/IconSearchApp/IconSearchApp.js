import React, { Component } from 'react';

import customPropTypes from './propTypes';

import IconSearchForm from './IconSearchForm';
import IconSearchResults from './IconSearchResults';

class IconSearchApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      filterValue: '',
    };

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onCategoryChange(category) {
    this.setState({ category });
  }

  onFilterChange(filterValue) {
    this.setState({ filterValue });
  }

  getFilteredIcons() {
    const { icons } = this.props;
    const { category, filterValue } = this.state;

    const filteredByCategory = icons.filter(icon => icon.category === category);

    return (
      filteredByCategory.length === 0
        ? icons
        : filteredByCategory
    ).filter(icon =>
      icon.name.indexOf(filterValue) !== -1,
    );
  }

  render() {
    const categories = this.props.icons.map(({ category }) => category);

    return (
      <div>
        <IconSearchForm
          categories={categories}
          category={this.state.category}
          filterValue={this.state.filterValue}
          onCategoryChange={this.onCategoryChange}
          onFilterChange={this.onFilterChange}
        />
        <IconSearchResults icons={this.getFilteredIcons()} />
      </div>
    );
  }
}

IconSearchApp.propTypes = {
  icons: customPropTypes.icons.isRequired,
};

export default IconSearchApp;
