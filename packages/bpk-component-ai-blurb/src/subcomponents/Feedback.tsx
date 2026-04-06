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

import BpkAriaLive from '../../../bpk-component-aria-live';
import BpkSmallThumbsDownIcon from '../../../bpk-component-icon/sm/thumbs-down';
import BpkSmallThumbsUpIcon from '../../../bpk-component-icon/sm/thumbs-up';
import { BpkFlex, BpkSpacing } from '../../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import { cssModules } from '../../../bpk-react-utils';

import type { BpkAiBlurbFeedbackProps } from '../common-types';

import STYLES from '../BpkAiBlurb.module.scss';

const getClassName = cssModules(STYLES);

const Feedback = ({
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
          <button
            type="button"
            className={getClassName('bpk-ai-blurb__feedback-thumb')}
            onClick={() => handleVote(true)}
            aria-label={thumbsUpLabel}
          >
            <BpkSmallThumbsUpIcon aria-hidden />
          </button>
          <button
            type="button"
            className={getClassName('bpk-ai-blurb__feedback-thumb')}
            onClick={() => handleVote(false)}
            aria-label={thumbsDownLabel}
          >
            <BpkSmallThumbsDownIcon aria-hidden />
          </button>
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

Feedback.displayName = 'BpkAiBlurb.Feedback';

export default Feedback;
