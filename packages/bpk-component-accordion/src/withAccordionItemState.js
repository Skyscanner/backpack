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
import React, { Component, type ComponentType } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

type Props = {
  initiallyExpanded: boolean,
  expanded: boolean,
  onClick: ?() => mixed,
};

type State = {
  expanded: boolean,
};

const withAccordionItemState = (ComposedComponent: ComponentType<any>) => {
  class WithAccordionItemState extends Component<Props, State> {
    static propTypes = {
      initiallyExpanded: PropTypes.bool,
      expanded: PropTypes.bool,
      onClick: PropTypes.func,
    };

    static defaultProps = {
      initiallyExpanded: false,
      expanded: false,
      onClick: null,
    };

    constructor(props: Props) {
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
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
        <ComposedComponent
          expanded={this.state.expanded}
          onClick={this.onClick}
          {...rest}
        />
      );
    }
  }

  WithAccordionItemState.displayName = wrapDisplayName(
    ComposedComponent,
    'withAccordionItemState',
  );

  return WithAccordionItemState;
};

export default withAccordionItemState;
