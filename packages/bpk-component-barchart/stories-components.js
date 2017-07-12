import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';

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

  const composedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  WithSelectedState.displayName = `withSelectedState(${composedComponentName})`;

  return WithSelectedState;
};
