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

type InjectedProps = {
  onLoad: () => void;
  loading: boolean;
};

type State = {
  loading: boolean;
};

export default function withLoadingBehavior<P extends object>(
  WrappedComponent: ComponentType<P>,
) {
  class WithLoadingBehavior extends Component<
    Omit<P, keyof InjectedProps>,
    State
  > {
    public static displayName: string;

    constructor(props: Omit<P, keyof InjectedProps>) {
      super(props);

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
        <WrappedComponent onLoad={this.onLoad} loading {...(this.props as P)} />
      );
    }
  }
  WithLoadingBehavior.displayName = wrapDisplayName(
    WrappedComponent,
    'withLoadingBehavior',
  );

  return WithLoadingBehavior;
}
