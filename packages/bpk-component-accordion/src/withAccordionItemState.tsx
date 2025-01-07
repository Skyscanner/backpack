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

import { Component } from 'react';
import type { ComponentType } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

import type { BpkAccordionItemProps } from './BpkAccordionItem';

type Props = {
  initiallyExpanded: boolean;
  expanded: boolean;
  onClick?: () => void;
};

type State = {
  expanded: boolean;
};

const withAccordionItemState = <P extends BpkAccordionItemProps>(
  ComposedComponent: ComponentType<P>,
) => {
  class WithAccordionItemState extends Component<P & Props, State> {
    static displayName = wrapDisplayName(
      ComposedComponent,
      'withAccordionItemState',
    );

    static defaultProps = {
      initiallyExpanded: false,
      expanded: false,
      onClick: null,
    };

    constructor(props: P & Props) {
      super(props);

      this.state = {
        expanded: props.initiallyExpanded,
      };
    }

    onClick = () => {
      this.setState(
        (prevState) => ({
          expanded: !prevState.expanded,
        }),
        this.props.onClick || (() => {}),
      );
    };

    render() {
      const { expanded, initiallyExpanded, onClick, ...rest } = this.props;

      return (
        <ComposedComponent
          expanded={this.state.expanded}
          onClick={this.onClick}
          {...(rest as P)}
        />
      );
    }
  }

  return WithAccordionItemState;
};

export default withAccordionItemState;
