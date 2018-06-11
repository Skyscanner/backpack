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
  }

  onFilterChange = filterValue => {
    this.setState({ filterValue });
  };

  getFilteredIcons() {
    const { icons } = this.props;
    const { filterValue } = this.state;

    return icons.filter(
      icon => icon.name.indexOf(filterValue.toLowerCase()) !== -1,
    );
  }

  render() {
    return (
      <div>
        <IconSearchForm
          filterValue={this.state.filterValue}
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
