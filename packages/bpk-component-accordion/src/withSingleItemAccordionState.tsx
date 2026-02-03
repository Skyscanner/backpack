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
import { Component, Children, cloneElement } from 'react';
import type { ReactNode, ReactElement, ComponentType } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

import type { BpkAccordionProps } from './BpkAccordion';

const getInitiallyExpanded = (children: ReactNode) => {
  const accordionItems = Children.toArray(children) as ReactElement[];
  const result = accordionItems.reduceRight(
    (prev, item) => (item.props.initiallyExpanded ? item : prev),
    {} as ReactElement,
  );
  return (result || {}).key || null;
};

type Props = {
  children: ReactNode;
};

type State = {
  expanded?: string | number | null;
};

const withSingleItemAccordionState = <P extends BpkAccordionProps>(
  ComposedComponent: ComponentType<P>,
) => {
  class WithSingleItemAccordionState extends Component<P & Props, State> {
    static displayName = wrapDisplayName(
      ComposedComponent,
      'withSingleItemAccordionState',
    );

    constructor(props: P & Props) {
      super(props);

      this.state = {
        expanded: getInitiallyExpanded(this.props.children),
      };
    }

    openAccordionItem = (key?: string | number | null) => {
      this.setState({ expanded: key });
    };

    renderAccordionItem = (accordionItem: ReactElement) => {
      const expanded = this.state.expanded === accordionItem.key;
      const onClick = () => this.openAccordionItem(accordionItem?.key);

      return cloneElement(accordionItem, { expanded, onClick });
    };

    render() {
      const { children, ...rest } = this.props;

      return (
        <ComposedComponent {...(rest as P)}>
          {Children.toArray(children).map((el) =>
            this.renderAccordionItem(el as ReactElement),
          )}
        </ComposedComponent>
      );
    }
  }

  return WithSingleItemAccordionState;
};

export default withSingleItemAccordionState;
