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
/* @flow */

import React, { type AbstractComponent } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

type InjectedProps = {|
  onLoad: () => mixed,
  loading: boolean,
|};

export default function withLoadingBehavior<Config>(
  Component: AbstractComponent<{| ...Config, ...InjectedProps |}>,
): AbstractComponent<Config> {
  class WithLoadingBehavior<C: Config> extends React.Component<
    C,
    {| loading: boolean |},
  > {
    constructor() {
      super();

      this.state = {
        loading: true,
      };
    }

    onLoad = () => {
      this.setState(() => ({
        loading: false,
      }));
    };

    render() {
      return (
        <Component
          onLoad={this.onLoad}
          loading={this.state.loading}
          {...this.props}
        />
      );
    }
  }
  WithLoadingBehavior.displayName = wrapDisplayName(
    Component,
    'withLoadingBehavior',
  );

  return WithLoadingBehavior;
}
