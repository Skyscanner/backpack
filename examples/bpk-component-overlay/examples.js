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
/* @flow strict */

import React from 'react';

import { cssModules } from '../../packages/bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkImage from '../../packages/bpk-component-image';
import BpkOverlay, {
  OVERLAY_TYPES,
  OVERLAY_LEVELS,
} from '../../packages/bpk-component-overlay';

import STYLES from './examples.module.scss';

const EDI_IMAGE_SRC =
  'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80';

const getClassName = cssModules(STYLES);

const SolidExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.solid}
        overlayLevel={OVERLAY_LEVELS.high}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.solid}
        overlayLevel={OVERLAY_LEVELS.medium}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.solid}
        overlayLevel={OVERLAY_LEVELS.low}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
  </div>
);

const TopExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.top}
        overlayLevel={OVERLAY_LEVELS.high}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.top}
        overlayLevel={OVERLAY_LEVELS.medium}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.top}
        overlayLevel={OVERLAY_LEVELS.low}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
  </div>
);

const BottomExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.bottom}
        overlayLevel={OVERLAY_LEVELS.high}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.bottom}
        overlayLevel={OVERLAY_LEVELS.medium}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.bottom}
        overlayLevel={OVERLAY_LEVELS.low}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
  </div>
);

const LeftExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.left}
        overlayLevel={OVERLAY_LEVELS.high}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.left}
        overlayLevel={OVERLAY_LEVELS.medium}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.left}
        overlayLevel={OVERLAY_LEVELS.low}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
  </div>
);

const RightExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.right}
        overlayLevel={OVERLAY_LEVELS.high}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.right}
        overlayLevel={OVERLAY_LEVELS.medium}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
    <div className={getClassName('bpk-overlay-stories__text-story')}>
      <BpkOverlay
        overlayType={OVERLAY_TYPES.right}
        overlayLevel={OVERLAY_LEVELS.low}
      >
        <BpkImage
          src={EDI_IMAGE_SRC}
          altText="Canadian Parliament Building in Ottawa"
          aspectRatio={1.8}
        />
      </BpkOverlay>
    </div>
  </div>
);

const VignetteExample = () => (
  <>
    <BpkOverlay
      overlayType={OVERLAY_TYPES.vignette}
      overlayLevel={OVERLAY_LEVELS.high}
    >
      <BpkImage
        src={EDI_IMAGE_SRC}
        altText="Canadian Parliament Building in Ottawa"
        aspectRatio={1.8}
      />
    </BpkOverlay>
  </>
);

const OverlayTypeNoneExample = () => (
  <BpkOverlay>
    <BpkImage
      src={EDI_IMAGE_SRC}
      altText="Canadian Parliament Building in Ottawa"
      aspectRatio={1.8}
    />
  </BpkOverlay>
);

const WithForegroundContentExample = () => (
  <BpkOverlay
    overlayType={OVERLAY_TYPES.solid}
    overlayLevel={OVERLAY_LEVELS.high}
    foregroundContent={
      <div className={getClassName('bpk-overlay-stories__foreground')}>
        <BpkText textStyle={TEXT_STYLES.xl}>
          Visit Edinburgh, Scotland&apos;s illustrious capital
        </BpkText>
      </div>
    }
  >
    <BpkImage
      src={EDI_IMAGE_SRC}
      altText="Canadian Parliament Building in Ottawa"
      aspectRatio={1.8}
    />
  </BpkOverlay>
);

const MixedExample = () => (
  <div>
    <SolidExamples />
    <TopExamples />
    <BottomExamples />
    <LeftExamples />
    <RightExamples />
    <div className={getClassName('bpk-overlay-stories')}>
      <div className={getClassName('bpk-overlay-stories__text-story')}>
        <VignetteExample />
      </div>
      <div className={getClassName('bpk-overlay-stories__text-story')}>
        <OverlayTypeNoneExample />
      </div>
      <div className={getClassName('bpk-overlay-stories__text-story')}>
        <WithForegroundContentExample />
      </div>
    </div>
  </div>
);

export {
  SolidExamples,
  TopExamples,
  BottomExamples,
  LeftExamples,
  RightExamples,
  VignetteExample,
  OverlayTypeNoneExample,
  WithForegroundContentExample,
  MixedExample,
};
