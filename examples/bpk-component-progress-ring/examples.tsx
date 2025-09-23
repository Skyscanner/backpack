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

import { useState, useEffect } from 'react';

import BpkProgressRing, { PROGRESS_RING_SIZES } from '../../packages/bpk-component-progress-ring';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const AnimatedProgressRing = ({ max = 100, targetValue = 75, ...props }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60fps
    const increment = targetValue / steps;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      setCurrentValue(Math.min(step * increment, targetValue));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <BpkProgressRing 
      value={currentValue} 
      max={max} 
      {...props}
    >
      {Math.round(currentValue)}%
    </BpkProgressRing>
  );
};

const DefaultExample = () => (
  <div className={getClassName('bpk-progress-ring-examples__container')}>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
      Default
    </BpkText>
    <div className={getClassName('bpk-progress-ring-examples__row')}>
      <BpkProgressRing value={0} aria-label="No progress" />
      <BpkProgressRing value={25} aria-label="Quarter progress" />
      <BpkProgressRing value={50} aria-label="Half progress" />
      <BpkProgressRing value={75} aria-label="Three quarters progress" />
      <BpkProgressRing value={100} aria-label="Complete progress" />
    </div>
  </div>
);

const SizesExample = () => (
  <div className={getClassName('bpk-progress-ring-examples__container')}>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
      Sizes
    </BpkText>
    <div className={getClassName('bpk-progress-ring-examples__row')}>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={60} 
          size={PROGRESS_RING_SIZES.small} 
          aria-label="Small progress ring"
        />
        <BpkText textStyle={TEXT_STYLES.caption}>Small</BpkText>
      </div>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={60} 
          size={PROGRESS_RING_SIZES.default} 
          aria-label="Default progress ring"
        />
        <BpkText textStyle={TEXT_STYLES.caption}>Default</BpkText>
      </div>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={60} 
          size={PROGRESS_RING_SIZES.large} 
          aria-label="Large progress ring"
        />
        <BpkText textStyle={TEXT_STYLES.caption}>Large</BpkText>
      </div>
    </div>
  </div>
);

const WithContentExample = () => (
  <div className={getClassName('bpk-progress-ring-examples__container')}>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
      With Content
    </BpkText>
    <div className={getClassName('bpk-progress-ring-examples__row')}>
      <BpkProgressRing value={25} aria-label="25% complete">
        25%
      </BpkProgressRing>
      <BpkProgressRing value={50} aria-label="50% complete">
        50%
      </BpkProgressRing>
      <BpkProgressRing value={75} aria-label="75% complete">
        75%
      </BpkProgressRing>
      <BpkProgressRing value={100} aria-label="Complete">
        ✓
      </BpkProgressRing>
    </div>
  </div>
);

const WithContentSizesExample = () => (
  <div className={getClassName('bpk-progress-ring-examples__container')}>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
      With Content - All Sizes
    </BpkText>
    <div className={getClassName('bpk-progress-ring-examples__row')}>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={75} 
          size={PROGRESS_RING_SIZES.small} 
          aria-label="75% complete, small"
        >
          75%
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>Small</BpkText>
      </div>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={75} 
          size={PROGRESS_RING_SIZES.default} 
          aria-label="75% complete, default"
        >
          75%
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>Default</BpkText>
      </div>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={75} 
          size={PROGRESS_RING_SIZES.large} 
          aria-label="75% complete, large"
        >
          75%
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>Large</BpkText>
      </div>
    </div>
  </div>
);

const CustomMaxExample = () => (
  <div className={getClassName('bpk-progress-ring-examples__container')}>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
      Custom Max Value
    </BpkText>
    <div className={getClassName('bpk-progress-ring-examples__row')}>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing value={5} max={10} aria-label="5 out of 10">
          5/10
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>5 out of 10</BpkText>
      </div>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing value={3} max={5} aria-label="3 out of 5 stars">
          ★★★
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>3 out of 5 stars</BpkText>
      </div>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing value={150} max={200} aria-label="150 out of 200 MB">
          150MB
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>150/200 MB</BpkText>
      </div>
    </div>
  </div>
);

const AnimatedExample = () => (
  <div className={getClassName('bpk-progress-ring-examples__container')}>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
      Animated Progress
    </BpkText>
    <div className={getClassName('bpk-progress-ring-examples__row')}>
      <AnimatedProgressRing 
        targetValue={85} 
        aria-label="Animated progress to 85%"
      />
    </div>
    <BpkText textStyle={TEXT_STYLES.caption}>
      Progress animates from 0 to 85% over 2 seconds
    </BpkText>
  </div>
);

const MixedExample = () => (
  <div className={getClassName('bpk-progress-ring-examples__container')}>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
      Mixed Examples
    </BpkText>
    <div className={getClassName('bpk-progress-ring-examples__row')}>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={0} 
          size={PROGRESS_RING_SIZES.small} 
          aria-label="Not started"
        >
          --
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>Not started</BpkText>
      </div>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={45} 
          aria-label="Upload in progress"
        >
          ↑
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>Uploading</BpkText>
      </div>
      <div className={getClassName('bpk-progress-ring-examples__item')}>
        <BpkProgressRing 
          value={100} 
          size={PROGRESS_RING_SIZES.large} 
          aria-label="Download complete"
        >
          ✓
        </BpkProgressRing>
        <BpkText textStyle={TEXT_STYLES.caption}>Complete</BpkText>
      </div>
    </div>
  </div>
);

const examples = [
  {
    id: 'default',
    title: 'Default',
    render: DefaultExample,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    render: SizesExample,
  },
  {
    id: 'with-content',
    title: 'With Content',
    render: WithContentExample,
  },
  {
    id: 'with-content-sizes',
    title: 'With Content - All Sizes',
    render: WithContentSizesExample,
  },
  {
    id: 'custom-max',
    title: 'Custom Max Value',
    render: CustomMaxExample,
  },
  {
    id: 'animated',
    title: 'Animated Progress',
    render: AnimatedExample,
  },
  {
    id: 'mixed',
    title: 'Mixed Examples',
    render: MixedExample,
  },
];

export default examples;