import PropTypes from 'prop-types';
import React from 'react';

import './bpk-ticket.scss';

const isIE9 = () => {
  if (typeof window === 'undefined') return false;
  return (window.navigator.appVersion.indexOf('MSIE 9.') !== -1);
};

const BpkTicket = (props) => {
  const { children, href, padded, stub, vertical, className, ...rest } = props;
  const classNames = ['bpk-ticket'];
  const mainClassNames = ['bpk-ticket__paper', 'bpk-ticket__main'];
  const stubClassNames = ['bpk-ticket__paper', 'bpk-ticket__stub'];
  const punchlineClassNames = ['bpk-ticket__punchline'];
  const startNotchClassNames = ['bpk-ticket__notch'];
  const endNotchClassNames = ['bpk-ticket__notch'];
  const fallback = isIE9();

  if (className) { classNames.push(className); }
  if (padded) {
    mainClassNames.push('bpk-ticket__main--padded');
    stubClassNames.push('bpk-ticket__stub--padded');
  }
  if (vertical) {
    classNames.push('bpk-ticket--vertical');
    mainClassNames.push('bpk-ticket__main--vertical');
    stubClassNames.push('bpk-ticket__stub--vertical');
    punchlineClassNames.push('bpk-ticket__punchline--horizontal');
    startNotchClassNames.push('bpk-ticket__notch--left');
    endNotchClassNames.push('bpk-ticket__notch--right');
  } else {
    mainClassNames.push('bpk-ticket__main--horizontal');
    stubClassNames.push('bpk-ticket__stub--horizontal');

    if (!fallback) {
      punchlineClassNames.push('bpk-ticket__punchline--vertical');
      startNotchClassNames.push('bpk-ticket__notch--top');
      endNotchClassNames.push('bpk-ticket__notch--bottom');
    } else {
      classNames.push('bpk-ticket--fallback');
      mainClassNames.push('bpk-ticket__paper--fallback');
      stubClassNames.push('bpk-ticket__paper--fallback', 'bpk-ticket__stub--fallback');
      punchlineClassNames.push('bpk-ticket__punchline--fallback');
    }
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

BpkTicket.propTypes = {
  children: PropTypes.node.isRequired,
  stub: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  padded: PropTypes.bool,
  vertical: PropTypes.bool,
};

BpkTicket.defaultProps = {
  className: null,
  href: null,
  padded: true,
  vertical: false,
};

export default BpkTicket;
