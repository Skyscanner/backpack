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
  WithPriceMarkersV2Example,
  WithPriceMarkersV2OnDarkExample,
  MultipleMapsExample,
} from './examples';

export default {
  title: 'bpk-component-map',
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

export const PriceMarkersV2Default = WithPriceMarkersV2Example;

export const PriceMarkersV2OnDark = WithPriceMarkersV2OnDarkExample

export const MultiMaps = MultipleMapsExample;
