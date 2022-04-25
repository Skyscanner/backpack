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

/* @flow strict */

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { OverlayView } from '@react-google-maps/api';

import { LatLongPropType, type LatLong } from './common-types';

type Props = {
  children: Node,
  position: LatLong,
};

const BpkOverlayView = (props: Props) => {
  const { children, position, ...rest } = props;
  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <OverlayView
      mapPaneName="overlayMouseTarget"
      position={{ lat: position.latitude, lng: position.longitude }}
      {...rest}
    >
      {children}
    </OverlayView>
  );
};
BpkOverlayView.propTypes = {
  children: PropTypes.node.isRequired,
  position: LatLongPropType.isRequired,
};

export default BpkOverlayView;
