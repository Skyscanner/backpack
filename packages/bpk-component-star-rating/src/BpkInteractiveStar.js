import React from 'react';
import PropTypes from 'prop-types';

import BpkStar, { STAR_TYPES } from './BpkStar';
import './bpk-interactive-star.scss';

const BpkInteractiveStar = (props) => {
  const { selected, type, name, value, onChange, label, ...rest } = props;
  const classNames = ['bpk-interactive-star'];
  if (selected) { classNames.push('bpk-interactive-star--selected'); }

  return (
    <label aria-label={label} htmlFor={`${name}_${value}`}>
      <input
        type="radio"
        id={`${name}_${value}`}
        name={name}
        value={value}
        checked={selected}
        onChange={onChange}
        className="bpk-interactive-star__radio"
      />
      <BpkStar
        className={classNames.join(' ')}
        type={type}
        {...rest}
      />
    </label>
  );
};

BpkInteractiveStar.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    STAR_TYPES.EMPTY,
    STAR_TYPES.FULL,
  ]).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
};

BpkInteractiveStar.defaultProps = {
  onChange: () => null,
  selected: false,
};

export default BpkInteractiveStar;
