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

import BpkNavigationTabGroup from '../../packages/bpk-component-navigation-tab-group';

import {
  SimpleSurfaceContrast,
  SimpleCanvasDefault,
  WithIconSurfaceContrastForExample,
  WithIconCanvasDefaultForExample,
  TabsNoHrefSurfaceContrastForExample,
  TabsNoHrefCanvasDefaultForExample,
  TabsOnlyTextSurfaceContrastForExample,
  TabsOnlyTextCanvasDefaultForExample,
  VisualTestExample,
} from './examples';

export default {
  title: 'bpk-component-navigation-tab-group',
  component: BpkNavigationTabGroup,
};

export const SurfaceContrast = SimpleSurfaceContrast;

export const TabsNoHrefSurfaceContrast = TabsNoHrefSurfaceContrastForExample;

export const TabsNoHrefCanvasDefault =TabsNoHrefCanvasDefaultForExample

export const CanvasDefault = SimpleCanvasDefault;

export const WithIconSurfaceContrast = WithIconSurfaceContrastForExample;

export const WithIconCanvasDefault = WithIconCanvasDefaultForExample;

export const OnlyTextSurfaceContrast = TabsOnlyTextSurfaceContrastForExample;

export const OnlyTextCanvasDefault = TabsOnlyTextCanvasDefaultForExample;

export const VisualTest = VisualTestExample;

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  }
}
