/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React, {
  Component,
  cloneElement,
  type Element,
  type ComponentType,
} from 'react';

import BpkNavigationStack, {
  type Views,
  type Props as BpkNavigationStackProps,
} from './BpkNavigationStack';

export type Props = {
  ...$Diff<$Exact<BpkNavigationStackProps>, { views: Views }>,
  initialViews: Views,
};

type State = {
  views: Views,
};

export default (
  Stack: ComponentType<any>, // TODO: Improve type
  assignCallbacksToChildren: boolean = true,
) => {
  class WithNavigationStackState extends Component<Props, State> {
    static defaultProps = {
      ...BpkNavigationStack.defaultProps,
    };

    constructor(props: Props) {
      super(props);

      this.state = {
        views: this.props.initialViews,
      };
    }

    pushView = (view: Element<any>) => {
      this.setState(prevState => {
        const views = prevState.views.slice();
        views.push(view);

        return {
          views,
        };
      });
    };

    popView = () => {
      this.setState(prevState => {
        const views = prevState.views.slice();
        views.pop();

        return {
          views,
        };
      });
    };

    render() {
      const {
        initialViews, // unused
        ...rest
      } = this.props;

      const callbacks = {
        pushView: this.pushView,
        popView: this.popView,
      };

      const [views, optionalCallbacks] = assignCallbacksToChildren
        ? [this.state.views.map(view => cloneElement(view, callbacks)), {}]
        : [this.state.views, callbacks];

      return <Stack views={views} {...optionalCallbacks} {...rest} />;
    }
  }

  return WithNavigationStackState;
};
