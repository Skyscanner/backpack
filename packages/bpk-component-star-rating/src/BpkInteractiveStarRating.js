import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BpkStarRating from './BpkStarRating';

class BpkInteractiveStarRating extends Component {
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

  onRatingSelect(rating) {
    const callback = () => {
      this.props.onRatingSelect(rating);
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
      <BpkStarRating
        {...this.props}
        interactive
        rating={this.state.rating}
        hoverRating={this.state.hoverRating}
        onRatingHover={this.onRatingHover}
        onMouseLeave={this.onMouseLeave}
        onRatingSelect={this.onRatingSelect}
      />
    );
  }
}

BpkInteractiveStarRating.propTypes = {
  onRatingSelect: PropTypes.func,
};

BpkInteractiveStarRating.defaultProps = {
  onRatingSelect: () => null,
};

export default BpkInteractiveStarRating;

