import React, { PropTypes, Component } from 'react';

export default (ComposedComponent) => {
  // Component HAS to be written as class component
  // as react-portal doesn't work with stateless components
  // because they don't have instances or refs
  //
  /* eslint-disable react/prefer-stateless-function */
  class ToPortalChildHOC extends Component {
  /* eslint-enable */
    render() {
      const { closePortal, ...rest } = this.props;

      return (
        <ComposedComponent onClose={closePortal} {...rest} />
      );
    }
  }

  ToPortalChildHOC.propTypes = {
    closePortal: PropTypes.func,
  };

  return ToPortalChildHOC;
};
