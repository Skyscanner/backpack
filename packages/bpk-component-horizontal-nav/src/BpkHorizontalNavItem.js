import React, { PropTypes } from 'react';

import './bpk-horizontal-nav.scss';

const BpkHorizontalNavItem = (props) => {
  const classNames = ['bpk-horizontal-nav__button'];
  const { className, selected, ...rest } = props;

  if (selected) { classNames.push('bpk-horizontal-nav__button--selected'); }
  if (className) { classNames.push(className); }

  return (
    <li className="bpk-horizontal-nav__item">
      <button type="button" className={classNames.join(' ')} {...rest} />
    </li>
  );
};

BpkHorizontalNavItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
};

BpkHorizontalNavItem.defaultProps = {
  className: null,
  selected: false,
};

export default BpkHorizontalNavItem;

