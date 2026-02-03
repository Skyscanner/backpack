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
// @ts-nocheck

import type { ComponentType, ReactNode } from 'react';
import { Component } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';

import type { Theme } from './theming';

type ThemeChangeEvent = CustomEvent<{ theme: Theme | null }>;

type UpdateOnThemeChangeProps = {
  children: ReactNode;
};

type UpdateOnThemeChangeState = {
  theme: Theme | null;
};

const updateOnThemeChange = <P extends object>(
  EnhancedComponent: ComponentType<P & { theme: Theme | null }>,
) => {
  class UpdateOnThemeChange extends Component<
    P & UpdateOnThemeChangeProps,
    UpdateOnThemeChangeState
  > {
    public static displayName: string;

    constructor(props: P & UpdateOnThemeChangeProps) {
      super(props);
      this.state = {
        theme: null,
      };
    }

    componentDidMount() {
      const htmlElement = getHtmlElement();
      if (htmlElement) {
        htmlElement.addEventListener(
          THEME_CHANGE_EVENT,
          this.onThemeChange as (event: Event) => void,
          false,
        );
      }
    }

    componentWillUnmount() {
      const htmlElement = getHtmlElement();
      if (htmlElement) {
        htmlElement.removeEventListener(
          THEME_CHANGE_EVENT,
          this.onThemeChange as (event: Event) => void,
          false,
        );
      }
    }

    onThemeChange = (e: ThemeChangeEvent) => {
      const { theme } = e.detail;
      this.setState({ theme });
      this.forceUpdate();
    };

    render() {
      return <EnhancedComponent theme={this.state.theme} {...this.props} />;
    }
  }

  UpdateOnThemeChange.displayName = wrapDisplayName(
    EnhancedComponent,
    'updateOnThemeChange',
  );

  return UpdateOnThemeChange;
};

export default updateOnThemeChange;
