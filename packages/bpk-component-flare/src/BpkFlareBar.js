/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './bpk-flare-bar.module.scss';
import Pointer from './__generated__/js/pointer';
import CornerRadius from './__generated__/js/corner-radius';

const getClassName = cssModules(STYLES);

const BpkFlareBar = (props) => {
  const { className, rounded, svgClassName, ...rest } = props;

  const classNames = [getClassName('bpk-flare-bar__container')];
  if (className) {
    classNames.push(className);
  }

  const curveClassNames = [getClassName('bpk-flare-bar__curve')];
  const leftCornerRadiusClassNames = [
    getClassName('bpk-flare-bar__rounded-corner'),
  ];
  const rightCornerRadiusClassNames = [
    getClassName('bpk-flare-bar__rounded-corner'),
    getClassName('bpk-flare-bar__rounded-corner--trailing'),
  ];
  if (svgClassName) {
    curveClassNames.push(svgClassName);
    leftCornerRadiusClassNames.push(svgClassName);
    rightCornerRadiusClassNames.push(svgClassName);
  }

  return (
    <div className={classNames.join(' ')} {...rest}>
      <Pointer className={curveClassNames.join(' ')} />
      {rounded && (
        <CornerRadius className={leftCornerRadiusClassNames.join(' ')} />
      )}
      {rounded && (
        <CornerRadius className={rightCornerRadiusClassNames.join(' ')} />
      )}
    </div>
  );
};

BpkFlareBar.propTypes = {
  className: PropTypes.string,
  svgClassName: PropTypes.string,
  rounded: PropTypes.bool,
};

BpkFlareBar.defaultProps = {
  className: null,
  svgClassName: null,
  rounded: false,
};

export default BpkFlareBar;
