import React, { PropTypes } from 'react';

import './bpk-popover.scss';

const BpkPopover = (props) => {
  const classNames = ['bpk-popover'];
  const innerClassNames = ['bpk-popover__inner'];
  /* eslint-disable no-unused-vars */
  const { onClose, children, className, padded, ...rest } = props;
  /* eslint-enable */

  // outer classNames
  if (className) { classNames.push(className); }

  // inner classNames
  if (padded) { innerClassNames.push('bpk-popover__inner--padded'); }

  return (
    <section
      tabIndex="-1"
      className={classNames.join(' ')}
      {...rest}
    >
      <span className="bpk-popover__arrow" role="presentation" />
      <div className={innerClassNames.join(' ')}>
        {children}
      </div>
    </section>
  );
};

BpkPopover.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
};

BpkPopover.defaultProps = {
  className: null,
  padded: true,
};

export default BpkPopover;
