/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import { cssModules } from 'bpk-react-utils';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
  BORDER_RADIUS_STYLES as IMAGE_BORDER_RADIUS_STYLES,
} from 'bpk-component-image';

import STYLES from './stories.scss';

import BpkOverlay, { BORDER_RADIUS_STYLES, OVERLAY_TYPES } from './index';

const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, document),
);

const OTTAWA_IMG_SRC =
  'https://images.unsplash.com/photo-1535046460986-c0084bba76f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80';

const getClassName = cssModules(STYLES);

storiesOf('bpk-component-overlay', module)
  .add('Default', () => (
    <BpkOverlay
      borderRadiusStyle={BORDER_RADIUS_STYLES.sm}
      className={getClassName('bpk-overlay-stories__text-story')}
    >
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>
  ))
  .add('overlayType="none"', () => (
    <BpkOverlay
      overlayType={OVERLAY_TYPES.none}
      className={getClassName('bpk-overlay-stories__text-story')}
    >
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>
  ))
  .add('with foreground content', () => (
    <BpkOverlay
      borderRadiusStyle={BORDER_RADIUS_STYLES.sm}
      className={getClassName('bpk-overlay-stories__text-story')}
      foregroundContent={
        <BpkText
          textStyle={TEXT_STYLES.xxl}
          className={getClassName('bpk-overlay-stories__foreground')}
        >
          Visit Ottawa, Canada&apos;s illustrious capital
        </BpkText>
      }
    >
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>
  ))
  .add('With BpkImage', () => (
    <BpkOverlay borderRadiusStyle={BORDER_RADIUS_STYLES.sm}>
      <BpkImage
        borderRadiusStyle={IMAGE_BORDER_RADIUS_STYLES.sm}
        src={OTTAWA_IMG_SRC}
        altText="Canadian Parliament Building in Ottawa"
        width={300}
        height={200}
      />
    </BpkOverlay>
  ))
  .add('With BpkImage, lazy loaded', () => (
    <BpkOverlay borderRadiusStyle={BORDER_RADIUS_STYLES.sm}>
      <FadingLazyLoadedImage
        borderRadiusStyle={IMAGE_BORDER_RADIUS_STYLES.sm}
        src={OTTAWA_IMG_SRC}
        altText="Canadian Parliament Building in Ottawa"
        width={300}
        height={200}
      />
    </BpkOverlay>
  ))
  .add('Text overlaid on an image using foreground content', () => (
    <div>
      <BpkOverlay
        borderRadiusStyle={BORDER_RADIUS_STYLES.sm}
        foregroundContent={
          <div className={getClassName('bpk-overlay-stories__foreground')}>
            <BpkText textStyle={TEXT_STYLES.xxl}>
              Visit Ottawa, Canada&apos;s illustrious capital
            </BpkText>
          </div>
        }
      >
        <BpkImage
          borderRadiusStyle={IMAGE_BORDER_RADIUS_STYLES.sm}
          src={OTTAWA_IMG_SRC}
          altText="Canadian Parliament Building in Ottawa"
          width={300}
          height={200}
        />
      </BpkOverlay>
    </div>
  ));
