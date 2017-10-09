import React from 'react';
import { Column } from 'react-virtualized';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-column.scss';

const getClassName = cssModules(STYLES);

const BpkColumn = props => <Column className={getClassName('bpk-column')} {...props} />;

export default BpkColumn;