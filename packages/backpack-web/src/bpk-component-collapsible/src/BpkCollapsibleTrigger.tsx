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

import { forwardRef } from 'react';
import type { ReactNode, Ref } from 'react';

import { Collapsible, useCollapsibleContext } from '@ark-ui/react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCollapsible.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCollapsibleTriggerProps = {
  children: ReactNode;
};

// Applies the native HTML `disabled` attribute to the underlying <button> so
// the trigger is removed from the tab order and announced as disabled by
// assistive tech. Ark/Zag only emit `data-disabled`, which would otherwise
// leave the button tabbable and announced as enabled.
const BpkCollapsibleTrigger = forwardRef(
  ({ children }: BpkCollapsibleTriggerProps, ref: Ref<HTMLButtonElement>) => {
    const { disabled } = useCollapsibleContext();

    return (
      <Collapsible.Trigger
        ref={ref}
        className={getClassName('bpk-collapsible__trigger')}
        disabled={disabled}
      >
        {children}
      </Collapsible.Trigger>
    );
  },
);

BpkCollapsibleTrigger.displayName = 'BpkCollapsibleTrigger';

export default BpkCollapsibleTrigger;
