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

import BpkThumb from '../../packages/bpk-component-thumb/src/BpkThumb';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

export const DefaultExample = () => (
  <div className={getClassName('bpkdocs-thumb-examples')}>
    <BpkThumb accessibilityLabel="Thumbs up" type="up" />
    <BpkThumb accessibilityLabel="Thumbs down" type="down" />
  </div>
);

export const SelectedExample = () => (
  <div className={getClassName('bpkdocs-thumb-examples')}>
    <BpkThumb accessibilityLabel="Thumbs up" type="up" selected />
    <BpkThumb accessibilityLabel="Thumbs down" type="down" selected />
  </div>
);

export const InteractiveExample = () => {
  const [selectedThumb, setSelectedThumb] = useState<'up' | 'down' | null>(
    null,
  );

  return (
    <div className={getClassName('bpkdocs-thumb-examples')}>
      <BpkThumb
        accessibilityLabel="Rate as helpful"
        type="up"
        onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
        selected={selectedThumb === 'up'}
      />
      <BpkThumb
        accessibilityLabel="Rate as not helpful"
        type="down"
        onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
        selected={selectedThumb === 'down'}
      />
    </div>
  );
};

export const DisabledExample = () => (
  <div className={getClassName('bpkdocs-thumb-examples')}>
    <BpkThumb accessibilityLabel="Thumbs up" type="up" disabled />
    <BpkThumb accessibilityLabel="Thumbs down" type="down" disabled />
  </div>
);

export const DisabledSelectedExample = () => (
  <div className={getClassName('bpkdocs-thumb-examples')}>
    <BpkThumb accessibilityLabel="Thumbs up" type="up" disabled selected />
    <BpkThumb accessibilityLabel="Thumbs down" type="down" disabled selected />
  </div>
);

export const MixedExample = () => (
  <div className={getClassName('bpkdocs-thumb-examples-column')}>
    <div className={getClassName('bpkdocs-thumb-examples-row')}>
      <span>Default:</span>
      <BpkThumb accessibilityLabel="Thumbs up" type="up" />
      <BpkThumb accessibilityLabel="Thumbs down" type="down" />
    </div>
    <div className={getClassName('bpkdocs-thumb-examples-row')}>
      <span>Selected:</span>
      <BpkThumb accessibilityLabel="Thumbs up" type="up" selected />
      <BpkThumb accessibilityLabel="Thumbs down" type="down" selected />
    </div>
    <div className={getClassName('bpkdocs-thumb-examples-row')}>
      <span>Disabled:</span>
      <BpkThumb accessibilityLabel="Thumbs up" type="up" disabled />
      <BpkThumb accessibilityLabel="Thumbs down" type="down" disabled />
    </div>
  </div>
);
