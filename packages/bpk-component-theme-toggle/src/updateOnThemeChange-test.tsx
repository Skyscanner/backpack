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

import PropTypes from 'prop-types';

import { render, fireEvent } from '@testing-library/react';

import updateOnThemeChange from './updateOnThemeChange';
import { THEME_CHANGE_EVENT, getHtmlElement } from './utils';

const Dummy = ({
  children
}: any) => <div>{children}</div>;

const EnhancedComponent = updateOnThemeChange(Dummy);

describe('EnhancedComponent', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <EnhancedComponent>
        <p>Children</p>
      </EnhancedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should force an update when receiving a theme change event', () => {
    render(
      <EnhancedComponent>
        <p />
      </EnhancedComponent>,
    );

    const forceUpdateSpy = jest.spyOn(
      EnhancedComponent.prototype,
      'forceUpdate',
    );
    expect(forceUpdateSpy).not.toHaveBeenCalled();

    fireEvent(
      // @ts-expect-error TS(2345): Argument of type '{} | null' is not assignable to ... Remove this comment to see the full error message
      getHtmlElement(),
      new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme: null } }),
    );

    expect(forceUpdateSpy).toHaveBeenCalled();
  });
});

Dummy.propTypes = {
  children: PropTypes.node.isRequired,
};
