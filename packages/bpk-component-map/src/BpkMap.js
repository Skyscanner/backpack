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

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { LatLongPropType, type LatLong } from './common-types';

export type Bounds = {
  south: number,
  west: number,
  north: number,
  east: number,
};

export type MapRef = ?{
  getBounds: () => Bounds,
  getCenter: () => LatLong,
  getZoom: () => number,
  fitBounds: Bounds => void,
};

type Props = {
  panEnabled: boolean,
  showControls: boolean,
  zoom: number,
  bounds: ?Bounds,
  center: ?LatLong,
  children: ?Node,
  containerElement: ?Node,
  mapElement: ?Node,
  mapRef: ?(MapRef) => mixed,
  onRegionChange: ?(Bounds, LatLong) => mixed,
  onZoom: ?(number) => mixed,
};

const BpkMap = withGoogleMap((props: Props) => {
  const {
    bounds,
    children,
    mapRef,
    onRegionChange,
    onZoom,
    center,
    panEnabled,
    showControls,
    zoom,
  } = props;
  let ref: MapRef = null;

  if (!bounds && !center) {
    throw new Error('BpkMap: Provide either `bounds` or `center` props.');
  }

  return (
    <GoogleMap
      ref={(map: MapRef) => {
        ref = map;
        if (map && bounds) {
          map.fitBounds({
            south: bounds.south,
            west: bounds.west,
            north: bounds.north,
            east: bounds.east,
          });
        }
        if (mapRef) {
          mapRef(map);
        }
      }}
      defaultCenter={
        center
          ? {
              lat: center.latitude,
              lng: center.longitude,
            }
          : null
      }
      defaultZoom={zoom}
      options={{
        gestureHandling: panEnabled ? 'auto' : 'none',
        disableDefaultUI: !showControls,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
      }}
      onDragEnd={() => {
        if (ref && onRegionChange) {
          onRegionChange(ref.getBounds(), ref.getCenter());
        }
      }}
      onZoomChanged={() => {
        if (ref && onZoom) {
          onZoom(ref.getZoom());
        }
      }}
    >
      {children}
    </GoogleMap>
  );
});

BpkMap.propTypes = {
  bounds: PropTypes.shape({
    south: PropTypes.number.isRequired,
    west: PropTypes.number.isRequired,
    north: PropTypes.number.isRequired,
    east: PropTypes.number.isRequired,
  }),
  center: LatLongPropType,
  children: PropTypes.node,
  containerElement: PropTypes.node,
  mapElement: PropTypes.node,
  mapRef: PropTypes.func,
  onRegionChange: PropTypes.func,
  onZoom: PropTypes.func,
  panEnabled: PropTypes.bool,
  showControls: PropTypes.bool,
  zoom: PropTypes.number,
};

BpkMap.defaultProps = {
  bounds: null,
  center: null,
  children: null,
  containerElement: <div style={{ height: '100%' }} />,
  mapElement: <div style={{ height: '100%' }} />,
  mapRef: null,
  onRegionChange: null,
  onZoom: null,
  panEnabled: true,
  showControls: true,
  zoom: 15,
};

export default BpkMap;
