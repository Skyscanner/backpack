/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

/* @flow strict */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../bpk-component-icon';
import SmallLongArrowRightIcon from '../bpk-component-icon/sm/long-arrow-right';
import LargeLongArrowRightIcon from '../bpk-component-icon/lg/long-arrow-right';

import STYLES from './BpkButtonStory.scss';

import BpkButton from './index';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  withRtlSupport(SmallLongArrowRightIcon),
);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(
  withRtlSupport(LargeLongArrowRightIcon),
);

const cssModules = (styles = {}) => className =>
  styles[className] ? styles[className] : className;

const getClassName = cssModules(STYLES);

const ButtonStory = ({ className, ...rest }: { className: ?string }) => (
  <div
    className={[getClassName('bpk-button-story-wrapper'), className].join(' ')}
  >
    &nbsp;
    <BpkButton onClick={action('button clicked')} {...rest}>
      Button
    </BpkButton>
    &nbsp;
    <BpkButton disabled onClick={action('THIS SHOULD NOT HAPPEN')} {...rest}>
      Disabled
    </BpkButton>
    &nbsp;
    <BpkButton large onClick={action('large button clicked')} {...rest}>
      Button
    </BpkButton>
    &nbsp;
    <BpkButton
      large
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
      {...rest}
    >
      Disabled
    </BpkButton>
    &nbsp;
    <BpkButton iconOnly onClick={action('iconOnly button clicked')} {...rest}>
      <AlignedSmallLongArrowRightIcon />
    </BpkButton>
    &nbsp;
    <BpkButton
      iconOnly
      large
      onClick={action('large iconOnly button clicked')}
      {...rest}
    >
      <AlignedLargeLongArrowRightIcon />
    </BpkButton>
    &nbsp;
  </div>
);

ButtonStory.defaultProps = { className: null };

storiesOf('bpk-component-button', module)
  .add('Primary', () => <ButtonStory primary />)
  .add('Secondary', () => <ButtonStory secondary />)
  .add('Destructive', () => <ButtonStory destructive />)
  .add('Link button', () => <ButtonStory link />)
  .add('Featured', () => <ButtonStory featured />)
  .add('Outline', () => (
    <ButtonStory outline className={getClassName('bpk-outline-layout')} />
  ))
  .add('Mixture', () => (
    <div>
      <ButtonStory primary />
      <ButtonStory secondary />
      <ButtonStory destructive />
      <ButtonStory link />
      <ButtonStory featured />
      <ButtonStory outline className={getClassName('bpk-outline-layout')} />
    </div>
  ))
  .add('Anchor tags', () => (
    <div>
      <ButtonStory primary href="#" />
      <ButtonStory secondary href="#" />
      <ButtonStory destructive href="#" />
      <ButtonStory link href="#" />
      <ButtonStory featured href="#" />
      <ButtonStory
        outline
        className={getClassName('bpk-outline-layout')}
        href="#"
      />
    </div>
  ));
