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

// @ts-expect-error TS(2724): '"@skyscanner/bpk-foundations-web/tokens/base.es6"... Remove this comment to see the full error message
import { spacingSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkBackgroundImage from './BpkBackgroundImage';

describe('BpkBackgroundImage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkBackgroundImage
        aspectRatio={612 / 408}
        style={{
          width: '100%',
          height: '20rem',
        }}
        src="./path/to/image.jpg"
      >
        <div
          style={{
            opacity: 0.7,
            marginLeft: spacingSm,
            paddingTop: spacingSm,
          }}
        />
      </BpkBackgroundImage>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when overriding src', () => {
    const { asFragment } = render(
      <BpkBackgroundImage
        aspectRatio={612 / 408}
        style={{
          width: '100%',
          height: '20rem',
        }}
        src="./path/to/image.jpg"
        imageStyle={{
          backgroundImage: './path/to/other_image.jpg',
        }}
      >
        <div
          style={{
            opacity: 0.7,
            marginLeft: spacingSm,
            paddingTop: spacingSm,
          }}
        />
      </BpkBackgroundImage>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should accept userland className', () => {
    const { asFragment } = render(
      <BpkBackgroundImage
        aspectRatio={816 / 544}
        style={{
          width: '100%',
          height: '20rem',
        }}
        className="userland-classname"
        src="./path/to/image.jpg"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should have loading behavior', () => {
    const { asFragment } = render(
      <BpkBackgroundImage
        loading
        aspectRatio={612 / 408}
        style={{
          width: '100%',
          height: '20rem',
        }}
        imageStyle={{
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }}
        src="./path/to/image.jpg"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should have inView behavior', () => {
    const { asFragment } = render(
      <BpkBackgroundImage
        inView={false}
        aspectRatio={612 / 408}
        style={{
          width: '100%',
          height: '20rem',
        }}
        imageStyle={{
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }}
        src="./path/to/image.jpg"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call error callback when the image fails to load', async () => {
    const mockOnError = jest.fn();

    let triggerError: (() => void) | undefined;

    class MockErrorImage {
      src: string = '';

      set onerror(callback: () => void) {
        triggerError = callback;
      }
    }

    Object.defineProperty(window, 'Image', {
      writable: true,
      configurable: true,
      value: MockErrorImage,
    });

    render(
      <BpkBackgroundImage
        aspectRatio={612 / 408}
        src="./invalid-image-path.jpg"
        onError={mockOnError}
      >
        <div
          style={{
            opacity: 0.7,
            marginLeft: spacingSm,
            paddingTop: spacingSm,
          }}
        />
      </BpkBackgroundImage>,
    );

    if (triggerError) {
      triggerError();
    }

    expect(mockOnError).toHaveBeenCalled();
  });
});
