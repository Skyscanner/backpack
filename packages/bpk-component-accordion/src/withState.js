import PropTypes from 'prop-types';
import React, { Component } from 'react';

const withState = (ComposedComponent) => {
  class WithState extends Component {
    constructor(props) {
      super(props);

      this.state = {
        expanded: this.props.initiallyExpanded,
      };

      this.onClick = this.onClick.bind(this);
    }

    onClick() {
      this.setState(prevState => ({
        expanded: !prevState.expanded,
      }), this.props.onClick);
    }

    render() {
      const { initiallyExpanded, expanded, onClick, ...rest } = this.props;

      return <ComposedComponent expanded={this.state.expanded} onClick={this.onClick} {...rest} />;
    }
  }

  WithState.propTypes = {
    initiallyExpanded: PropTypes.bool,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
  };

  WithState.defaultProps = {
    initiallyExpanded: false,
    expanded: false,
    onClick: null,
  };

  const composedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  WithState.displayName = `WithState(${composedComponentName})`;

  return WithState;
};

export default withState;
