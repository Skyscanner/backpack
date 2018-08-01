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

import DataSource from './DataSource';

describe('DataSource', () => {
  let dataSource;

  beforeEach(() => {
    dataSource = new DataSource();
  });

  it('can add listeners', () => {
    const f = () => {};
    expect(dataSource.listeners.length).toEqual(0);
    dataSource.onDataChange(f);
    expect(dataSource.listeners.length).toEqual(1);
  });

  it('can remove listeners', () => {
    const f = () => {};
    dataSource.listeners = [f];
    expect(dataSource.listeners.length).toEqual(1);
    dataSource.removeListener(f);
    expect(dataSource.listeners.length).toEqual(0);
  });

  it('can execute listeners', () => {
    const f = jest.fn();
    dataSource.listeners = [f];
    dataSource.triggerListeners(1);
    expect(f).toHaveBeenCalledWith(1);
  });
});
