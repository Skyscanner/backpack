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

import { backgroundElevation03DarkColor } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkPageIndicator, {
  VARIANT,
} from "..";
import { BpkBackgroundImage } from '../../bpk-component-image';
import { cssModules } from '../../bpk-react-utils';

import type { BpkPageIndicatorProps } from "..";

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const image =
  'https://content.skyscnr.com/m/50d9dff3186775ad/original/Condor-Homepage-Hero-Option-3.png';
const imageWidth = 400;
const imageHeight = 90;
type PageIndicatorContainerProps = Omit<BpkPageIndicatorProps, 'currentIndex'>;

const PageIndicatorContainer = (props: PageIndicatorContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <BpkPageIndicator
      currentIndex={currentIndex}
      onClick={(_e, index) => {
        setCurrentIndex(index);
      }}
      indicatorLabel="Go to slide"
      prevNavLabel="Previous slide"
      nextNavLabel="Next slide"
      {...props}
    />
  );
};

const DefaultExample = () => <PageIndicatorContainer totalIndicators={7} />;

const ThreePagesExample = () => <PageIndicatorContainer totalIndicators={3} />;

const OverImageExample = () => (
  <BpkBackgroundImage
    aspectRatio={imageWidth / imageHeight}
    style={{ width: imageWidth, height: imageHeight }}
    imageStyle={{
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    }}
    src={image}
  >
    <PageIndicatorContainer
      totalIndicators={3}
      variant={VARIANT.overImage}
      className={getClassName('bpk-page-indicator-examples__container')}
    />
  </BpkBackgroundImage>
);

const WithNavExample = () => (
  <PageIndicatorContainer totalIndicators={7} showNav />
);

const backgroundColor = '#003580';

const WithNavOverImageSpacedExample = () => (
  <div
    style={{ width: imageWidth, height: imageHeight, backgroundColor: backgroundElevation03DarkColor }}
  >
    <div className={getClassName('bpk-page-indicator-examples__container')}>
      <PageIndicatorContainer
        totalIndicators={3}
        variant={VARIANT.overImageSpaced}
        showNav
        onClick={ () => {}}
      />
    </div>
  </div>
);

const ThreePagesWithNavExample = () => (
  <PageIndicatorContainer totalIndicators={3} showNav />
);

const VisualTestExample = () => (
  <>
    <DefaultExample />
    <ThreePagesExample />
    <OverImageExample />
    <WithNavExample />
    <WithNavOverImageSpacedExample />
    <ThreePagesWithNavExample />
    <div style={{ width: '50%' }}>
      <WithNavExample />
    </div>
  </>
);

export {
  DefaultExample,
  ThreePagesExample,
  OverImageExample,
  WithNavExample,
  WithNavOverImageSpacedExample,
  VisualTestExample,
};
