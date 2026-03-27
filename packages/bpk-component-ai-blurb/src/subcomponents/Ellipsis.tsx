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

import STYLES from '../BpkAiBlurb.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Animated three-dot ellipsis for inline use at the end of loading text.
 * Hidden from assistive technology — ensure surrounding text provides context.
 *
 * @example
 * <BpkAiBlurb.Summary>
 *   Comparing your shortlist<BpkAiBlurb.Ellipsis />
 * </BpkAiBlurb.Summary>
 *
 * @returns {JSX.Element} Ellipsis component
 */
const Ellipsis = () => (
  <span
    className={getClassName('bpk-ai-blurb__ellipsis')}
    aria-hidden="true"
  >
    <span className={getClassName('bpk-ai-blurb__ellipsis-dot')} />
    <span
      className={getClassName(
        'bpk-ai-blurb__ellipsis-dot',
        'bpk-ai-blurb__ellipsis-dot--2',
      )}
    />
    <span
      className={getClassName(
        'bpk-ai-blurb__ellipsis-dot',
        'bpk-ai-blurb__ellipsis-dot--3',
      )}
    />
  </span>
);

Ellipsis.displayName = 'BpkAiBlurb.Ellipsis';

export default Ellipsis;
