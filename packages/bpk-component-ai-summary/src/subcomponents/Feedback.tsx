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

import ThumbsDownIcon from '../../../bpk-component-icon/sm/thumbs-down';
import ThumbsUpIcon from '../../../bpk-component-icon/sm/thumbs-up';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import { cssModules } from '../../../bpk-react-utils';

import type { BpkAiSummaryFeedbackProps } from '../common-types';

import STYLES from '../BpkAiSummary.module.scss';


const getClassName = cssModules(STYLES);

const Feedback = ({
  feedbackText,
  onFeedback,
  thankYouText,
}: BpkAiSummaryFeedbackProps) => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (positive: boolean) => {
    setHasVoted(true);
    onFeedback?.(positive);
  };

  if (hasVoted) {
    return (
      <div className={getClassName('bpk-ai-summary__feedback')}>
        <BpkText textStyle={TEXT_STYLES.caption}>{thankYouText}</BpkText>
      </div>
    );
  }

  return (
    <div className={getClassName('bpk-ai-summary__feedback')}>
      <BpkText textStyle={TEXT_STYLES.caption}>{feedbackText}</BpkText>
      <button
        type="button"
        className={getClassName('bpk-ai-summary__feedback-thumb')}
        onClick={() => handleVote(true)}
        aria-label="Thumbs up"
      >
        <ThumbsUpIcon aria-hidden />
      </button>
      <button
        type="button"
        className={getClassName('bpk-ai-summary__feedback-thumb')}
        onClick={() => handleVote(false)}
        aria-label="Thumbs down"
      >
        <ThumbsDownIcon aria-hidden />
      </button>
    </div>
  );
};

Feedback.displayName = 'BpkAiSummary.Feedback';

export default Feedback;
