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

import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Portal from './Portal';
import TransitionInitialMount from './TransitionInitialMount';
import withDefaultProps from './withDefaultProps';

describe('Portal accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <Portal isOpen={false}>
        <div>My portal content</div>
      </Portal>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('TransitionInitialMount accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <TransitionInitialMount
        appearClassName="block--appear"
        appearActiveClassName="block--apear-active"
        transitionTimeout={250}
      >
        <p>My transition</p>
      </TransitionInitialMount>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('withDefaultProps accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const TestComponent = (props) => <div {...props} />;

    const Component = withDefaultProps(TestComponent, {
      a: 1,
      b: 2,
      c: { d: 3 },
    });
    const { container } = render(
      <Component>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </Component>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
