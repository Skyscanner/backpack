import React, { PropTypes } from 'react';
import BpkButton from 'bpk-component-button';
import { withButtonAlignment } from 'bpk-component-icon';
import MinusIcon from 'bpk-component-icon/sm/minus';
import PlusIcon from 'bpk-component-icon/sm/plus';
import clamp from 'lodash.clamp';

import './bpk-nudger.scss';

const AlignedMinusIcon = withButtonAlignment(MinusIcon);
const AlignedPlusIcon = withButtonAlignment(PlusIcon);

const BpkNudger = (props) => {
  const {
    id,
    min,
    max,
    value,
    onChange,
    className,
    increaseButtonLabel,
    decreaseButtonLabel,
  } = props;
  const classNames = ['bpk-nudger'];
  if (className) { classNames.push(className); }

  const adjustedValue = Math.floor(clamp(value, min, max));
  const decreaseDisabled = adjustedValue <= min;
  const increaseDisabled = adjustedValue >= max;

  const minusIconClassNames = ['bpk-nudger__icon'];
  if (decreaseDisabled) { minusIconClassNames.push('bpk-nudger__icon--disabled'); }
  const plusIconClassNames = ['bpk-nudger__icon'];
  if (increaseDisabled) { plusIconClassNames.push('bpk-nudger__icon--disabled'); }

  return (
    <div className={classNames.join(' ')}>
      <BpkButton
        secondary
        iconOnly
        onClick={() => onChange(clamp(adjustedValue - 1, min, max))}
        disabled={decreaseDisabled}
        title={decreaseButtonLabel}
        aria-controls={id}
      >
        <AlignedMinusIcon className={minusIconClassNames.join(' ')} />
      </BpkButton>
      <input
        type="text"
        role="alert"
        aria-live="assertive"
        readOnly
        value={adjustedValue}
        id={id}
        className="bpk-nudger__input"
      />
      <BpkButton
        secondary
        iconOnly
        onClick={() => onChange(clamp(adjustedValue + 1, min, max))}
        disabled={increaseDisabled}
        title={increaseButtonLabel}
        aria-controls={id}
      >
        <AlignedPlusIcon className={plusIconClassNames.join(' ')} />
      </BpkButton>
    </div>
  );
};

BpkNudger.propTypes = {
  id: PropTypes.string.isRequired,
  decreaseButtonLabel: PropTypes.string.isRequired,
  increaseButtonLabel: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BpkNudger.defaultProps = {
  className: null,
};

export default BpkNudger;
