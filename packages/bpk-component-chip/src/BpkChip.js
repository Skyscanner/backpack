import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkCloseButton from 'bpk-component-close-button';

import STYLES from './bpk-chip.scss';

const getClassName = cssModules(STYLES);

const BpkChip = (props) => {
  const { children, onClose, ...rest } = props;

  return (
    <div
      className={getClassName('bpk-chip')}
      {...rest}
    >
      <span className={getClassName('bpk-chip__label')} >
        {children}
      </span>
      <BpkCloseButton
        label={`close ${children.toString().toLowerCase()}`}
        onClick={onClose}
      />
    </div>
  );
};

BpkChip.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BpkChip;
