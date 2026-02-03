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
import BpkBreadcrumb from '../../packages/bpk-component-breadcrumb/src/BpkBreadcrumb';
import BpkBreadcrumbItem from '../../packages/bpk-component-breadcrumb/src/BpkBreadcrumbItem';

import { DefaultExample, ExtremeExample } from './examples';

export default {
  component: BpkBreadcrumb,
  title: 'bpk-component-breadcrumb',
  subcomponents: {
    BpkBreadcrumbItem
  },
};

export const Default = DefaultExample;
export const Extreme = ExtremeExample;
export const VisualTest = DefaultExample;

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  }
};
