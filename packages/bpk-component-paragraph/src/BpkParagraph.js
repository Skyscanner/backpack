import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-paragraph.scss';

const getClassName = cssModules(STYLES);

const BpkParagraph = (props) => {
  const classNames = [getClassName('bpk-paragraph')];
  const { className, ...rest } = props;

  if (className) { classNames.push(className); }

  return <p className={classNames.join(' ')} {...rest} />;
};

BpkParagraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BpkParagraph.defaultProps = {
  className: null,
};

export default BpkParagraph;

