/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React from 'react';
import { TransitionInitialMount, cssModules } from 'bpk-react-utils';

import STYLES from './bpk-scrim.scss';

const getClassName = cssModules(STYLES);

const BpkScrim = (props) => {
  const classNames = [getClassName('bpk-scrim')];

  if (props.hideBackgroundOnMobile) {
    classNames.push(getClassName('bpk-scrim--hide-background'));
  }

  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-scrim--appear')}
      appearActiveClassName={getClassName('bpk-scrim--appear-active')}
      transitionTimeout={200}
    >
      <div className={classNames.join(' ')} />
    </TransitionInitialMount>
  );
};

BpkScrim.propTypes = {
  hideBackgroundOnMobile: PropTypes.bool,
};

BpkScrim.defaultProps = {
  hideBackgroundOnMobile: false,
};

export default BpkScrim;
