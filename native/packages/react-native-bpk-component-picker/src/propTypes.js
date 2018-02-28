import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const PickerItem = PropTypes.shape({
  value: PropTypes.any,
  label: PropTypes.string,
  hint: PropTypes.string,
  pickerLabel: PropTypes.string,
});

export const defaultProps = {
  ref: () => null,
  onSelectionChange: () => null,
  options: [],
  selectedOption: null,
  label: '',
  style: null,
  valid: null,
  validationMessage: '',
  onFocus: () => null,
  onBlur: () => null,
};

export const propTypes = {
  ref: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(PickerItem),
  selectedOption: PropTypes.oneOfType([
    PropTypes.instanceOf(PickerItem),
    PropTypes.string,
  ]),
  onSelectionChange: PropTypes.func,
  label: PropTypes.string,
  style: ViewPropTypes.style,
  valid: PropTypes.oneOf(true, false, null),
  validationMessage: PropTypes.string,
};
