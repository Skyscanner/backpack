/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import type { ReactNode } from "react";
import { forwardRef } from "react";

import { cssModules } from "../../bpk-react-utils";

// @ts-expect-error TS(2307): Cannot find module './BpkCarouselImage.module.scss... Remove this comment to see the full error message
import STYLES from "./BpkCarouselImage.module.scss"

const getClassName = cssModules(STYLES);

type ImageProps = {
  image: ReactNode;
  index: number;
};
const BpkCarouselImage = forwardRef<HTMLDivElement, ImageProps>(({ image, index }, ref) => (
  <div
    className={getClassName('bpk-carousel-image')}
    key={index}
    data-index={index}
    ref={ref}
    role="listitem"
  >
    {image}
  </div>
));

export default BpkCarouselImage

