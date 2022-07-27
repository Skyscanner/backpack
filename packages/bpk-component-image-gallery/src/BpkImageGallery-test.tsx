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
import {
  render,
  screen,
  getByRole,
  getAllByRole,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkImageGallery from './BpkImageGallery';

const KEYCODES = {
  ESCAPE: 'Escape',
};

describe('BpkImageGallery widget', () => {
  const images: React.ComponentProps<typeof BpkImageGallery>['images'] = [
    {
      url: 'image1',
    },
    {
      url: 'image2',
    },
    {
      url: 'image3',
    },
    {
      url: 'image4',
    },
    {
      url: 'image5',
    },
  ];
  const translations = {
    viewPhotosButton: 'View photos',
    closeModal: 'Close',
    previousImage: 'Previous image',
    nextImage: 'Next image',
  };

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    (window as any).IntersectionObserver = class IntersectionObserver {
      observe = jest.fn();

      disconnect = jest.fn();

      unobserve = jest.fn();
    };
  });

  describe('Default gallery view', () => {
    function generateImages(count: number) {
      return Array(count)
        .fill(null)
        .map((_, i) => ({ url: `url-${i + 1}` }));
    }

    type TestCase = [
      expectedCount: 1 | 3 | 6,
      actualCount: number,
      props: React.ComponentProps<typeof BpkImageGallery>,
    ];

    it.each<TestCase>([
      [6, 9, { images: generateImages(9), translations }],
      [6, 6, { images: generateImages(6), translations }],
      [3, 5, { images: generateImages(5), translations }],
      [3, 4, { images: generateImages(4), translations }],
      [3, 3, { images: generateImages(3), translations }],
      [1, 2, { images: generateImages(2), translations }],
      [1, 1, { images: generateImages(1), translations }],
    ])(
      'renders %i image(s) when there are %i image(s) available',
      (expectedCount, actualCount, props) => {
        render(<BpkImageGallery {...props} />);

        expect(screen.getByRole('list')).toHaveClass(`layout${expectedCount}`);
      },
    );
  });

  describe('Slide show view', () => {
    it('opens a slide show view clicking on a gallery image', async () => {
      render(<BpkImageGallery images={images} translations={translations} />);

      await userEvent.tab();
      await userEvent.tab();

      expect(screen.getAllByRole('listitem')[1]?.firstChild).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      expect(screen.getByRole('dialog')).toBeVisible();

      expect(screen.getByTestId('image-indicator-badge')).toHaveTextContent(
        '2/5',
      );
    });

    it('opens a slide show view clicking on a "View photos" button', async () => {
      render(<BpkImageGallery images={images} translations={translations} />);

      await userEvent.click(screen.getByTestId('open-image-gallery-btn'));

      expect(screen.getByRole('dialog')).toBeVisible();
    });

    it('closes the slide show view on Close button click', async () => {
      render(<BpkImageGallery images={images} translations={translations} />);

      await userEvent.click(screen.getByTestId('open-image-gallery-btn'));

      expect(screen.getByRole('dialog')).toBeVisible();

      await userEvent.click(screen.getByText('Close'));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('by default focus on the images scroll container', async () => {
      render(<BpkImageGallery images={images} translations={translations} />);

      await userEvent.click(screen.getByTestId('open-image-gallery-btn'));

      expect(screen.getByRole('dialog')).toBeVisible();

      expect(
        screen.getByTestId('image-gallery-scroll-container'),
      ).toHaveFocus();
    });

    it('closes the slide show view on Escape keydown', async () => {
      render(<BpkImageGallery images={images} translations={translations} />);

      await userEvent.click(screen.getByTestId('open-image-gallery-btn'));

      expect(screen.getByRole('dialog')).toBeVisible();

      const event = new KeyboardEvent('keydown', {
        key: KEYCODES.ESCAPE,
      });

      document.dispatchEvent(event);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('switches the image on thumbnail click for desktop and changes current image index badge in the header', async () => {
      render(<BpkImageGallery images={images} translations={translations} />);

      await userEvent.click(screen.getByTestId('open-image-gallery-btn'));

      const thumbnails = getByRole(screen.getByRole('dialog'), 'list');

      expect(screen.getByTestId('image-indicator-badge')).toHaveTextContent(
        '1/5',
      );

      await userEvent.click(getAllByRole(thumbnails, 'button')[2], {});

      expect(screen.getByTestId('image-indicator-badge')).toHaveTextContent(
        '3/5',
      );
    });

    it('renders only one image when only one available (no fake images for the infinite scroll)', async () => {
      render(
        <BpkImageGallery images={[images[0]]} translations={translations} />,
      );

      await userEvent.click(screen.getByTestId('open-image-gallery-btn'));

      expect(
        screen.getByTestId('image-gallery-scroll-container').childElementCount,
      ).toBe(1);
    });
  });
});
