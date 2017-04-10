import React, { PropTypes } from 'react';

import './bpk-card.scss';

const BpkCardTicket = (props) => {
  const classNames = ['bpk-card-ticket'];
  const { children, href, padded, stub, vertical, ...rest } = props;

  if (padded) { classNames.push('bpk-card-ticket--padded'); }
  if (vertical) {
    classNames.push('bpk-card-ticket--vertical');
  } else {
    classNames.push('bpk-card-ticket--horizontal');
  }

  const classNameFinal = classNames.join(' ');

  if (href) {
    return <a href={href} className={classNameFinal} {...rest}>{children}</a>;
  }

  return (
    <div role="button" className={classNameFinal} {...rest}>
      <div className="bpk-card-ticket__main">
        {children}
      </div>
      <div className="bpk-card-ticket__punchline">
        <div className="bpk-card-ticket__notch--start" />
        <div className="bpk-card-ticket__notch--end" />
      </div>
      <div className="bpk-card-ticket__stub">
        {stub}
      </div>
    </div>
  );
};

BpkCardTicket.propTypes = {
  children: PropTypes.node.isRequired,
  stub: PropTypes.node.isRequired,
  href: PropTypes.string,
  padded: PropTypes.bool,
  vertical: PropTypes.bool,
};

BpkCardTicket.defaultProps = {
  href: null,
  padded: true,
  vertical: false,
};

export default BpkCardTicket;
