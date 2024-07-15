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
import BpkSnippet from '../../packages/bpk-component-snippet';

const props = {
  src: 'https://content.skyscnr.com/m/f427e62297cce49/original/edinburgh-view-from-calton-hill.jpg',
  altText: 'image description',
  headline: 'Title of the section',
  subheading: 'Subheading',
  bodyText:
    'Lorem ipsum dolor sit amet consectetur. Tristique at pharetra tincidunt elementum vulputate varius sit euismod hac. Dignissim hendrerit enim eros nisi diam. Elit arcu mattis cum in id varius vitae augue neque. Quisque in semper malesuada lacus ut etiam elementum.',
  buttonText: 'Call to Action',
  onClick: () => window.open('https://www.skyscanner.net/flights', '_blank'),
};

const DefaultExample = () => (
  <BpkSnippet {...props} imageOrientation="landscape" />
);

const DesktopReverseExample = () => (
  <BpkSnippet {...props} desktopLayout="imageRight" />
);

const MobileSquareExample = () => (
  <BpkSnippet {...props} imageOrientation="square" />
);

const MobilePortraitExample = () => (
  <BpkSnippet {...props} imageOrientation="portrait" />
);

const EmptyExample = () => (
  <BpkSnippet
    {...props}
    imageOrientation="landscape"
    headline=""
    subheading=""
    bodyText=""
    buttonText=""
  />
);

export {
  DefaultExample,
  DesktopReverseExample,
  MobileSquareExample,
  MobilePortraitExample,
  EmptyExample,
};
