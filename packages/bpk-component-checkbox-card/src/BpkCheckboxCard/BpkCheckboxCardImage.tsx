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

import BpkImage from '../../../bpk-component-image';
import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxCardImageProps = {
  /**
   * Image URL
   */
  src: string;

  /**
   * Alt text for accessibility
   * @default ""
   */
  alt?: string;

  /**
   * Image aspect ratio (width/height)
   * @default 1
   */
  aspectRatio?: number;

  /**
   * Custom height for the image container
   * Accepts CSS values (e.g., "80px") or numeric pixel values
   */
  height?: string | number;
};

/**
 * BpkCheckboxCard.Image - Image slot component
 *
 * Displays an image using BpkImage component internally.
 * Commonly used for visual representations like car types or hotel photos.
 *
 * @example Basic usage
 * <BpkCheckboxCard.Image
 *   src="https://example.com/car.png"
 *   alt="Economy Car"
 * />
 *
 * @example With custom height and aspect ratio
 * <BpkCheckboxCard.Image
 *   src="https://example.com/car.png"
 *   alt="Economy Car"
 *   height={80}
 *   aspectRatio={16/9}
 * />
 */
export function BpkCheckboxCardImage({
  src,
  alt = '',
  aspectRatio = 1,
  height,
}: BpkCheckboxCardImageProps) {
  const className = getClassName('bpk-checkbox-card-image');

  const containerStyle: React.CSSProperties = {};
  if (height !== undefined) {
    containerStyle.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div className={className} style={Object.keys(containerStyle).length > 0 ? containerStyle : undefined}>
      <BpkImage
        src={src}
        altText={alt}
        aspectRatio={aspectRatio}
      />
    </div>
  );
}
