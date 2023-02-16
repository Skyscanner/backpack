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

import { render } from '@testing-library/react';

import BpkPanel from './BpkPanel';

describe('BpkPanel', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkPanel>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with padded attribute', () => {
    const { asFragment } = render(
      <BpkPanel padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with fullWidth attribute', () => {
    const { asFragment } = render(
      <BpkPanel fullWidth>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with className attribute', () => {
    const { asFragment } = render(
      <BpkPanel className="custom-class">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
