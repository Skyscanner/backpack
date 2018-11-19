import React from 'react';

import { cssModules } from 'bpk-react-utils';

import STYLES from './MonthPlaceholder.scss';

const getClassName = cssModules(STYLES);

const MonthPlaceholder = () => (
  <div className={getClassName('bpk-scrollable-calendar-placeholder')}>
    <div
      className={getClassName('bpk-scrollable-calendar-placeholder__title')}
    />
    <div
      className={getClassName('bpk-scrollable-calendar-placeholder__item')}
    />
  </div>
);

export default MonthPlaceholder;
