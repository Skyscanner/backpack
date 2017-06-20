import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-list.scss';

const getClassName = cssModules(STYLES);

const BpkListItem = props => <li className={getClassName('bpk-list__item')}>{props.children}</li>;

BpkListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BpkListItem;
