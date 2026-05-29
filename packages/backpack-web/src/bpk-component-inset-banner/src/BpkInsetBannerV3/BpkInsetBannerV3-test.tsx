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

import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

import BpkInsetBannerV3 from './BpkInsetBannerV3';

describe('BpkInsetBannerV3', () => {
  describe('Root', () => {
    it('should render children', () => {
      render(
        <BpkInsetBannerV3.Root>
          <span>Hello</span>
        </BpkInsetBannerV3.Root>,
      );
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('should apply backgroundColor via inline style', () => {
      const { container } = render(
        <BpkInsetBannerV3.Root backgroundColor="#FF6601">
          <span>Content</span>
        </BpkInsetBannerV3.Root>,
      );
      const root = container.firstChild as HTMLElement;
      expect(root.style.backgroundColor).toBe('rgb(255, 102, 1)');
    });

    it('should render as a div', () => {
      const { container } = render(
        <BpkInsetBannerV3.Root>
          <span>Content</span>
        </BpkInsetBannerV3.Root>,
      );
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('should pass arbitrary HTML props to the root element', () => {
      render(
        <BpkInsetBannerV3.Root aria-label="Banner" data-testid="root">
          <span>Content</span>
        </BpkInsetBannerV3.Root>,
      );
      const root = screen.getByTestId('root');
      expect(root).toHaveAttribute('aria-label', 'Banner');
    });
  });

  describe('LeadingAccessory', () => {
    it('should render children', () => {
      render(
        <BpkInsetBannerV3.Root>
          <BpkInsetBannerV3.LeadingAccessory>
            <img src="logo.png" alt="Logo" />
          </BpkInsetBannerV3.LeadingAccessory>
        </BpkInsetBannerV3.Root>,
      );
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('should render children', () => {
      render(
        <BpkInsetBannerV3.Root>
          <BpkInsetBannerV3.Content>
            <p>Banner title</p>
          </BpkInsetBannerV3.Content>
        </BpkInsetBannerV3.Root>,
      );
      expect(screen.getByText('Banner title')).toBeInTheDocument();
    });
  });

  describe('TrailingAccessory', () => {
    it('should render children', () => {
      render(
        <BpkInsetBannerV3.Root>
          <BpkInsetBannerV3.TrailingAccessory>
            <span>Sponsored</span>
          </BpkInsetBannerV3.TrailingAccessory>
        </BpkInsetBannerV3.Root>,
      );
      expect(screen.getByText('Sponsored')).toBeInTheDocument();
    });

    it('should not have role="button" when onClick is not provided', () => {
      render(
        <BpkInsetBannerV3.TrailingAccessory>
          <span>Info</span>
        </BpkInsetBannerV3.TrailingAccessory>,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render as a button when onClick is provided', () => {
      render(
        <BpkInsetBannerV3.TrailingAccessory onClick={jest.fn()} aria-label="About this advert">
          <span>Info</span>
        </BpkInsetBannerV3.TrailingAccessory>,
      );
      const el = screen.getByRole('button');
      expect(el).toBeInTheDocument();
    });

    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      render(
        <BpkInsetBannerV3.TrailingAccessory onClick={handleClick} aria-label="About this advert">
          <span>Info</span>
        </BpkInsetBannerV3.TrailingAccessory>,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible via native button behaviour', () => {
      render(
        <BpkInsetBannerV3.TrailingAccessory onClick={jest.fn()} aria-label="About this advert">
          <span>Info</span>
        </BpkInsetBannerV3.TrailingAccessory>,
      );
      // Native <button> handles Enter/Space natively — just assert it is a button
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('should render children', () => {
      render(
        <BpkInsetBannerV3.Header>
          <span>Header content</span>
        </BpkInsetBannerV3.Header>,
      );
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('should not apply layout modifier by default', () => {
      const { container } = render(
        <BpkInsetBannerV3.Header>
          <span>Content</span>
        </BpkInsetBannerV3.Header>,
      );
      const header = container.firstChild as HTMLElement;
      expect(header.className).not.toMatch(/horizontal/);
      expect(header.className).not.toMatch(/vertical/);
    });

    it('should apply horizontal layout modifier when layout="horizontal"', () => {
      const { container } = render(
        <BpkInsetBannerV3.Header layout="horizontal">
          <span>Content</span>
        </BpkInsetBannerV3.Header>,
      );
      const header = container.firstChild as HTMLElement;
      expect(header.className).toMatch(/horizontal/);
    });

    it('should apply vertical layout modifier when layout="vertical"', () => {
      const { container } = render(
        <BpkInsetBannerV3.Header layout="vertical">
          <span>Content</span>
        </BpkInsetBannerV3.Header>,
      );
      const header = container.firstChild as HTMLElement;
      expect(header.className).toMatch(/vertical/);
    });
  });

  describe('composed usage', () => {
    it('should render all slots together', () => {
      render(
        <BpkInsetBannerV3.Root
          backgroundColor="#FFE300"
          textVariant="on-light"
          aria-label="Sponsored by Skyscanner"
        >
          <BpkInsetBannerV3.Header>
            <BpkInsetBannerV3.LeadingAccessory>
              <img src="logo.png" alt="Skyscanner" />
            </BpkInsetBannerV3.LeadingAccessory>
            <BpkInsetBannerV3.Content>
              <p>Title text</p>
              <p>Subheadline text</p>
            </BpkInsetBannerV3.Content>
            <BpkInsetBannerV3.TrailingAccessory onClick={jest.fn()} aria-label="About this advert">
              <span>Sponsored</span>
            </BpkInsetBannerV3.TrailingAccessory>
          </BpkInsetBannerV3.Header>
        </BpkInsetBannerV3.Root>,
      );

      expect(screen.getByAltText('Skyscanner')).toBeInTheDocument();
      expect(screen.getByText('Title text')).toBeInTheDocument();
      expect(screen.getByText('Subheadline text')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
