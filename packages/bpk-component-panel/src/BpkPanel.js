import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-panel.scss';

const getClassName = cssModules(STYLES);

const BpkPanel = (props) => {
  const classNames = [getClassName('bpk-panel')];
  const { children, className, padded, fullWidth, ...rest } = props;

  if (padded) { classNames.push(getClassName('bpk-panel--padded')); }
  if (fullWidth) { classNames.push(getClassName('bpk-panel--full-width')); }
  if (className) { classNames.push(className); }

  return (
    <section className={classNames.join(' ')} {...rest}>
      {children}
    </section>
  );
};

BpkPanel.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

BpkPanel.defaultProps = {
  padded: true,
  fullWidth: false,
  className: null,
};

export default BpkPanel;
