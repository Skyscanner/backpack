import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-list.scss';

const getClassName = cssModules(STYLES);

const BpkList = (props) => {
  const TagName = props.ordered ? 'ol' : 'ul';

  return <TagName className={getClassName('bpk-list')}>{props.children}</TagName>;
};

BpkList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  ordered: PropTypes.bool,
};

BpkList.defaultProps = {
  ordered: false,
};

export default (BpkList);
