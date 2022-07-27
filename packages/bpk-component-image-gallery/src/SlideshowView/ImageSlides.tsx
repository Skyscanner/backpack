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

import React, { Suspense, useRef } from 'react';
import { flushSync } from 'react-dom';
import BpkButton from 'bpk-component-button';
import ChevronLeftIcon from 'bpk-component-icon/lg/chevron-left';
import ChevronRightIcon from 'bpk-component-icon/lg/chevron-right';
import { withRtlSupport } from 'bpk-component-icon';

import type { ImageEntry } from '../types';

import SlidesIndicator from './SlidesIndicator';
import { useScrollToInitialImage } from './utils';
import STYLES from './ImageSlides.module.scss';
import ScrollContainer from './ScrollContainer';

const RtlSupportedChevronLeftIcon = withRtlSupport(ChevronLeftIcon);
const RtlSupportedChevronRightIcon = withRtlSupport(ChevronRightIcon);

type Props = {
  images: ImageEntry[];
  shownImageIndex: number;
  updateShownImageIndex: React.Dispatch<React.SetStateAction<number>>;
  translations: {
    previousImage: string;
    nextImage: string;
  };
};

const ImageSlides = ({
  images,
  shownImageIndex,
  translations,
  updateShownImageIndex,
}: Props) => {
  const shownImageRef = useRef<HTMLDivElement | null>(null);

  useScrollToInitialImage(shownImageRef);

  const updateShownImageIndexAndScroll = (newIndex: number) => {
    flushSync(() => {
      updateShownImageIndex(newIndex);
    });
    shownImageRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
    });
  };

  const scrollToNext = () => {
    updateShownImageIndexAndScroll(
      shownImageIndex === images.length - 1 ? 0 : shownImageIndex + 1,
    );
  };
  const scrollToPrev = () => {
    updateShownImageIndexAndScroll(
      shownImageIndex === 0 ? images.length - 1 : shownImageIndex - 1,
    );
  };

  const containerClassNames = [STYLES.imagesContainer];

  if (images.length === 1) {
    containerClassNames.push(STYLES.imagesContainerNoNudgers);
  }

  return (
    <div className={STYLES.container}>
      <div className={containerClassNames.join(' ')}>
        <Nudger onClick={scrollToPrev} label={translations.nextImage}>
          <RtlSupportedChevronLeftIcon />
        </Nudger>
        <div className={STYLES.aspectRatio}>
          <ScrollContainer
            images={images}
            shownImageIndex={shownImageIndex}
            updateShownImageIndex={updateShownImageIndex}
            shownImageRef={shownImageRef}
          />
        </div>
        <Nudger onClick={scrollToNext} label={translations.nextImage}>
          <RtlSupportedChevronRightIcon />
        </Nudger>
      </div>
      <Suspense fallback={null}>
        <SlidesIndicator
          images={images}
          shownImageIndex={shownImageIndex}
          updateShownImageIndex={updateShownImageIndexAndScroll}
        />
      </Suspense>
    </div>
  );
};

type NudgerProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
};
const Nudger = ({ children, label, onClick }: NudgerProps) => (
  <BpkButton
    aria-label={label}
    title={label}
    link
    iconOnly
    className={STYLES.nudgeButton}
    onClick={onClick}
  >
    {children}
  </BpkButton>
);

export default ImageSlides;
