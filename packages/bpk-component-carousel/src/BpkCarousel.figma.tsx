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

import figma from '@figma/code-connect';

import BpkCarousel from './BpkCarousel';

const imageList = [
  <img src="https://content.skyscnr.com/m/51c4c9dd04c8dc95/original/Carousel-placeholder-1.jpg" alt="" />,
  <img src="https://content.skyscnr.com/m/7470cf6a4ee49c26/original/Carousel-placeholder-4.jpg" alt="" />,
  <img src="https://content.skyscnr.com/m/f8b42e98e2b79a6/original/Carousel-placeholder-3.jpg" alt="" />,
  <img src="https://content.skyscnr.com/m/183e7ddaaca13b16/original/Carousel-placeholder-2.jpg" alt="" />,
]
figma.connect(
  BpkCarousel,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=27887%3A32585',
  {
    example: () => (
      <BpkCarousel
        images={imageList}
      />
    ),
  },
);
