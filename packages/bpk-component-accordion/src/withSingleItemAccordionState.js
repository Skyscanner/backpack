/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

/* @flow strict */

import PropTypes from 'prop-types';
import React, {
  Component,
  Children,
  cloneElement,
  type Node,
  type Element,
  type ComponentType,
} from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

const getInitiallyExpanded = (children) => {
  const accordionItems = Children.toArray(children);
  const result = accordionItems.reduceRight(
    (prev, item) => (item.props.initiallyExpanded ? item : prev),
    {},
  );
  return (result || {}).key || null;
};

type Props = {
  children: Node,
};

type State = {
  expanded: ?string | ?number,
};

const withSingleItemAccordionState = (
  ComposedComponent: ComponentType<any>,
) => {
  class WithSingleItemAccordionState extends Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        expanded: getInitiallyExpanded(this.props.children),
      };
    }

    openAccordionItem = (key: ?string | ?number) => {
      this.setState({ expanded: key });
    };

    renderAccordionItem = (accordionItem: Element<any>) => {
      const expanded = this.state.expanded === accordionItem.key;
      const onClick = () => this.openAccordionItem(accordionItem.key);

      return cloneElement(accordionItem, { expanded, onClick });
    };

    render() {
      const { children, ...rest } = this.props;

      return (
        <ComposedComponent {...rest}>
          {Children.toArray(children).map(this.renderAccordionItem)}
        </ComposedComponent>
      );
    }
  }

  WithSingleItemAccordionState.propTypes = {
    children: PropTypes.node.isRequired,
  };

  WithSingleItemAccordionState.displayName = wrapDisplayName(
    ComposedComponent,
    'withSingleItemAccordionState',
  );

  return WithSingleItemAccordionState;
};

export default withSingleItemAccordionState;
