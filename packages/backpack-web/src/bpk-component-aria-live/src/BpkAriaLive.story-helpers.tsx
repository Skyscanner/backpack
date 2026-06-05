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

import type { ReactElement } from 'react';

import { ARIA_LIVE_POLITENESS_SETTINGS } from '..';
import { cssModules } from '../../bpk-react-utils';

import BpkAriaLive from './BpkAriaLive';

import STYLES from './BpkAriaLive.stories.module.scss';

const getClassName = cssModules(STYLES);

type AriaLiveDemoProps = {
  preamble?: ReactElement | null;
  children: ReactElement;
  className?: string | null;
  style?: {};
  visible?: Boolean;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const AriaLiveDemo = ({
  children,
  className = null,
  preamble = null,
  style = undefined,
  visible = false,
  ...rest
}: AriaLiveDemoProps) => (
  <div
    className={getClassName('bpk-storybook-aria-live-demo', className)}
    style={style}
  >
    <p>
      <strong>ARIA live region:</strong>
    </p>
    <p>
      {visible
        ? 'This content is relevant to everyone, not just assistive technologies, so it is permanently visible.'
        : 'This would usually be visually hidden, and only visible to assistive technologies. It is visible here for demo purposes.'}
    </p>
    {preamble}
    <BpkAriaLive
      {...rest}
      visible
      politenessSetting={ARIA_LIVE_POLITENESS_SETTINGS.assertive}
    >
      {children}
    </BpkAriaLive>
  </div>
);

export default AriaLiveDemo;
