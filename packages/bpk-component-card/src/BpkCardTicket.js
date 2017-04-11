import React, { PropTypes } from 'react';

import './bpk-card.scss';

const BpkCardTicket = (props) => {
  const classNames = ['bpk-card-ticket'];
  const { children, href, padded, stub, vertical, className, ...rest } = props;

  if (padded) { classNames.push('bpk-card-ticket--padded'); }
  if (className) { classNames.push(className); }
  if (vertical) {
    classNames.push('bpk-card-ticket--vertical');
  } else {
    classNames.push('bpk-card-ticket--horizontal');
  }

  const classNameFinal = classNames.join(' ');

  const contents = [
    <div className="bpk-card-ticket__main">
      {children}
    </div>,
    <div
      className="bpk-card-ticket__punchline"
      role="presentation"
      aria-hidden="true"
    >
      <div className="bpk-card-ticket__notch--start" />
      <div className="bpk-card-ticket__notch--end" />
    </div>,
    <div className="bpk-card-ticket__stub">
      {stub}
    </div>,
  ];

  if (href) {
    return (
      <a href={href} className={classNameFinal} {...rest}>
        { contents }
      </a>
    );
  }

  return (
    <div role="button" className={classNameFinal} {...rest}>
      { contents }
    </div>
  );
};

BpkCardTicket.propTypes = {
  children: PropTypes.node.isRequired,
  stub: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  padded: PropTypes.bool,
  vertical: PropTypes.bool,
};

BpkCardTicket.defaultProps = {
  className: null,
  href: null,
  padded: true,
  vertical: false,
};

export default BpkCardTicket;
