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
import React, { Component, Children, cloneElement } from 'react';

const getInitiallyExpanded = (children) => {
  const accordionItems = Children.toArray(children);
  const result = accordionItems.reduceRight((prev, item) => (item.props.initiallyExpanded ? item : prev), {});
  return (result || {}).key || null;
};

const withSingleItemAccordionState = (ComposedComponent) => {
  class WithSingleItemAccordionState extends Component {
    constructor(props) {
      super(props);

      this.state = {
        expanded: getInitiallyExpanded(this.props.children),
      };

      this.openAccordionItem = this.openAccordionItem.bind(this);
      this.renderAccordionItem = this.renderAccordionItem.bind(this);
    }

    openAccordionItem(key) {
      this.setState({ expanded: key });
    }

    renderAccordionItem(accordionItem) {
      const expanded = this.state.expanded === accordionItem.key;
      const onClick = () => this.openAccordionItem(accordionItem.key);

      return cloneElement(accordionItem, { expanded, onClick });
    }

    render() {
      const { children } = this.props;

      return (
        <ComposedComponent>
          {Children.toArray(children).map(this.renderAccordionItem)}
        </ComposedComponent>
      );
    }
  }

  WithSingleItemAccordionState.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const composedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  WithSingleItemAccordionState.displayName = `withSingleItemAccordionState(${composedComponentName})`;

  return WithSingleItemAccordionState;
};


export default withSingleItemAccordionState;
