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

import BpkIconMarker, {
  type Props as IconMarkerProps,
} from './src/BpkIconMarker';
import BpkMap from './src/BpkMap';
import BpkOverlayView from './src/BpkOverlayView';
import BpkPriceMarker from './src/BpkPriceMarker';
import BpkPriceMarkerButton, {
  MARKER_STATUSES,
} from './src/BpkPriceMarkerButton';
import { type LatLong } from './src/common-types';
import {
  defaultIconMarkerThemeAttributes,
  priceMarkerThemeAttributes,
} from './src/themeAttributes';
import withGoogleMapsScript from './src/withGoogleMapsScript';

export default BpkMap;
export type BpkMapLatLong = LatLong;
export type BpkIconMarkerProps = IconMarkerProps;
export {
  BpkIconMarker,
  BpkPriceMarker,
  BpkOverlayView,
  withGoogleMapsScript,
  defaultIconMarkerThemeAttributes,
  priceMarkerThemeAttributes,
  MARKER_STATUSES,
  BpkPriceMarkerButton,
};
