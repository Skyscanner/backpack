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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import dataProp from './customPropTypes';

import STYLES from './bpk-chart-data-table.css';

const getClassName = cssModules(STYLES);

const BpkChartDataTable = props => {
  const { data, xAxisLabel, yAxisLabel, xScaleDataKey, yScaleDataKey } = props;
  const rows = data.map((point, i) => {
    const key = `chart-data-table-row-${i}`;

    return (
      <tr key={key}>
        <td>{point[xScaleDataKey]}</td>
        <td>{point[yScaleDataKey]}</td>
      </tr>
    );
  });

  return (
    <table className={getClassName('bpk-chart-data-table')}>
      <thead>
        <tr>
          <th>{xAxisLabel}</th>
          <th>{yAxisLabel}</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

BpkChartDataTable.propTypes = {
  data: dataProp, // This is actually required and will fail if not present
  xScaleDataKey: PropTypes.string.isRequired,
  yScaleDataKey: PropTypes.string.isRequired,
  xAxisLabel: PropTypes.string.isRequired,
  yAxisLabel: PropTypes.string.isRequired,
};

BpkChartDataTable.defaultProps = {
  data: null,
};

export default BpkChartDataTable;
