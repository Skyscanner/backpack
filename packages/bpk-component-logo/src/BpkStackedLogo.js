import React, { PropTypes } from 'react';
import TOKENS from 'bpk-tokens/tokens/base.common';
import StackedLogo from 'bpk-svgs/dist/js/logos/stacked';

const BpkStackedLogo = props => <StackedLogo fill={props.fill} height={props.height} />;

BpkStackedLogo.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
};

BpkStackedLogo.defaultProps = {
  fill: TOKENS.colorGray700,
  height: TOKENS.spacingXxl,
};

export default BpkStackedLogo;
