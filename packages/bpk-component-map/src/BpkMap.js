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

import React, { type Node, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap } from '@react-google-maps/api';

import { cssModules } from '../../bpk-react-utils';

import { LatLongPropType, type LatLong } from './common-types';
import STYLES from './BpkMap.module.scss';

const getClassName = cssModules(STYLES);

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
  fitBounds: (Bounds) => void,
};

type MapOptionStyle = {
  featureType: ?string,
  elementType: ?string,
  stylers: Array<{
    [string]: string,
  }>,
};

type Props = {
  greedyGestureHandling: boolean,
  panEnabled: boolean,
  showControls: boolean,
  zoom: number,
  bounds: ?Bounds,
  center: ?LatLong,
  children: ?Node,
  mapRef: ?(MapRef) => mixed,
  onRegionChange: ?(Bounds, LatLong) => mixed,
  onZoom: ?(number) => mixed,
  onTilesLoaded: ?() => void,
  className: ?string,
  mapOptionStyles: ?Array<MapOptionStyle>,
};

const BpkMap = (props: Props) => {
  const {
    bounds,
    center,
    children,
    className,
    greedyGestureHandling,
    mapOptionStyles,
    mapRef,
    onRegionChange,
    onTilesLoaded,
    onZoom,
    panEnabled,
    showControls,
    zoom,
  } = props;

  if (!bounds && !center) {
    throw new Error('BpkMap: Provide either `bounds` or `center` props.');
  }

  // https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.gestureHandling
  let gestureHandling = 'auto';
  if (!panEnabled) {
    gestureHandling = 'none';
  } else if (greedyGestureHandling) {
    gestureHandling = 'greedy';
  }

  const ref = useRef(null);
  const mapContainerClassName = getClassName('bpk-map', className);

  const onLoad = useCallback(
    (map) => {
      ref.current = map;
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
    },
    [bounds, mapRef],
  );

  return (
    <GoogleMap
      onLoad={onLoad}
      center={
        center
          ? {
              lat: center.latitude,
              lng: center.longitude,
            }
          : undefined
      }
      zoom={zoom}
      options={{
        gestureHandling,
        disableDefaultUI: !showControls,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
        clickableIcons: false,
        // https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeStyle
        styles: mapOptionStyles,
      }}
      onDragEnd={() => {
        if (ref && ref.current && onRegionChange) {
          onRegionChange(ref.current.getBounds(), ref.current.getCenter());
        }
      }}
      onZoomChanged={() => {
        if (ref && ref.current && onZoom) {
          onZoom(ref.current.getZoom());
        }
      }}
      onTilesLoaded={() => {
        if (onTilesLoaded) {
          onTilesLoaded();
        }
      }}
      mapContainerClassName={mapContainerClassName}
    >
      {children}
    </GoogleMap>
  );
};

BpkMap.propTypes = {
  bounds: PropTypes.shape({
    south: PropTypes.number.isRequired,
    west: PropTypes.number.isRequired,
    north: PropTypes.number.isRequired,
    east: PropTypes.number.isRequired,
  }),
  center: LatLongPropType,
  children: PropTypes.node,
  greedyGestureHandling: PropTypes.bool,
  mapRef: PropTypes.func,
  className: PropTypes.string,
  onRegionChange: PropTypes.func,
  onZoom: PropTypes.func,
  panEnabled: PropTypes.bool,
  showControls: PropTypes.bool,
  onTilesLoaded: PropTypes.func,
  zoom: PropTypes.number,
  mapOptionStyles: PropTypes.arrayOf(
    PropTypes.shape({
      featureType: PropTypes.string,
      elementType: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      stylers: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
  ),
};

BpkMap.defaultProps = {
  bounds: null,
  center: undefined,
  children: null,
  greedyGestureHandling: false,
  mapRef: null,
  onRegionChange: null,
  onZoom: null,
  onTilesLoaded: null,
  panEnabled: true,
  showControls: true,
  zoom: 15,
  className: null,
  mapOptionStyles: null,
};

export default BpkMap;
