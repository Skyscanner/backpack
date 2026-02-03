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

import { render } from '@testing-library/react';

import { coreAccentDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkCardWrapper from './BpkCardWrapper';

const headerContent = (
  <span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span>
);
const cardContent = (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis
    sagittis purus, id blandit ipsum. Pellentesque nec diam nec erat condimentum
    dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et
    congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla
    libero laoreet at. Mauris porta varius ullamcorper. Sed laoreet libero
    mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
    sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae
    rhoncus. Fusce id enim porttitor, mattis ante in, vestibulum nulla.
  </div>
);

describe('BpkCardWrapper', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkCardWrapper
        header={headerContent}
        card={cardContent}
        backgroundColor={coreAccentDay}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkCardWrapper
        className="custom-classname"
        header={headerContent}
        card={cardContent}
        backgroundColor={coreAccentDay}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
