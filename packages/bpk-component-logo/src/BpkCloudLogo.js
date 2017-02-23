import React, { PropTypes } from 'react';
import { colorGray700, spacingXxl } from 'bpk-tokens/tokens/base.es6';
import CloudLogo from 'bpk-svgs/dist/js/logos/cloud';

const BpkCloudLogo = props => <CloudLogo fill={props.fill} height={props.height} />;

BpkCloudLogo.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
};

BpkCloudLogo.defaultProps = {
  fill: colorGray700,
  height: spacingXxl,
};

export default BpkCloudLogo;
