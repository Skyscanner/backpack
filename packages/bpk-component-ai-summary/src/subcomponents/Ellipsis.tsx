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

import { cssModules } from '../../../bpk-react-utils';

import STYLES from '../BpkAiSummary.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Animated three-dot ellipsis for inline use at the end of loading text.
 * Hidden from assistive technology — ensure surrounding text provides context.
 *
 * @example
 * <BpkAiSummary.Summary>
 *   Comparing your shortlist<BpkAiSummary.Ellipsis />
 * </BpkAiSummary.Summary>
 *
 * @returns {JSX.Element} Ellipsis component
 */
const Ellipsis = () => (
  <span
    className={getClassName('bpk-ai-summary__ellipsis')}
    aria-hidden="true"
  >
    <span className={getClassName('bpk-ai-summary__ellipsis-dot')} />
    <span
      className={getClassName(
        'bpk-ai-summary__ellipsis-dot',
        'bpk-ai-summary__ellipsis-dot--2',
      )}
    />
    <span
      className={getClassName(
        'bpk-ai-summary__ellipsis-dot',
        'bpk-ai-summary__ellipsis-dot--3',
      )}
    />
  </span>
);

Ellipsis.displayName = 'BpkAiSummary.Ellipsis';

export default Ellipsis;
