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
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BpkText from 'bpk-component-text';
import BpkMap, { BpkOverlayView, withGoogleMapsScript } from './index';

const BpkMapWithLoading = withGoogleMapsScript(BpkMap);

const StoryMap = props => {
  const { children, language, ...rest } = props;
  return (
    <div style={{ height: '400px' }}>
      <BpkMapWithLoading
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&language=en&libraries=geometry,drawing,places"
        {...rest}
      >
        {children}
      </BpkMapWithLoading>
    </div>
  );
};

StoryMap.propTypes = {
  children: PropTypes.node,
  language: PropTypes.string,
};

StoryMap.defaultProps = {
  children: null,
  language: '',
};

const onZoom = level => {
  action(`Zoom changed to ${level}`);
};

const onRegionChange = (bounds, center) => {
  action(
    `Dragged to bounds: ${bounds.toString()}, center: ${center.toString()}`,
  );
};

storiesOf('bpk-component-map', module)
  .add('Simple', () => (
    <StoryMap
      zoom={15}
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
    />
  ))
  .add('Drag disabled and controls hidden', () => (
    <StoryMap
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
      panEnabled={false}
      showControls={false}
    />
  ))
  .add('With onZoom and onRegionChange callbacks', () => (
    <StoryMap
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
      onZoom={onZoom}
      onRegionChange={onRegionChange}
    />
  ))
  .add('With a bounding box', () => (
    <StoryMap
      bounds={{
        south: 25.94129273544452,
        west: -3.2285547854247625,
        north: 20.952707392208396,
        east: -2.159632742578083,
      }}
    />
  ))
  .add('With a marker', () => (
    <StoryMap center={{ latitude: 55.944357, longitude: -3.1967116 }}>
      <BpkOverlayView position={{ latitude: 55.944, longitude: -3.1967116 }}>
        <BpkText>Backpack</BpkText>
      </BpkOverlayView>
    </StoryMap>
  ));
