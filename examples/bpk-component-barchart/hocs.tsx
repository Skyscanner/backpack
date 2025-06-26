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

import isEqual from 'lodash/isEqual';

import { wrapDisplayName } from '../../packages/bpk-react-utils';

// eslint-disable-next-line import/prefer-default-export
export const withSelectedState = (ComposedComponent: ComponentType<any>) => {
  type State = {
    // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    selectedPoint: ?number,
  };
  class WithSelectedState extends Component<{}, State> {
    constructor() {
      // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
      super();

      this.state = {
        selectedPoint: null,
      };
    }

    // @ts-expect-error TS(2304) FIXME: Cannot find name 'SyntheticEvent'.
    onBarClick = (e: SyntheticEvent<any>, { point }: { point: number }) => {
      this.setState({
        selectedPoint: point,
      });
    };

    getBarSelection = (point: number) =>
      isEqual(this.state.selectedPoint, point);

    render() {
      const { ...rest } = this.props;

      return (
        <ComposedComponent
          {...rest}
          onBarClick={this.onBarClick}
          getBarSelection={this.getBarSelection}
        />
      );
    }
  }

  // @ts-expect-error TS(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
  WithSelectedState.displayName = wrapDisplayName(
    ComposedComponent,
    'withSelectedState',
  );

  return WithSelectedState;
};
