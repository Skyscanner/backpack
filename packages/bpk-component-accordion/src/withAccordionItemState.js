import PropTypes from 'prop-types';
import React, { Component } from 'react';

const withAccordionItemState = (ComposedComponent) => {
  class WithAccordionItemState extends Component {
    constructor(props) {
      super(props);

      this.state = {
        expanded: props.initiallyExpanded,
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

  WithAccordionItemState.propTypes = {
    initiallyExpanded: PropTypes.bool,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
  };

  WithAccordionItemState.defaultProps = {
    initiallyExpanded: false,
    expanded: false,
    onClick: null,
  };

  const composedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  WithAccordionItemState.displayName = `withAccordionItemState(${composedComponentName})`;

  return WithAccordionItemState;
};

export default withAccordionItemState;
