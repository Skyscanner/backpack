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

import { cssModules } from '../../packages/bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkImage from '../../packages/bpk-component-image';
import BpkOverlay, {
  OVERLAY_TYPES,
  OVERLAY_LEVELS,
} from '../../packages/bpk-component-overlay';

import STYLES from './examples.module.scss';

const IMAGE_SRC =
  'https://content.skyscnr.com/m/1c8c6338a92a7a94/original/matt-hardy-6ArTTluciuA-unsplash.jpg';

const getClassName = cssModules(STYLES);

const SolidExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {Object.keys(OVERLAY_LEVELS).map((level) => {
      if (level !== OVERLAY_LEVELS.off) {
        return (
          <div className={getClassName('bpk-overlay-stories__overlay-story')}>
            <BpkOverlay overlayType={OVERLAY_TYPES.solid} overlayLevel={level}>
              <BpkImage
                src={IMAGE_SRC}
                altText="Ocean Ripple by Matt Hardy"
                aspectRatio={1.8}
              />
            </BpkOverlay>
            <div className={getClassName('bpk-overlay-stories__overlay--name')}>
              <BpkText textStyle={TEXT_STYLES.xl}>
                Solid {level.charAt(0).toUpperCase() + level.slice(1)}
              </BpkText>
            </div>
          </div>
        );
      }
      return null;
    })}
  </div>
);

const TopExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {Object.keys(OVERLAY_LEVELS).map((level) => {
      if (level !== OVERLAY_LEVELS.off) {
        return (
          <div className={getClassName('bpk-overlay-stories__overlay-story')}>
            <BpkOverlay overlayType={OVERLAY_TYPES.top} overlayLevel={level}>
              <BpkImage
                src={IMAGE_SRC}
                altText="Ocean Ripple by Matt Hardy"
                aspectRatio={1.8}
              />
            </BpkOverlay>
            <div className={getClassName('bpk-overlay-stories__overlay--name')}>
              <BpkText textStyle={TEXT_STYLES.xl}>
                Top {level.charAt(0).toUpperCase() + level.slice(1)}
              </BpkText>
            </div>
          </div>
        );
      }
      return null;
    })}
  </div>
);

const BottomExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {Object.keys(OVERLAY_LEVELS).map((level) => {
      if (level !== OVERLAY_LEVELS.off) {
        return (
          <div className={getClassName('bpk-overlay-stories__overlay-story')}>
            <BpkOverlay overlayType={OVERLAY_TYPES.bottom} overlayLevel={level}>
              <BpkImage
                src={IMAGE_SRC}
                altText="Ocean Ripple by Matt Hardy"
                aspectRatio={1.8}
              />
            </BpkOverlay>
            <div className={getClassName('bpk-overlay-stories__overlay--name')}>
              <BpkText textStyle={TEXT_STYLES.xl}>
                Bottom {level.charAt(0).toUpperCase() + level.slice(1)}
              </BpkText>
            </div>
          </div>
        );
      }
      return null;
    })}
  </div>
);

const LeftExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {Object.keys(OVERLAY_LEVELS).map((level) => {
      if (level !== OVERLAY_LEVELS.off) {
        return (
          <div className={getClassName('bpk-overlay-stories__overlay-story')}>
            <BpkOverlay overlayType={OVERLAY_TYPES.left} overlayLevel={level}>
              <BpkImage
                src={IMAGE_SRC}
                altText="Ocean Ripple by Matt Hardy"
                aspectRatio={1.8}
              />
            </BpkOverlay>
            <div className={getClassName('bpk-overlay-stories__overlay--name')}>
              <BpkText textStyle={TEXT_STYLES.xl}>
                Left {level.charAt(0).toUpperCase() + level.slice(1)}
              </BpkText>
            </div>
          </div>
        );
      }
      return null;
    })}
  </div>
);

const RightExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {Object.keys(OVERLAY_LEVELS).map((level) => {
      if (level !== OVERLAY_LEVELS.off) {
        return (
          <div className={getClassName('bpk-overlay-stories__overlay-story')}>
            <BpkOverlay overlayType={OVERLAY_TYPES.right} overlayLevel={level}>
              <BpkImage
                src={IMAGE_SRC}
                altText="Ocean Ripple by Matt Hardy"
                aspectRatio={1.8}
              />
            </BpkOverlay>
            <div className={getClassName('bpk-overlay-stories__overlay--name')}>
              <BpkText textStyle={TEXT_STYLES.xl}>
                Right {level.charAt(0).toUpperCase() + level.slice(1)}
              </BpkText>
            </div>
          </div>
        );
      }
      return null;
    })}
  </div>
);

const VignetteExample = () => (
  <div className={getClassName('bpk-overlay-stories__overlay-story')}>
    <BpkOverlay
      overlayType={OVERLAY_TYPES.vignette}
      overlayLevel={OVERLAY_LEVELS.high}
    >
      <BpkImage
        src={IMAGE_SRC}
        altText="Ocean Ripple by Matt Hardy"
        aspectRatio={1.8}
      />
    </BpkOverlay>
    <div className={getClassName('bpk-overlay-stories__overlay--name')}>
      <BpkText textStyle={TEXT_STYLES.xl}>Vignette</BpkText>
    </div>
  </div>
);

const WithForegroundContentExample = () => (
  <BpkOverlay
    overlayType={OVERLAY_TYPES.solid}
    overlayLevel={OVERLAY_LEVELS.high}
    foregroundContent={
      <div className={getClassName('bpk-overlay-stories__foreground')}>
        <BpkText textStyle={TEXT_STYLES.xl}>
          Take a break from the city and relax in pure bliss
        </BpkText>
      </div>
    }
  >
    <BpkImage
      src={IMAGE_SRC}
      altText="Ocean Ripple by Matt Hardy"
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
    <VignetteExample />
    <div className={getClassName('bpk-overlay-stories')}>
      <div className={getClassName('bpk-overlay-stories__overlay-story')}>
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
  WithForegroundContentExample,
  MixedExample,
};
