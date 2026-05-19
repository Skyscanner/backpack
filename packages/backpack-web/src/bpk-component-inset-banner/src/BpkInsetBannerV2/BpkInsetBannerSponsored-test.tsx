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

import BpkInsetBannerSponsored from './BpkInsetBannerSponsored';
import { VARIANT } from './common-types';

describe('BpkInsetBanner', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <BpkInsetBannerSponsored
        title="Lorem ipsum"
        logo="https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png"
        backgroundColor="#F55D42"
        variant={VARIANT.onDark}
      />,
    );

    expect(getByText('Lorem ipsum')).toBeInTheDocument();
  });

  it('should render call to action text if provided', () => {
    const { getByText } = render(
      <BpkInsetBannerSponsored
        title="Lorem ipsum"
        subheadline="Lorem ipsum dolor sit amet"
        logo="https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png"
        callToAction={{
          text: 'Sponsored',
          bottomSheetContent: [
            {
              title: 'Lorem ipsum dolor sit amet',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
              title: 'Consectetur adipiscing elit',
              description:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
          ],
          bottomSheetTitle: 'About this advert',
          closeBtnIcon: true,
          labelTitle: true,
          bottomSheetLabel: 'Info',
          buttonCloseLabel: 'Close',
        }}
        backgroundColor="#FFE300"
        variant={VARIANT.onLight}
        accessibilityLabel="Sponsored by Skyscanner"
      />,
    );

    expect(getByText('Sponsored')).toBeInTheDocument();
  });

  it('should render call to action popover text if provided', () => {
    render(
      <BpkInsetBannerSponsored
        title="Lorem ipsum"
        subheadline="Lorem ipsum dolor sit amet"
        logo="https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png"
        callToAction={{
          text: 'Sponsored',
          bottomSheetContent: [
            {
              title: 'Lorem ipsum dolor sit amet',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
              title: 'Consectetur adipiscing elit',
              description:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
          ],
          bottomSheetTitle: 'About this advert',
          closeBtnIcon: true,
          labelTitle: true,
          bottomSheetLabel: 'Info',
          buttonCloseLabel: 'Close',
        }}
        backgroundColor="#FFE300"
        variant={VARIANT.onLight}
        accessibilityLabel="Sponsored by Skyscanner"
      />,
    );

    const ctaButton = screen.getByTestId('ctaBtn');

    fireEvent.click(ctaButton);

    expect(screen.getByText('Consectetur adipiscing elit')).toBeInTheDocument();
  });

  it('should not render view or info icons in bottom sheet items', () => {
    render(
      <BpkInsetBannerSponsored
        title="Lorem ipsum"
        logo="https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png"
        callToAction={{
          text: 'Sponsored',
          bottomSheetContent: [
            {
              title: 'First item title',
              description: 'First item description',
            },
            {
              title: 'Second item title',
              description: 'Second item description',
            },
          ],
          bottomSheetTitle: 'About this advert',
          buttonCloseLabel: 'Close',
        }}
        backgroundColor="#FFE300"
        variant={VARIANT.onLight}
        accessibilityLabel="Sponsored by Skyscanner"
      />,
    );

    const ctaButton = screen.getByTestId('ctaBtn');
    fireEvent.click(ctaButton);

    expect(screen.queryByTestId('view-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bottom-sheet-icon-container')).not.toBeInTheDocument();
  });

  it('should render a title-less first item followed by titled sections (DSA shape)', () => {
    render(
      <BpkInsetBannerSponsored
        title="Lorem ipsum"
        logo="https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png"
        callToAction={{
          text: 'Sponsored',
          bottomSheetContent: [
            {
              description: 'This advert was shown because you searched for flights.',
            },
            {
              title: 'Based on your current search',
              description: 'We use your current search to show relevant ads.',
            },
            {
              title: 'Based on your past activity',
              description: 'We may use your past searches to personalise ads.',
            },
          ],
          bottomSheetTitle: 'About this advert',
          buttonCloseLabel: 'Close',
        }}
        backgroundColor="#FFE300"
        variant={VARIANT.onLight}
        accessibilityLabel="Sponsored by Skyscanner"
      />,
    );

    const ctaButton = screen.getByTestId('ctaBtn');
    fireEvent.click(ctaButton);

    expect(screen.getByText('This advert was shown because you searched for flights.')).toBeInTheDocument();
    expect(screen.getByText('Based on your current search')).toBeInTheDocument();
    expect(screen.getByText('Based on your past activity')).toBeInTheDocument();
    expect(screen.queryByTestId('view-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
  });
});
