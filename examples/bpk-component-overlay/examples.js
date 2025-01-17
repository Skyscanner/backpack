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
import PropTypes from 'prop-types';

import BpkImage from '../../packages/bpk-component-image';
import BpkOverlay, {
  OVERLAY_TYPES,
} from '../../packages/bpk-component-overlay';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const IMAGE_SRC =
  'https://content.skyscnr.com/m/1c8c6338a92a7a94/original/matt-hardy-6ArTTluciuA-unsplash.jpg';
const VIDEO_IMG_SRC =
  'https://content.skyscnr.com/m/ecf210e9214ce0/original/37866_PH_20211029_001_story.jpg';

const getClassName = cssModules(STYLES);

const OverlayName = ({ overlayType }) => (
  <BpkText textStyle={TEXT_STYLES.xl}>{overlayType}</BpkText>
);

OverlayName.propTypes = {
  overlayType: PropTypes.objectOf(PropTypes.string),
};

const SolidExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {[
      OVERLAY_TYPES.solidLow,
      OVERLAY_TYPES.solidMedium,
      OVERLAY_TYPES.solidHigh,
    ].map((overlayType) => (
      <div
        key={overlayType}
        className={getClassName('bpk-overlay-stories__overlay-story')}
      >
        <BpkOverlay overlayType={overlayType}>
          <BpkImage
            src={IMAGE_SRC}
            altText="Ocean Ripple by Matt Hardy"
            aspectRatio={1.8}
          />
        </BpkOverlay>
        <div className={getClassName('bpk-overlay-stories__overlay--name')}>
          <BpkText textStyle={TEXT_STYLES.xl}>
            {OverlayName({ overlayType })}
          </BpkText>
        </div>
      </div>
    ))}
  </div>
);

const TopExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {[OVERLAY_TYPES.topLow, OVERLAY_TYPES.topMedium, OVERLAY_TYPES.topHigh].map(
      (overlayType) => (
        <div
          key={overlayType}
          className={getClassName('bpk-overlay-stories__overlay-story')}
        >
          <BpkOverlay overlayType={overlayType}>
            <BpkImage
              src={IMAGE_SRC}
              altText="Ocean Ripple by Matt Hardy"
              aspectRatio={1.8}
            />
          </BpkOverlay>
          <div className={getClassName('bpk-overlay-stories__overlay--name')}>
            <BpkText textStyle={TEXT_STYLES.xl}>
              {OverlayName({ overlayType })}
            </BpkText>
          </div>
        </div>
      ),
    )}
  </div>
);

const BottomExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {[
      OVERLAY_TYPES.bottomLow,
      OVERLAY_TYPES.bottomMedium,
      OVERLAY_TYPES.bottomHigh,
    ].map((overlayType) => (
      <div
        key={overlayType}
        className={getClassName('bpk-overlay-stories__overlay-story')}
      >
        <BpkOverlay overlayType={overlayType}>
          <BpkImage
            src={IMAGE_SRC}
            altText="Ocean Ripple by Matt Hardy"
            aspectRatio={1.8}
          />
        </BpkOverlay>
        <div className={getClassName('bpk-overlay-stories__overlay--name')}>
          <BpkText textStyle={TEXT_STYLES.xl}>
            {OverlayName({ overlayType })}
          </BpkText>
        </div>
      </div>
    ))}
  </div>
);

const LeftExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {[
      OVERLAY_TYPES.leftLow,
      OVERLAY_TYPES.leftMedium,
      OVERLAY_TYPES.leftHigh,
    ].map((overlayType) => (
      <div
        key={overlayType}
        className={getClassName('bpk-overlay-stories__overlay-story')}
      >
        <BpkOverlay overlayType={overlayType}>
          <BpkImage
            src={IMAGE_SRC}
            altText="Ocean Ripple by Matt Hardy"
            aspectRatio={1.8}
          />
        </BpkOverlay>
        <div className={getClassName('bpk-overlay-stories__overlay--name')}>
          <BpkText textStyle={TEXT_STYLES.xl}>
            {OverlayName({ overlayType })}
          </BpkText>
        </div>
      </div>
    ))}
  </div>
);

const RightExamples = () => (
  <div className={getClassName('bpk-overlay-stories')}>
    {[
      OVERLAY_TYPES.rightLow,
      OVERLAY_TYPES.rightMedium,
      OVERLAY_TYPES.rightHigh,
    ].map((overlayType) => (
      <div
        key={overlayType}
        className={getClassName('bpk-overlay-stories__overlay-story')}
      >
        <BpkOverlay overlayType={overlayType}>
          <BpkImage
            src={IMAGE_SRC}
            altText="Ocean Ripple by Matt Hardy"
            aspectRatio={1.8}
          />
        </BpkOverlay>
        <div className={getClassName('bpk-overlay-stories__overlay--name')}>
          <BpkText textStyle={TEXT_STYLES.xl}>
            {OverlayName({ overlayType })}
          </BpkText>
        </div>
      </div>
    ))}
  </div>
);

const VignetteExample = () => {
  const overlayType = OVERLAY_TYPES.vignette;
  return (
    <div className={getClassName('bpk-overlay-stories__overlay-story')}>
      <BpkOverlay overlayType={overlayType}>
        <BpkImage
          src={IMAGE_SRC}
          altText="Ocean Ripple by Matt Hardy"
          aspectRatio={1.8}
        />
      </BpkOverlay>
      <div className={getClassName('bpk-overlay-stories__overlay--name')}>
        <BpkText textStyle={TEXT_STYLES.xl}>
          {OverlayName({ overlayType })}
        </BpkText>
      </div>
    </div>
  );
};

const VideoOverlayExample = () => {
  const overlayType = OVERLAY_TYPES.videoOverlay;
  return (
    <div className={getClassName('bpk-overlay-stories__overlay-story')}>
      <BpkOverlay overlayType={overlayType}>
        <BpkImage src={VIDEO_IMG_SRC} altText="Mountains" aspectRatio={0.6} />
      </BpkOverlay>
      <div className={getClassName('bpk-overlay-stories__overlay--name')}>
        <BpkText textStyle={TEXT_STYLES.xl}>
          {OverlayName({ overlayType })}
        </BpkText>
      </div>
    </div>
  );
};

const WithForegroundContentExample = () => (
  <BpkOverlay
    overlayType={OVERLAY_TYPES.solidHigh}
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
  VideoOverlayExample,
  WithForegroundContentExample,
  MixedExample,
};
