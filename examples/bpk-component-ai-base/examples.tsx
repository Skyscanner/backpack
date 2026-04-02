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

import BpkAiBase from '../../packages/bpk-component-ai-base/src/BpkAiBase';
import BpkButton from '../../packages/bpk-component-button/src/BpkButton';
import AiIcon from '../../packages/bpk-component-icon/sm/ai';
import { BpkFlex } from '../../packages/bpk-component-layout/src/BpkFlex';
import { BpkSpacing } from '../../packages/bpk-component-layout/src/tokens';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text/src/BpkText';
import { SURFACE_COLORS } from '../../packages/bpk-react-utils';

export const AiCardExample = () => (
  <BpkAiBase.Root gap={BpkSpacing.MD}>
    <BpkAiBase.Header>
      <BpkFlex direction="row" align="center" gap={BpkSpacing.SM}>
        <AiIcon />
        <BpkText textStyle={TEXT_STYLES.label2}>Summarized by AI</BpkText>
      </BpkFlex>
    </BpkAiBase.Header>
    <BpkAiBase.Content>
      <BpkText textStyle={TEXT_STYLES.bodyDefault}>
        Your flight departs at 09:00 from Terminal 2. Check-in closes 45 minutes before departure.
        Baggage allowance is one cabin bag up to 10 kg. No changes are permitted after booking.
      </BpkText>
    </BpkAiBase.Content>
    <BpkAiBase.Footer>
      <BpkButton>View full details</BpkButton>
    </BpkAiBase.Footer>
  </BpkAiBase.Root>
);

export const NoFooterExample = () => (
  <BpkAiBase.Root gap={BpkSpacing.MD}>
    <BpkAiBase.Header>
      <BpkFlex direction="row" align="center" gap={BpkSpacing.SM}>
        <AiIcon />
        <BpkText textStyle={TEXT_STYLES.label2}>AI insights</BpkText>
      </BpkFlex>
    </BpkAiBase.Header>
    <BpkAiBase.Content>
      <BpkText textStyle={TEXT_STYLES.bodyDefault}>
        Prices on this route are typically lower on Tuesdays and Wednesdays.
        Booking 6–8 weeks in advance usually offers the best value.
      </BpkText>
    </BpkAiBase.Content>
  </BpkAiBase.Root>
);

export const CustomSurfaceExample = () => (
  <BpkFlex direction="column" gap={BpkSpacing.MD}>
    <BpkAiBase.Root backgroundColor={SURFACE_COLORS.surfaceContrast} gap={BpkSpacing.MD}>
      <BpkAiBase.Header>
        <BpkFlex direction="row" align="center" gap={BpkSpacing.SM}>
          <AiIcon />
          <BpkText textStyle={TEXT_STYLES.label2}>Summarized by AI</BpkText>
        </BpkFlex>
      </BpkAiBase.Header>
      <BpkAiBase.Content>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          Surface contrast background variant.
        </BpkText>
      </BpkAiBase.Content>
    </BpkAiBase.Root>
    <BpkAiBase.Root backgroundColor={SURFACE_COLORS.surfaceSubtle} gap={BpkSpacing.MD}>
      <BpkAiBase.Header>
        <BpkFlex direction="row" align="center" gap={BpkSpacing.SM}>
          <AiIcon />
          <BpkText textStyle={TEXT_STYLES.label2}>Summarized by AI</BpkText>
        </BpkFlex>
      </BpkAiBase.Header>
      <BpkAiBase.Content>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          Surface subtle background variant.
        </BpkText>
      </BpkAiBase.Content>
    </BpkAiBase.Root>
  </BpkFlex>
);

export const VisualTestExample = () => (
  <BpkFlex direction="column" gap={BpkSpacing.LG}>
    <AiCardExample />
    <NoFooterExample />
  </BpkFlex>
);
