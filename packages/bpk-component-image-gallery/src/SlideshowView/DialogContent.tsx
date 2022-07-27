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
import CloseIcon from 'bpk-component-icon/sm/close';
import PictureIcon from 'bpk-component-icon/sm/picture';
import BpkBadge, { BADGE_TYPES } from 'bpk-component-badge';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';

import type { ImageEntry } from '../types';

import ImageSlides from './ImageSlides';
import STYLES from './DialogContent.module.scss';

type DialogContentProps = {
  onClose: () => void;
  images: ImageEntry[];
  initialImageIndex: number;
  translations: {
    closeModal: string;
    previousImage: string;
    nextImage: string;
  };
  // Scrim props
  dialogRef: React.RefCallback<HTMLElement>;
  isIpad: boolean;
  isIphone: boolean;
  renderTarget: () => HTMLElement;
};
const DialogContent = ({
  dialogRef,
  images,
  initialImageIndex = 0,
  isIpad: _isIpad,
  isIphone: _isIphone,
  onClose,
  renderTarget: _renderTarget,
  translations,
  ...props
}: DialogContentProps) => {
  const [shownImageIndex, setShownImageIndex] = useState(initialImageIndex);
  return (
    <div {...props} role="dialog" className={STYLES.modal} ref={dialogRef}>
      <header className={STYLES.header}>
        <BpkButton link onClick={onClose} className={STYLES.closeButton}>
          <CloseIcon />
          <BpkText textStyle={TEXT_STYLES.label1}>
            {translations.closeModal}
          </BpkText>
        </BpkButton>
        <BpkBadge
          type={BADGE_TYPES.inverse}
          className={STYLES.customBadge}
          data-testid="image-indicator-badge"
        >
          <PictureIcon />
          <BpkText textStyle={TEXT_STYLES.caption}>
            {`${shownImageIndex + 1}/${images.length}`}
          </BpkText>
        </BpkBadge>
      </header>
      <div className={STYLES.content}>
        <ImageSlides
          images={images}
          shownImageIndex={shownImageIndex}
          updateShownImageIndex={setShownImageIndex}
          translations={translations}
        />
      </div>
    </div>
  );
};

export default DialogContent;
