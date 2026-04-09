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

import type { ReactNode } from 'react';

import BpkLink from '../../bpk-component-link';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import BpkAiBlurbEllipsis from './BpkAiBlurbEllipsis';

import type { BpkAiBlurbSummaryProps } from './common-types';

import STYLES from './BpkAiBlurb.module.scss';

const getClassName = cssModules(STYLES);

const BpkAiBlurbSummary = ({ aiResponseText, errorLinkHref, errorLinkText, errorText, state, thinkingText }: BpkAiBlurbSummaryProps) => {

  let content: ReactNode;

  if (state === 'aiResponse') {
    content = aiResponseText;
  } else if (state === 'thinking') {
    content = (
      <BpkText tagName="p" textStyle={TEXT_STYLES.caption}>
        {thinkingText}
        <BpkAiBlurbEllipsis />
      </BpkText>
    );
  } else {
    content = (
      <div className={getClassName('bpk-ai-blurb__error')}>
        <BpkText tagName="span" textStyle={TEXT_STYLES.caption}>{errorText}</BpkText>
        <BpkLink href={errorLinkHref ?? null}>{errorLinkText}</BpkLink>
      </div>
    );
  }

  return <div className={getClassName('bpk-ai-blurb__summary')}>{content}</div>;
};

export default BpkAiBlurbSummary;
