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



import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';

import { GoogleMap } from '@react-google-maps/api';

import { cssModules } from '../../bpk-react-utils';

import { LatLongPropType, } from './common-types';

import STYLES from './BpkMap.module.scss';

const getClassName = cssModules(STYLES);





type LatLong = {
  latitude: number;
  longitude: number;
};

type Bounds = {
  south: number;
  west: number;
  north: number;
  east: number;
};

type MapOptionStyle = {
  featureType?: string;
  elementType?: string;
  stylers: Record<string, unknown>[];
};

type Props = {
  bounds?: Bounds | null;
  center?: LatLong;
  children?: React.ReactNode;
  greedyGestureHandling?: boolean;
  mapRef?: ((map: google.maps.Map | null) => void) | null;
  className?: string | null;
  onRegionChange?: ((bounds: google.maps.LatLngBounds | undefined, center: google.maps.LatLng | undefined) => void) | null;
  onZoom?: ((zoom: number | undefined) => void) | null;
  onTilesLoaded?: (() => void) | null;
  panEnabled?: boolean;
  showControls?: boolean;
  zoom?: number;
  mapOptionStyles?: MapOptionStyle[] | null;
  mapId?: string | null;
};

const BpkMap = (props: Props) => {
  const {
    bounds,
    center,
    children,
    className,
    greedyGestureHandling,
    mapId,
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

  const ref = useRef<google.maps.Map | null>(null);
  const mapContainerClassName = getClassName('bpk-map', className);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
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
        // If you want to set style by mapId, you should remove the styles property: https://developers.google.com/maps/documentation/get-map-id#javascript
        mapId,
        gestureHandling,
        disableDefaultUI: !showControls,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
        clickableIcons: false,
        // https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeStyle
        styles: mapOptionStyles,
        scaleControl: true,
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
  /**
   * Note: One of `bounds` and `center` must be provided.
   */
  bounds: PropTypes.shape({
    south: PropTypes.number.isRequired,
    west: PropTypes.number.isRequired,
    north: PropTypes.number.isRequired,
    east: PropTypes.number.isRequired,
  }),
  /**
   * Note: One of `bounds` and `center` must be provided.
   */
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
  mapId: PropTypes.string,
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
  mapId: null,
};

export default BpkMap;
