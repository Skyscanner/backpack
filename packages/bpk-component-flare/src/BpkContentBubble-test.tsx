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

import BpkContentBubble from './BpkContentBubble';

describe('BpkContentBubble', () => {
  it('renders correctly with required props', () => {
    const content = <div>Test</div>;
    const { asFragment } = render(
      <BpkContentBubble showPointer content={content} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with a custom className', () => {
    const content = <div>Test</div>;
    const { asFragment } = render(
      <BpkContentBubble
        showPointer
        content={content}
        className="my-custom-class"
        contentClassName="my-custom-content-class"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with flareProps', () => {
    const content = <div>Test</div>;
    const { asFragment } = render(
      <BpkContentBubble
        showPointer
        content={content}
        rounded={false}
        flareProps={{ rounded: false }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly without pointer', () => {
    const content = <div>Test</div>;
    const { asFragment } = render(
      <BpkContentBubble
        content={content}
        rounded={false}
        flareProps={{ rounded: false }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
