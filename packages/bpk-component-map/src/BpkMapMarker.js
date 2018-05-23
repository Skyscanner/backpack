/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
/* @flow */

import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import { OverlayView } from 'react-google-maps';

export type Props = {
  children: Node,
  latitude: number,
  longitude: number,
  mapPaneName: string,
};

const BpkMapMarker = (props: Props) => {
  const { children, latitude, longitude, mapPaneName, ...rest } = props;
  return (
    <OverlayView
      mapPaneName={mapPaneName}
      position={{ lat: latitude, lng: longitude }}
      {...rest}
    >
      {children}
    </OverlayView>
  );
};

BpkMapMarker.propTypes = {
  children: PropTypes.node.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  mapPaneName: PropTypes.oneOf([
    'floatPane',
    'mapPane',
    'markerLayer',
    'overlayLayer',
    'overlayMouseTarget',
  ]),
};

BpkMapMarker.defaultProps = {
  mapPaneName: 'overlayMouseTarget',
};

export default BpkMapMarker;
