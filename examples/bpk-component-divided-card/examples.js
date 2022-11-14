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

import React from 'react';

import BpkDividedCard, {
  ORIENTATION,
} from '../../packages/bpk-component-divided-card';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

const DefaultExample = () => (
  <BpkDividedCard primaryContent={longMessage} secondaryContent={message} />
);

const VerticalExample = () => (
  // eslint-disable-next-line backpack/use-tokens
  <div style={{ width: 343 }}>
    <BpkDividedCard
      primaryContent={longMessage}
      secondaryContent={message}
      orientation={ORIENTATION.vertical}
    />
  </div>
);
const WithHrefExample = () => (
  <BpkDividedCard
    primaryContent={longMessage}
    secondaryContent={message}
    href="http://www.skyscanner.net/"
  />
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <VerticalExample />
    <WithHrefExample />
  </div>
);

export { DefaultExample, VerticalExample, WithHrefExample, MixedExample };
