import React, { PropTypes } from 'react';

import './bpk-card.scss';

const BpkCardTicket = (props) => {
  const { children, href, padded, stub, vertical, className, ...rest } = props;
  const classNames = ['bpk-card-ticket'];
  const mainClassNames = ['bpk-card-ticket__main'];
  const stubClassNames = ['bpk-card-ticket__stub'];
  const punchlineClassNames = ['bpk-card-ticket__punchline'];
  const startNotchClassNames = ['bpk-card-ticket__notch'];
  const endNotchClassNames = ['bpk-card-ticket__notch'];

  if (className) { classNames.push(className); }
  if (padded) {
    mainClassNames.push('bpk-card-ticket__main--padded');
    stubClassNames.push('bpk-card-ticket__stub--padded');
  }
  if (vertical) {
    classNames.push('bpk-card-ticket--vertical');
    mainClassNames.push('bpk-card-ticket__main--vertical');
    stubClassNames.push('bpk-card-ticket__stub--vertical');
    punchlineClassNames.push('bpk-card-ticket__punchline--horizontal');
    startNotchClassNames.push('bpk-card-ticket__notch--left');
    endNotchClassNames.push('bpk-card-ticket__notch--right');
  } else {
    mainClassNames.push('bpk-card-ticket__main--horizontal');
    stubClassNames.push('bpk-card-ticket__stub--horizontal');
    punchlineClassNames.push('bpk-card-ticket__punchline--vertical');
    startNotchClassNames.push('bpk-card-ticket__notch--top');
    endNotchClassNames.push('bpk-card-ticket__notch--bottom');
  }

  const classNameFinal = classNames.join(' ');

  const contents = [
    <div
      key="main"
      className={mainClassNames.join(' ')}
    >
      {children}
    </div>,
    <div
      key="punchline"
      className={punchlineClassNames.join(' ')}
      role="presentation"
      aria-hidden="true"
    >
      <div className={startNotchClassNames.join(' ')} />
      <div className={endNotchClassNames.join(' ')} />
    </div>,
    <div
      key="stub"
      className={stubClassNames.join(' ')}
    >
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
