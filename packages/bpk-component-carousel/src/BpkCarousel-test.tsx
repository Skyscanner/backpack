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

import type { ReactNode } from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BpkCarousel from './BpkCarousel';

describe('BpkCarousel', () => {
  let images: ReactNode[]

  const DemoImages = () => (
    <img src="http://content.skyscnr.com/available/949043373/949043373_343x132.jpg" alt='hotel bedroom' />
  )

  function generateDemoImages(count: number) {
    return Array.from({ length: count }, (_, i) => (<DemoImages />));
  }

  type TestCase = [
    expectedCount: 7 | 5 | 4 | 12,
    actualCount: number,
    props: React.ComponentProps<typeof BpkCarousel>,
  ];

  beforeAll(() => {

    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    (window as any).IntersectionObserver = class IntersectionObserver {
      observe = jest.fn();

      disconnect = jest.fn();

      unobserve = jest.fn();
    };
    images = [<DemoImages />, <DemoImages />, <DemoImages />, <DemoImages />, <DemoImages />];
  });

  it('should render correctly', () => {
    render(<BpkCarousel images={images} />);

    expect(screen.getAllByRole('listitem').length).toBe(7);
    expect(document.querySelectorAll('.bpk-page-indicator__indicator').length).toBe(
      5,
    );
    expect(document.querySelector('.bpk-carousel__page-indicator-over-image')).toBeTruthy();
  });

  it.each<TestCase>([
    [12, 10, { images: generateDemoImages(10) }],
    [7, 5, { images: generateDemoImages(5) }],
    [5, 3, { images: generateDemoImages(3) }],
    [4, 2, { images: generateDemoImages(2) }],
  ])(
    'renders %i image(s) when there are %i image(s) available',
    (expectedCount, actualCount, props) => {
      render(<BpkCarousel {...props} />);

      expect(screen.getByTestId('image-gallery-scroll-container').childElementCount).toBe(expectedCount);
    },
  );

  it('renders only one image when only one available (no fake images for the infinite scroll)', async () => {
    render(<BpkCarousel images={[images[0]]} />);

    expect(screen.getByTestId('image-gallery-scroll-container').childElementCount).toBe(1);
  });

  it('should render costom bottom', async () => {
    render(<BpkCarousel images={images} bottom={48} />);

    expect(screen.getByTestId('carousel-page-indicator-container')).toHaveStyle({bottom: '48px'});
  });
});
