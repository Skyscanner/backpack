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

import React from 'react';
import { Column } from 'react-virtualized';
import { spacingSm } from 'bpk-tokens/tokens/base.es6';
import BpkDataTableColumn from './BpkDataTableColumn';
import bpkHeaderRenderer from './bpkHeaderRenderer';

const defaultProps = { label: 'Name', dataKey: 'name', width: spacingSm };

describe('BpkDataTableColumn', () => {
  it('has the same propTypes as react-virtualized Column', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    expect(BpkDataTableColumn.propTypes).toEqual(Column.propTypes);
  });

  it('has the same defaultProps as react-virtualized Column, with the exception of headerRenderer', () => {
    expect(BpkDataTableColumn.defaultProps).toEqual({
      ...Column.defaultProps,
      headerRenderer: bpkHeaderRenderer,
    });
  });

  describe('toColumn', () => {
    const toColumn = (props = {}) =>
      BpkDataTableColumn.toColumn(
        <BpkDataTableColumn {...defaultProps} {...props} />,
      );

    it('creates a react-virtualized Column', () => {
      const { type } = toColumn();
      expect(type).toBe(Column);
    });

    it('sets a default className', () => {
      const { props } = toColumn();
      expect(props.className).toBe('bpk-data-table-column');
    });

    it('adds additional classNames', () => {
      const { props } = toColumn({ className: 'custom-class-name' });
      expect(props.className).toBe('bpk-data-table-column custom-class-name');
    });

    it('passess all additional props', () => {
      const additionalProps = { something: 1, somethingFn: () => true };
      const { props } = toColumn(additionalProps);
      expect(props).toEqual(expect.objectContaining(additionalProps));
    });
  });
});
