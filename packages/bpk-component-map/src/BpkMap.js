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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { BpkSpinner } from 'bpk-component-spinner';
import { cssModules } from 'bpk-react-utils';
import STYLES from './bpk-map.scss';

const getClassName = cssModules(STYLES);

class BpkMap extends Component {
  constructor(props) {
    super(props);
  }

  handleMapLoad = (map) => {
    this.googleMap = map;
    const {
      boundSouth,
      boundWest,
      boundNorth,
      boundEast,
    } = this.props;
    if (boundSouth && boundWest && boundNorth && boundEast) {
      this.googleMap.fitBounds({
        south: boundSouth,
        west: boundWest,
        north: boundNorth,
        east: boundEast,
      });
    }
  };

  handleZoomChanged = (callback) => {
    if (callback) {
      const zoomLevel = this.googleMap.getZoom();
      callback(zoomLevel);
    }
  };

  handleDragEnd = (callback) => {
    if (callback) {
      const bounds = this.googleMap.getBounds();
      const center = this.googleMap.getCenter();
      callback(bounds, { lat: center.lat(), lng: center.lng() });
    }
  };

  render() {
    const {
      centerLatitude,
      centerLongitude,
      children,
      width,
      height,
      zoom,
      language,
      region,
      zoomEnabled,
      dragEnabled,
      onZoom,
      onDrag,
      ...rest
    } = this.props;
    const InnerMap = withScriptjs(withGoogleMap(() => (
      <GoogleMap
        ref={map => this.handleMapLoad(map)}
        defaultZoom={zoom}
        defaultCenter={{ lat: centerLatitude, lng: centerLongitude }}
        options={{
          zoomControl: zoomEnabled,
          draggable: dragEnabled,
        }}
        onZoomChanged={() => this.handleZoomChanged(onZoom)}
        onDragEnd={() => this.handleDragEnd(onDrag)}
        {...rest}
      >
        {children}
      </GoogleMap>
    )));

    return (
      <InnerMap
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjeijuDttvvujmN_XZB9304o3lPn6WGDM' +
        `&v=3.exp&libraries=geometry,drawing,places&language=${language}&region=${region}`}
        loadingElement={<BpkSpinner />}
        mapElement={<div style={{ width, height }} />}
        containerElement={<div className={getClassName('bpk-map__container')} />}
      />
    );
  }
}

BpkMap.propTypes = {
  children: PropTypes.node,
  language: PropTypes.string,
  region: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  zoom: PropTypes.number,
  centerLatitude: PropTypes.number,
  centerLongitude: PropTypes.number,
  boundSouth: PropTypes.number,
  boundWest: PropTypes.number,
  boundNorth: PropTypes.number,
  boundEast: PropTypes.number,
  zoomEnabled: PropTypes.bool,
  dragEnabled: PropTypes.bool,
  onZoom: PropTypes.func,
  onDrag: PropTypes.func,
};

BpkMap.defaultProps = {
  children: null,
  language: '',
  region: '',
  width: '100%',
  height: '100%',
  zoom: 15,
  onZoom: null,
  onDrag: null,
  boundSouth: null,
  boundWest: null,
  boundNorth: null,
  boundEast: null,
  centerLatitude: null,
  centerLongitude: null,
  zoomEnabled: true,
  dragEnabled: true,
};

export default BpkMap;
