import React, { Component } from 'react';

import customPropTypes from './propTypes';

import IconSearchForm from './IconSearchForm';
import IconSearchResults from './IconSearchResults';

class IconSearchApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(filterValue) {
    this.setState({ filterValue });
  }

  getFilteredIcons() {
    const { icons } = this.props;
    const { filterValue } = this.state;

    return icons.filter(icon => icon.name.indexOf(filterValue) !== -1);
  }

  render() {
    return (
      <div>
        <IconSearchForm filterValue={this.state.filterValue} onFilterChange={this.onFilterChange} />
        <IconSearchResults icons={this.getFilteredIcons()} />
      </div>
    );
  }
}

IconSearchApp.propTypes = {
  icons: customPropTypes.icons.isRequired,
};

export default IconSearchApp;
