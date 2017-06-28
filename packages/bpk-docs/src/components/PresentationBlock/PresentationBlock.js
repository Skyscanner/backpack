import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './presentation-block.scss';

const getClassName = cssModules(STYLES);

const PresentationBlock = (props) => {
  const classNames = [getClassName('bpkdocs-presentation-block')];
  const { className, ...rest } = props;

  if (className) { classNames.push(className); }

  return (
    <section className={classNames.join(' ')} {...rest} />
  );
};

PresentationBlock.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

PresentationBlock.defaultProps = {
  className: null,
};

export default PresentationBlock;
