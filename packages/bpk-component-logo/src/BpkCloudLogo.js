import React, { PropTypes } from 'react';
import TOKENS from 'bpk-tokens/tokens/base.common';
import CloudLogo from 'bpk-svgs/dist/js/logos/cloud';

const BpkCloudLogo = props => <CloudLogo fill={props.fill} height={props.height} />;

BpkCloudLogo.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
};

BpkCloudLogo.defaultProps = {
  fill: TOKENS.colorGray700,
  height: TOKENS.spacingXxl,
};

export default BpkCloudLogo;
