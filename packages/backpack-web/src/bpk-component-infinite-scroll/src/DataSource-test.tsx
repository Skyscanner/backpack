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

import DataSource, { ArrayDataSource } from './DataSource';

const withCommonTests = (createNewInstance: any, extraTests: any) => {
  let dataSource: any;

  beforeEach(() => {
    dataSource = createNewInstance();
  });

  it('can add listeners', () => {
    const f = () => {};
    expect(dataSource.onDataChange(f)).toBe(true);
  });

  it('can remove listeners', () => {
    const f = () => {};
    dataSource.onDataChange(f);
    expect(dataSource.removeListener(f)).toBe(true);
  });

  it('can execute listeners', () => {
    const f = jest.fn();
    dataSource.onDataChange(f);
    dataSource.triggerListeners(1);
    expect(f).toHaveBeenCalledWith(1);
  });

  it('returns false when adding duplicated listeners', () => {
    const f = () => {};
    expect(dataSource.onDataChange(f)).toBe(true);
    expect(dataSource.onDataChange(f)).toBe(false);
  });

  it('returns false when deleting invalid listeners', () => {
    const f = () => {};
    const x = () => {};
    dataSource.onDataChange(f);
    expect(dataSource.removeListener(x)).toBe(false);
  });

  if (extraTests) {
    extraTests(() => dataSource);
  }
};

describe('DataSource', () => {
  withCommonTests(
    () => new DataSource(),
    (getDs: any) => {
      it('throws an error when fetchItems is called directly', () => {
        expect(() => getDs().fetchItems()).toThrow(/Not implemented/);
      });
    },
  );
});

describe('ArrayDataSource', () => {
  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  withCommonTests(
    () => new ArrayDataSource(elements),
    (getDs: any) => {
      describe('fetchItems', () => {
        it('fetches items correctly', async () => {
          expect(await getDs().fetchItems(0, 5)).toEqual([1, 2, 3, 4, 5]);
          expect(await getDs().fetchItems(5, 5)).toEqual([6, 7, 8, 9, 10]);
          expect(await getDs().fetchItems(1, 3)).toEqual([2, 3, 4]);
          expect(await getDs().fetchItems(0, 15)).toEqual(elements);
        });

        it('handles invalid arguments', async () => {
          expect(await getDs().fetchItems(-1, 2)).toEqual([1, 2]);
          expect(await getDs().fetchItems(10, 2)).toEqual([]);
          expect(await getDs().fetchItems(11, 2)).toEqual([]);
          expect(await getDs().fetchItems(0, -2)).toEqual([]);
        });
      });
    },
  );
});
