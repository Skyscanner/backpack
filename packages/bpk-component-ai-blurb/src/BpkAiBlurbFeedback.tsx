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

import { useState } from 'react';

import BpkAriaLive from '../../bpk-component-aria-live';
import { BpkFlex, BpkSpacing } from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import BpkThumbButton from '../../bpk-component-thumb-button';

import type { BpkAiBlurbFeedbackProps } from './common-types';

// A thumbs-up/thumbs-down feedback widget displayed beneath an AI-generated blurb.
// Once the user votes, the thumb buttons are replaced with a thank-you message.
const BpkAiBlurbFeedback = ({
  feedbackText,
  onFeedback,
  thankYouText,
  thumbsDownLabel,
  thumbsUpLabel,
}: BpkAiBlurbFeedbackProps) => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (positive: boolean) => {
    setHasVoted(true);
    onFeedback?.(positive);
  };

  return (
    <BpkFlex align="center" gap={BpkSpacing.SM}>
      {!hasVoted && (
        <>
          <BpkText textStyle={TEXT_STYLES.caption}>{feedbackText}</BpkText>
          <BpkThumbButton
            type="up"
            size="small"
            iconColor="primary"
            accessibilityLabel={thumbsUpLabel}
            onClick={() => handleVote(true)}
          />
          <BpkThumbButton
            type="down"
            size="small"
            iconColor="primary"
            accessibilityLabel={thumbsDownLabel}
            onClick={() => handleVote(false)}
          />
        </>
      )}
      <BpkAriaLive visible={hasVoted}>
        {hasVoted ? (
          <BpkText textStyle={TEXT_STYLES.caption}>{thankYouText}</BpkText>
        ) : (
          ''
        )}
      </BpkAriaLive>
    </BpkFlex>
  );
};

export default BpkAiBlurbFeedback;
