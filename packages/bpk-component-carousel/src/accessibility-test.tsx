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
import { axe } from 'jest-axe';

import BpkCarousel from './BpkCarousel';

const DemoImages = () => (
  <img src="http://content.skyscnr.com/available/949043373/949043373_343x132.jpg" alt='hotel bedroom' />
)
const images = [<DemoImages />, <DemoImages />, <DemoImages />, <DemoImages />, <DemoImages />]

describe('BpkCarousel accessibility tests', () => {

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    (window as any).IntersectionObserver = class IntersectionObserver {
      observe = jest.fn();

      disconnect = jest.fn();

      unobserve = jest.fn();
    };
  })

  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(<BpkCarousel images={images} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
