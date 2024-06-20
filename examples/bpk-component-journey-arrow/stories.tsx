/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import BpkComponentJourneyArrow from '../../packages/bpk-component-journey-arrow';

import JourneyArrowExample from './example'

import type { BpkJourneyArrowProps } from '../../packages/bpk-component-journey-arrow';
import type { Meta } from '@storybook/react';

const defaultProps = { stops: 1 };

export default {
  title: 'bpk-component-journey-arrow',
  component: BpkComponentJourneyArrow,
};

export const VisualTest = {
  title: 'Journey Arrow',
  component: BpkComponentJourneyArrow,
  render: (args: BpkJourneyArrowProps) => <JourneyArrowExample {...args} />,
  args: { ...defaultProps }
};


export const VisualTestWithZoom = {
  title: 'bpk-component-journey-arrow-zoom',
  component: BpkComponentJourneyArrow,
  render: (args: BpkJourneyArrowProps) => <JourneyArrowExample {...args} />,
  args: { zoomEnabled: true, ...defaultProps }
};
