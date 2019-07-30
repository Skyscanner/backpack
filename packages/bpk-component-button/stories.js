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

import {
  BpkButtonPrimary,
  BpkButtonSecondary,
  BpkButtonDestructive,
  BpkButtonLink,
  BpkButtonFeatured,
  BpkButtonOutline,
} from './index';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  withRtlSupport(SmallLongArrowRightIcon),
);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(
  withRtlSupport(LargeLongArrowRightIcon),
);

const cssModules = (styles = {}) => className =>
  styles[className] ? styles[className] : className;

const getClassName = cssModules(STYLES);

const wrapButton = Component => {
  function wrapComponent({ className, ...rest } = { className: '' }) {
    return (
      <div
        className={[getClassName('bpk-button-story-wrapper'), className].join(
          ' ',
        )}
      >
        &nbsp;
        <Component onClick={action('button clicked')} {...rest}>
          Button
        </Component>
        &nbsp;
        <Component
          disabled
          onClick={action('THIS SHOULD NOT HAPPEN')}
          {...rest}
        >
          Disabled
        </Component>
        &nbsp;
        <Component large onClick={action('large button clicked')} {...rest}>
          Button
        </Component>
        &nbsp;
        <Component
          large
          disabled
          onClick={action('THIS SHOULD NOT HAPPEN')}
          {...rest}
        >
          Disabled
        </Component>
        &nbsp;
        <Component
          iconOnly
          onClick={action('iconOnly button clicked')}
          {...rest}
        >
          <AlignedSmallLongArrowRightIcon />
        </Component>
        &nbsp;
        <Component
          iconOnly
          large
          onClick={action('large iconOnly button clicked')}
          {...rest}
        >
          <AlignedLargeLongArrowRightIcon />
        </Component>
        &nbsp;
      </div>
    );
  }

  return wrapComponent;
};

storiesOf('bpk-component-button', module)
  .add('Primary', () => wrapButton(BpkButtonPrimary)())
  .add('Secondary', () => wrapButton(BpkButtonSecondary)())
  .add('Destructive', () => wrapButton(BpkButtonDestructive)())
  .add('Link', () => wrapButton(BpkButtonLink)())
  .add('Featured', () => wrapButton(BpkButtonFeatured)())
  .add('Outline', () =>
    wrapButton(BpkButtonOutline)({
      className: getClassName('bpk-outline-layout'),
    }),
  )
  .add('Mixture', () => (
    <div>
      {wrapButton(BpkButtonPrimary)()}
      {wrapButton(BpkButtonSecondary)()}
      {wrapButton(BpkButtonDestructive)()}
      {wrapButton(BpkButtonLink)()}
      {wrapButton(BpkButtonFeatured)()}
      {wrapButton(BpkButtonOutline)({
        className: getClassName('bpk-outline-layout'),
      })}
    </div>
  ))
  .add('Anchor tags', () => (
    <div>
      {wrapButton(BpkButtonPrimary)({ className: '', href: '#' })}
      {wrapButton(BpkButtonSecondary)({ className: '', href: '#' })}
      {wrapButton(BpkButtonDestructive)({ className: '', href: '#' })}
      {wrapButton(BpkButtonLink)({ className: '', href: '#' })}
      {wrapButton(BpkButtonFeatured)({ className: '', href: '#' })}
      {wrapButton(BpkButtonOutline)({
        className: getClassName('bpk-outline-layout'),
        href: '#',
      })}
    </div>
  ));
