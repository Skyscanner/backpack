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

type ZoomChangedCallback = (zoom: number) => mixed;

type DragEndCallback = (bounds: Object, center: Object) => mixed;

type Props = {
  children: ?Node,
  className: ?string,
  language: string,
  region: string,
  width: string,
  height: string,
  zoom: number,
  centerLatitude: ?number,
  centerLongitude: ?number,
  boundSouth: ?number,
  boundWest: ?number,
  boundNorth: ?number,
  boundEast: ?number,
  zoomEnabled: boolean,
  dragEnabled: boolean,
  onZoom: ZoomChangedCallback,
  onDrag: DragEndCallback,
};

class BpkMap extends Component<Props> {
  googleMap: any;

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
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

  static defaultProps = {
    children: null,
    className: null,
    language: '',
    region: '',
    width: '100%',
    height: '100%',
    zoom: 15,
    boundSouth: null,
    boundWest: null,
    boundNorth: null,
    boundEast: null,
    centerLatitude: null,
    centerLongitude: null,
    zoomEnabled: true,
    dragEnabled: true,
  };

  constructor(props: Props) {
    super(props);

    this.googleMap = null;
  }

  handleMapLoad = (map: Object) => {
    this.googleMap = map;
    const { boundSouth, boundWest, boundNorth, boundEast } = this.props;
    if (map && boundSouth && boundWest && boundNorth && boundEast) {
      this.googleMap.fitBounds({
        south: boundSouth,
        west: boundWest,
        north: boundNorth,
        east: boundEast,
      });
    }
  };

  handleZoomChanged = (callback: ZoomChangedCallback) => {
    if (callback) {
      const zoomLevel = this.googleMap.getZoom();
      callback(zoomLevel);
    }
  };

  handleDragEnd = (callback: DragEndCallback) => {
    if (callback) {
      const bounds = this.googleMap.getBounds();
      const center = this.googleMap.getCenter();
      callback(bounds, { lat: center.lat(), lng: center.lng() });
    }
  };

  render() {
    const {
      className,
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
    const InnerMap = withScriptjs(
      withGoogleMap(() => (
        <GoogleMap
          ref={map => this.handleMapLoad(map)}
          defaultZoom={zoom}
          defaultCenter={
            centerLatitude && centerLongitude
              ? { lat: centerLatitude, lng: centerLongitude }
              : null
          }
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
      )),
    );
    const classNames = [getClassName('bpk-map')];
    if (className) {
      classNames.push(className);
    }

    return (
      <InnerMap
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjeijuDttvvujmN_XZB9304o3lPn6WGDM' +
          `&v=3.exp&libraries=geometry,drawing,places&language=${language}&region=${region}`
        }
        loadingElement={<BpkSpinner />}
        mapElement={<div style={{ width, height }} />}
        containerElement={<div className={classNames.join(' ')} />}
      />
    );
  }
}

export default BpkMap;
