/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { Component } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

const withInteractiveStarRatingState = (
  InteractiveStarRating,
) => {


  class EnhancedComponent extends Component {
    static propTypes = {
      onRatingSelect: PropTypes.func,
    };

    static defaultProps = {
      onRatingSelect: () => null,
    };

    constructor() {
      super();

      this.state = {
        rating: 0,
        hoverRating: 0,
      };
    }

    onRatingSelect = (rating, event) => {
      if (event) {
        event.persist();
      }

      const callback = () => {
        if (this.props.onRatingSelect) {
          this.props.onRatingSelect(rating, event);
        }
      };

      this.setState(() => ({ rating }), callback);
    };

    onMouseLeave = () => {
      this.setState(() => ({ hoverRating: 0 }));
    };

    onRatingHover = (hoverRating) => {
      this.setState(() => ({ hoverRating }));
    };

    render() {
      return (
        <InteractiveStarRating
          {...this.props}
          rating={this.state.rating}
          hoverRating={this.state.hoverRating}
          onRatingHover={this.onRatingHover}
          onMouseLeave={this.onMouseLeave}
          onRatingSelect={this.onRatingSelect}
        />
      );
    }
  }

  EnhancedComponent.displayName = wrapDisplayName(
    EnhancedComponent,
    'withInteractiveStarRatingState',
  );

  return EnhancedComponent;
};

export default withInteractiveStarRatingState;
