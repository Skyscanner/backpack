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

import { storiesOf } from '@storybook/react';

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
  MultipleMapsExample,
} from './examples';

storiesOf('bpk-component-map', module)
  .add('Simple', SimpleExample)
  .add(
    'Drag disabled and controls hidden',
    DragDisabledAndHiddenControlsExample,
  )
  .add('Greedy gesture handling', GreddyGestureHandlingExample)
  .add(
    'With onZoom and onRegionChange callbacks',
    WithOnZoomAndOnRegionChangeExample,
  )
  .add('With onTilesLoaded', WithOnTilesLoadedExample)
  .add('With a bounding box', WithBoundingBoxExample)
  .add('With a marker', WithAMarkerExample)
  .add('Icon markers', WithIconMarkersExample)
  .add('Price markers', WithPriceMarkersExample)
  .add('Multi maps', MultipleMapsExample);
