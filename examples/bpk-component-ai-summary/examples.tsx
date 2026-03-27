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

import BpkAiSummary from '../../packages/bpk-component-ai-summary/src/BpkAiSummary';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const SUMMARY_TEXT =
  'The first EasyTerra deal offers the lowest price and better insurance coverage. The second EasyTerra deal has a higher price but offers a more spacious car type.';

export const DefaultExample = () => (
  <div className={getClassName('bpk-ai-summary-examples')}>
    <BpkAiSummary.Root>
      <BpkAiSummary.Header title="Summarized by AI" />
      <BpkAiSummary.Summary>{SUMMARY_TEXT}</BpkAiSummary.Summary>
      <BpkAiSummary.Feedback
        feedbackText="Was this helpful?"
        thankYouText="Thanks for your feedback!"
        onFeedback={(positive) =>
          console.log(`Feedback: ${positive ? 'positive' : 'negative'}`)
        }
      />
    </BpkAiSummary.Root>
  </div>
);

export const LoadingExample = () => (
  <div className={getClassName('bpk-ai-summary-examples')}>
    <BpkAiSummary.Root>
      <BpkAiSummary.Header title="Summarized by AI" />
      <BpkAiSummary.Summary>
        Comparing your shortlist
        <BpkAiSummary.Ellipsis />
      </BpkAiSummary.Summary>
    </BpkAiSummary.Root>
  </div>
);

export const ErrorGeneralExample = () => (
  <div className={getClassName('bpk-ai-summary-examples')}>
    <BpkAiSummary.Root>
      <BpkAiSummary.Header title="Summarized by AI" />
      <BpkAiSummary.Summary>
        Couldn&apos;t load your summary.{' '}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={(e) => e.preventDefault()}>
          Retry
        </a>
      </BpkAiSummary.Summary>
    </BpkAiSummary.Root>
  </div>
);

export const ErrorRefreshLimitExample = () => (
  <div className={getClassName('bpk-ai-summary-examples')}>
    <BpkAiSummary.Root>
      <BpkAiSummary.Header title="Summarized by AI" />
      <BpkAiSummary.Summary>
        You&apos;ve reached the refresh limit. Please come back later.{' '}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={(e) => e.preventDefault()}>
          Retry
        </a>
      </BpkAiSummary.Summary>
    </BpkAiSummary.Root>
  </div>
);
