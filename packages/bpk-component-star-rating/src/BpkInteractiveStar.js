import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from 'bpk-react-utils';
import BpkStar, { STAR_TYPES } from './BpkStar';

import STYLES from './BpkInteractiveStar.scss';

const getClassName = cssModules(STYLES);

const BpkInteractiveStar = (props) => {
  const { selected, type, name, value, onClick, onMouseEnter, label, ...rest } = props;
  const buttonClassNames = [getClassName('bpk-interactive-star')];
  const iconClassNames = [getClassName('bpk-interactive-star__icon')];

  if (selected) {
    buttonClassNames.push(getClassName('bpk-interactive-star--selected'));
    iconClassNames.push(getClassName('bpk-interactive-star__icon--selected'));
  }

  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={buttonClassNames.join(' ')}
      aria-pressed={selected}
      type="button"
    >
      <BpkStar
        className={iconClassNames.join(' ')}
        type={type}
        {...rest}
      />
    </button>
  );
};

BpkInteractiveStar.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    STAR_TYPES.EMPTY,
    STAR_TYPES.FULL,
  ]).isRequired,
  value: PropTypes.number.isRequired,
  selected: PropTypes.bool,
};

BpkInteractiveStar.defaultProps = {
  selected: false,
};

export default BpkInteractiveStar;
