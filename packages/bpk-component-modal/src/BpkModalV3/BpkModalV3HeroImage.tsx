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

import type { CSSProperties, ReactNode } from 'react';

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import STYLES from './BpkModalV3.module.scss';

const getClassName = cssModules(STYLES);

type BpkModalV3HeroImageProps = {
  src: string;
  alt: string;
  height?: string;
  children?: ReactNode;
};

const BpkModalV3HeroImage = ({
  alt,
  children,
  height,
  src,
}: BpkModalV3HeroImageProps) => {
  const style: CSSProperties | undefined = height
    ? { height, flex: 'none' }
    : undefined;

  return (
    <div
      className={getClassName('bpk-modal-v3__hero-image')}
      style={style}
      {...getDataComponentAttribute('ModalV3HeroImage')}
    >
      <img
        src={src}
        alt={alt}
        className={getClassName('bpk-modal-v3__hero-image-img')}
      />
      {children}
    </div>
  );
};

export default BpkModalV3HeroImage;
export type { BpkModalV3HeroImageProps };
