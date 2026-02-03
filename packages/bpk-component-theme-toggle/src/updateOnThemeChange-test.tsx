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
import type { ReactNode } from 'react';

import { render, fireEvent } from '@testing-library/react';

import updateOnThemeChange from './updateOnThemeChange';
import { THEME_CHANGE_EVENT, getHtmlElement } from './utils';

type DummyProps = {
  children: ReactNode;
};

const Dummy = ({ children }: DummyProps) => <div>{children}</div>;

const EnhancedComponent = updateOnThemeChange(Dummy);

describe('EnhancedComponent', () => {
  it('should render correctly', () => {
    const { container } = render(
      <EnhancedComponent>
        <p>Children</p>
      </EnhancedComponent>,
    );
    
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(container.textContent).toBe('Children');
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

    const htmlElement = getHtmlElement();
    if (htmlElement) {
      fireEvent(
        htmlElement,
        new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme: null } }),
      );
    }

    expect(forceUpdateSpy).toHaveBeenCalled();
  });
});
