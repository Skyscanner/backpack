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

import BpkCarousel from '../../packages/bpk-component-carousel'

const imageUrls = [
  "https://content.skyscnr.com/m/7470cf6a4ee49c26/original/Carousel-placeholder-4.jpg",
  "https://content.skyscnr.com/m/183e7ddaaca13b16/original/Carousel-placeholder-2.jpg",
  "https://content.skyscnr.com/m/f8b42e98e2b79a6/original/Carousel-placeholder-3.jpg",
  "https://content.skyscnr.com/m/51c4c9dd04c8dc95/original/Carousel-placeholder-1.jpg",
]

const imagesList = imageUrls.map(url => <div><img src={url} alt='hotel bedroom' /></div>)

const DefaultExample = () => (
  <BpkCarousel images={imagesList} bottom={16} />
);

const WithNavDesktopExample = () => (
  <div style={{width: "800px", margin: "auto"}}>
    <BpkCarousel images={imagesList} bottom={16} />
  </div>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <br />
    <WithNavDesktopExample />
  </div>
);

export{
  DefaultExample,
  WithNavDesktopExample,
  MixedExample
}
