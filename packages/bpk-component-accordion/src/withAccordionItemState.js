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
