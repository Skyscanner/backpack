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
import figma from '@figma/code-connect';

import { withRtlSupport } from '../../bpk-component-icon';
import AirportsIconSm from '../../bpk-component-icon/sm/airports';

import BpkPriceMarker from './BpkPriceMarker';
import { MARKER_STATUSES } from './BpkPriceMarkerButton';

const Icon = withRtlSupport(AirportsIconSm);

figma.connect(
  BpkPriceMarker,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=51528%3A105887',
  {
    props: {
      status: figma.enum('State', {
        Unselected: MARKER_STATUSES.unselected,
        Selected: MARKER_STATUSES.selected,
        'Pervious selected': MARKER_STATUSES.previous_selected,
      }),
      icon: figma.boolean('Icon?', {
        true: <Icon />,
        false: undefined,
      }),
    },
    example: ({ icon, status }) => (
      <BpkPriceMarker
        accessibilityLabel="£370"
        position={{ latitude: 0.0, longitude: 0.0 }}
        label="£370"
        status={status}
        icon={icon}
      />
    ),
  },
);
