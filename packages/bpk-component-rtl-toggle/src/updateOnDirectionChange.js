import React, { Component } from 'react';
import { getHtmlElement, DIRECTION_CHANGE_EVENT } from './utils';

const updateOnDirectionChange = (EnhancedComponent) => {
  class UpdateOnDirectionChange extends Component {
    constructor() {
      super();
      this.onDirectionChange = this.onDirectionChange.bind(this);
    }

    componentDidMount() {
      getHtmlElement().addEventListener(DIRECTION_CHANGE_EVENT, this.onDirectionChange, false);
    }

    componentWillUnmount() {
      getHtmlElement().removeEventListener(DIRECTION_CHANGE_EVENT, this.onDirectionChange, false);
    }

    onDirectionChange() {
      this.forceUpdate();
    }

    render() {
      return <EnhancedComponent {...this.props} />;
    }
  }

  const enhancedComponentName = EnhancedComponent.displayName || EnhancedComponent.name || 'Component';

  UpdateOnDirectionChange.displayName = `updateOnDirectionChange(${enhancedComponentName})`;

  return UpdateOnDirectionChange;
};

export default updateOnDirectionChange;
