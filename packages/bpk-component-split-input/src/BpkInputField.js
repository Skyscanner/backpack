import React, { Component } from 'react';
import BpkInput from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';
import PropTypes from 'prop-types';

import STYLES from './BpkInputField.module.scss';

const className = cssModules(STYLES);

class BpkInputField extends Component {
  componentDidUpdate(prevProps) {
    const { focus } = this.props;
    if (prevProps.focus !== focus && this.input && focus) {
      this.input.focus();
      this.input.select();
    }
  }

  render() {
    const { focus, id, index, label, value, ...rest } = this.props;
    return (
      <div key={index} className={className('BpkInputField')}>
        <BpkInput
          id={id}
          autoComplete="off"
          maxLength="1"
          aria-label={`${label} ${index}`}
          inputRef={(input) => {
            this.input = input;
          }}
          value={value || ''}
          {...rest}
        />
      </div>
    );
  }
}

BpkInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  focus: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

BpkInputField.defaultProps = {
  value: '',
};

export default BpkInputField;
