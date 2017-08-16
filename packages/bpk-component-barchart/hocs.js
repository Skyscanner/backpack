/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';

import wrapDisplayName from 'recompose/wrapDisplayName';

// eslint-disable-next-line import/prefer-default-export
export const withSelectedState = (ComposedComponent) => {
  class WithSelectedState extends Component {
    constructor() {
      super();

      this.state = {
        selectedPoint: null,
      };

      this.onBarClick = this.onBarClick.bind(this);
      this.getBarSelection = this.getBarSelection.bind(this);
    }

    onBarClick(e, { point }) {
      this.setState({
        selectedPoint: point,
      });
    }

    getBarSelection(point) {
      return isEqual(this.state.selectedPoint, point);
    }

    render() {
      const { ...rest } = this.props;

      return (
        <ComposedComponent
          {...rest}
          onBarClick={this.onBarClick}
          getBarSelection={this.getBarSelection}
        />
      );
    }

  }

  WithSelectedState.displayName = wrapDisplayName(ComposedComponent, 'withSelectedState');

  return WithSelectedState;
};
