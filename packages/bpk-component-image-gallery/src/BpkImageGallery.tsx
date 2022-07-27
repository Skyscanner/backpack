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

import React, { useState } from 'react';
import BpkButton from 'bpk-component-button';
import BpkSmallPictureIcon from 'bpk-component-icon/sm/picture';

import SlideshowView from './SlideshowView';
import STYLES from './BpkImageGallery.module.scss';
import type { ImageEntry } from './types';

type Props = {
  images: ImageEntry[];
  translations: {
    viewPhotosButton: string;
    closeModal: string;
    previousImage: string;
    nextImage: string;
  };
};

const layoutClassNames = {
  layout1: STYLES.layout1,
  layout3: STYLES.layout3,
  layout6: STYLES.layout6,
};

const ImageGallery = ({ images, translations }: Props) => {
  const { close, initialIndex, isOpen, open } = useSlideshowToggle();

  const imagesCount = images.length;
  const containerClassNames = [STYLES.grid];

  if (imagesCount < 3) {
    containerClassNames.push(layoutClassNames.layout1);
  } else if (imagesCount < 6) {
    containerClassNames.push(layoutClassNames.layout3);
  } else {
    containerClassNames.push(layoutClassNames.layout6);
  }

  return (
    <>
      <div className={STYLES.container} data-testid="image-gallery">
        <div className={containerClassNames.join(' ')} role="list">
          {images.slice(0, 6).map((image, index) => (
            <div key={image.url} role="listitem" className={STYLES.previewItem}>
              <button
                type="button"
                className={STYLES.previewItemButton}
                onClick={() => open(index)}
              >
                <img
                  className={STYLES.image}
                  alt=""
                  src={image.url}
                  loading="lazy"
                />
              </button>
            </div>
          ))}
          <div className={STYLES.openSlideshowViewButtonContainer}>
            <BpkButton
              className={STYLES.viewPhotosButton}
              primaryOnDark
              onClick={() => open()}
              data-testid="open-image-gallery-btn"
            >
              <BpkSmallPictureIcon />
              {translations.viewPhotosButton}
            </BpkButton>
          </div>
        </div>
      </div>
      {isOpen ? (
        <SlideshowView
          onClose={close}
          images={images}
          initialImageIndex={initialIndex}
          translations={translations}
        />
      ) : null}
    </>
  );
};

export default ImageGallery;

function useSlideshowToggle() {
  const [isOpen, setOpen] = useState(false);
  const [initialIndex, setInitialImageIndex] = useState(0);

  const open = (imageIndex: number = 0) => {
    setOpen(true);
    setInitialImageIndex(imageIndex);
  };

  const close = () => {
    setOpen(false);
    setInitialImageIndex(0);
  };

  return { initialIndex, isOpen, close, open };
}
