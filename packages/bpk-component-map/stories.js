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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withRtlSupport } from 'bpk-component-icon';
import HotelsLargeIcon from 'bpk-component-icon/lg/hotels';
import HotelsSmallIcon from 'bpk-component-icon/sm/hotels';
import BpkTooltip from 'bpk-component-tooltip';
import { BpkMap, BpkMapMarker } from './index';

const RtlSmallHotelsIcon = withRtlSupport(HotelsSmallIcon);
const RtlLargeHotelsIcon = withRtlSupport(HotelsLargeIcon);
const zoom = level => {
  console.info(level);
};

const drag = (bounds, center) => {
  console.info(bounds);
  console.info(center);
};

storiesOf('bpk-component-map', module)
  .add('Simple', () => (
    <BpkMap
      apiKey=""
      zoom={15}
      centerLatitude={55.944357}
      centerLongitude={-3.1967116}
      language="en"
    />
  ))
  .add('Set some props', () => (
    <BpkMap
      apiKey=""
      zoom={15}
      centerLatitude={55.944357}
      centerLongitude={-3.1967116}
      zoomEnabled={false}
      dragEnabled={false}
      width="60%"
      height="50%"
      language="zh"
    />
  ))
  .add('With onZoom and onDrag callback', () => (
    <BpkMap
      apiKey=""
      zoom={15}
      centerLatitude={55.944357}
      centerLongitude={-3.1967116}
      onZoom={zoom}
      onDrag={drag}
    />
  ))
  .add('Load Map with BoundBox', () => (
    <BpkMap
      apiKey=""
      boundSouth={55.94129273544452}
      boundWest={-3.2285547854247625}
      boundNorth={55.952707392208396}
      boundEast={-3.159632742578083}
      onDrag={drag}
    />
  ))
  .add('Load Map with marker', () => (
    <BpkMap apiKey="" centerLatitude={55.944357} centerLongitude={-3.1967116}>
      <BpkMapMarker latitude={55.944357} longitude={-3.1967116}>
        <BpkTooltip id="my-tooltip1" target={<RtlSmallHotelsIcon />}>
          Jinglun Hotel
        </BpkTooltip>
      </BpkMapMarker>
      <BpkMapMarker latitude={55.943763} longitude={-3.195272}>
        <BpkTooltip id="my-tooltip2" target={<RtlLargeHotelsIcon />}>
          The Langham London
        </BpkTooltip>
      </BpkMapMarker>
    </BpkMap>
  ));
