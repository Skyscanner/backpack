import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-blockquote.scss';

const getClassName = cssModules(STYLES);

const BpkBlockquote = props => <blockquote className={getClassName('bpk-blockquote')}>{props.children}</blockquote>;

BpkBlockquote.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BpkBlockquote;
