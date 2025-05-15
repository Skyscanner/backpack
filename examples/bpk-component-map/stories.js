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

import BpkIconMarker from '../../packages/bpk-component-map/src/BpkIconMarker';
import BpkMap from '../../packages/bpk-component-map/src/BpkMap';
import BpkOverlayView from '../../packages/bpk-component-map/src/BpkOverlayView';
import BpkPriceMarker from '../../packages/bpk-component-map/src/BpkPriceMarker';
import { BpkPriceMarkerV2 } from '../../packages/bpk-component-map/src/BpkPriceMarkerV2/BpkPriceMarker';

import {
  SimpleExample,
  DragDisabledAndHiddenControlsExample,
  GreddyGestureHandlingExample,
  WithOnZoomAndOnRegionChangeExample,
  WithOnTilesLoadedExample,
  WithBoundingBoxExample,
  WithAMarkerExample,
  WithPriceMarkersExample,
  WithPriceMarkersV2Example,
  WithIconPriceMarkersV2Example,
  WithPriceMarkersV2ButtonExample,
  WithIconPriceMarkersV2ButtonExample,
  MultipleMapsExample,
} from './examples';
import WithGoogleMapsScriptMock from './stories-utils';

export default {
  title: 'bpk-component-map',
  component: BpkMap,
  subcomponents: {
    BpkIconMarker,
    BpkPriceMarker,
    BpkPriceMarkerV2,
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

export const PriceMarkers = WithPriceMarkersExample;

export const PriceMarkersV2 = WithPriceMarkersV2Example;

export const WithIconPriceMarkersV2 = WithIconPriceMarkersV2Example;

export const PriceMarkersV2Button = WithPriceMarkersV2ButtonExample;

export const WithIconPriceMarkersV2Button = WithIconPriceMarkersV2ButtonExample;

export const MultiMaps = MultipleMapsExample;
