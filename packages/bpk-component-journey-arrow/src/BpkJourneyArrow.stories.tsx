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

import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';

import BpkJourneyArrow from './BpkJourneyArrow';

import type { Meta } from '@storybook/react';

const JourneyArrowExample = () => {
  const widths = ["25%", "50%", "100%"]
  return (<>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">Direct, different widths</BpkText>
      {widths.map((width) =>
          <div style={{display: 'flex', alignItems: 'center', width}}>
        <BpkText>Origin</BpkText>
        <BpkJourneyArrow />
        <BpkText>Destination</BpkText>
      </div>
    )}
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">With stops</BpkText>
    <div style={{display: 'flex', alignItems: 'center', width: '50%' }}>
      <BpkJourneyArrow stops={1} />
      <BpkJourneyArrow stops={2} />
      <BpkJourneyArrow stops={3} />
    </div>
    </>
  )
};

const meta = {
  title: 'bpk-component-journey-arrow',
  component: BpkJourneyArrow,
} satisfies Meta;

export default meta;

export const VisualTest = {
  render: () => <JourneyArrowExample />,
};

export const VisualTestWithZoom = {
  render: () => <JourneyArrowExample />,
  args: {
    zoomEnabled: true,
  },
};
