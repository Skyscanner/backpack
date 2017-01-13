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
      /* eslint-disable no-unused-vars */
      const { closePortal, ...rest } = this.props;
      /* eslint-enable */

      return <ComposedComponent {...rest} />;
    }
  }

  ToPortalChildHOC.propTypes = {
    closePortal: PropTypes.func,
  };

  return ToPortalChildHOC;
};
