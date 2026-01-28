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

import {
  SimpleExample,
  DragDisabledAndHiddenControlsExample,
  GreddyGestureHandlingExample,
  WithOnZoomAndOnRegionChangeExample,
  WithOnTilesLoadedExample,
  WithBoundingBoxExample,
  WithAMarkerExample,
  WithIconMarkersExample,
  WithPriceMarkersExample,
  WithIconPriceMarkersExample,
  WithHeartIconPriceMarkerExample,
  WithPriceMarkersButtonWithPopoverOnMapExample,
  WithIconPriceMarkersButtonWithPopoverOnMapExample,
  MultipleMapsExample,
} from './examples';
import WithGoogleMapsScriptMock from './stories-utils';

import BpkMap, {
  BpkIconMarker,
  BpkOverlayView,
  BpkPriceMarker,
  BpkPriceMarkerButton,
} from '@backpack/bpk-component-map';


export default {
  title: 'bpk-component-map',
  component: BpkMap,
  subcomponents: {
    BpkIconMarker,
    BpkPriceMarker,
    BpkPriceMarkerButton,
    BpkOverlayView,
    withGoogleMapsScript: WithGoogleMapsScriptMock,
  },
};

export const Simple = SimpleExample;
export const DragDisabledAndControlsHidden =
  DragDisabledAndHiddenControlsExample;

export const GreedyGestureHandling = GreddyGestureHandlingExample;

export const WithOnZoomAndOnRegionChangeCallbacks =
  WithOnZoomAndOnRegionChangeExample;

export const WithOnTilesLoaded = WithOnTilesLoadedExample;

export const WithABoundingBox = WithBoundingBoxExample;

export const WithAMarker = WithAMarkerExample;

export const IconMarkers = WithIconMarkersExample;

export const PriceMarkers = WithPriceMarkersExample;

export const WithIconPriceMarkers = WithIconPriceMarkersExample;

export const WithHeartIconPriceMarker =WithHeartIconPriceMarkerExample;

export const PriceMarkersButtonWithPopoverOnMap =
  WithPriceMarkersButtonWithPopoverOnMapExample;

export const WithIconPriceMarkersButtonWithPopoverOnMap =
  WithIconPriceMarkersButtonWithPopoverOnMapExample;

export const MultiMaps = MultipleMapsExample;
