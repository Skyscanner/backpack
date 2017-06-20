import PropTypes from 'prop-types';
import React, { Component } from 'react';

const withInteractiveStarRatingState = (InteractiveStarRating) => {
  class EnhancedComponent extends Component {
    constructor() {
      super();

      this.state = {
        rating: 0,
        hoverRating: 0,
      };

      this.onRatingHover = this.onRatingHover.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.onRatingSelect = this.onRatingSelect.bind(this);
    }

    onRatingSelect(rating, event) {
      if (event) {
        event.persist();
      }

      const callback = () => {
        this.props.onRatingSelect(rating, event);
      };

      this.setState({ rating }, callback);
    }

    onMouseLeave() {
      this.setState({
        hoverRating: 0,
      });
    }

    onRatingHover(hoverRating) {
      this.setState({
        hoverRating,
      });
    }

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

  EnhancedComponent.propTypes = {
    onRatingSelect: PropTypes.func,
  };

  EnhancedComponent.defaultProps = {
    onRatingSelect: () => null,
  };

  const enhancedComponentName = EnhancedComponent.displayName || EnhancedComponent.name || 'Component';

  EnhancedComponent.displayName = `withInteractiveStarRatingState(${enhancedComponentName})`;

  return EnhancedComponent;
};

export default withInteractiveStarRatingState;
