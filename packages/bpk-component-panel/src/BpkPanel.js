import PropTypes from 'prop-types';
import React from 'react';

import './bpk-panel.scss';

const BpkPanel = (props) => {
  const classNames = ['bpk-panel'];
  const { children, className, padded, fullWidth, ...rest } = props;

  if (padded) { classNames.push('bpk-panel--padded'); }
  if (fullWidth) { classNames.push('bpk-panel--full-width'); }
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
