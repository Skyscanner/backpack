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

import { render, screen } from '@testing-library/react';

import BpkSnippet from './BpkSnippet';

const props = {
  src: 'https://content.skyscnr.com/m/f427e62297cce49/original/edinburgh-view-from-calton-hill.jpg',
  altText: 'image description',
  headline: 'Title of the section',
  subheading: 'Subheading',
  bodyText: 'Lorem ipsum dolor sit amet consectetur.',
  buttonText: 'Call to Action',
  onClick: () => window.open('https://www.skyscanner.net/flights', '_blank'),
};

describe('BpkSnippet', () => {
  it('should render desktop correctly', () => {
    const { container } = render(<BpkSnippet {...props} />);
    expect(container.querySelectorAll('.bpk-snippet--image').length).toBe(1);
    expect(screen.getByText('Title of the section')).toBeVisible();
    expect(screen.getByText('Subheading')).toBeInTheDocument();
    expect(
      screen.getByText('Lorem ipsum dolor sit amet consectetur.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Call to Action')).toBeInTheDocument();
  });

  it('should render vertical desktop correctly', () => {
    const { container } = render(
      <BpkSnippet {...props} desktopLayout="imageRight" />,
    );
    expect(container.querySelectorAll('.bpk-snippet--image').length).toBe(1);
    expect(container.querySelectorAll('.bpk-snippet--row-reverse').length).toBe(
      1,
    );
  });

  it('should render mobile correctly', () => {
    const { container } = render(
      <BpkSnippet {...props} imageOrientation="landscape" />,
    );
    expect(container.querySelectorAll('.bpk-snippet--image').length).toBe(1);
    expect(
      container.querySelectorAll('.bpk-snippet--image__landscape').length,
    ).toBe(1);
  });

  it('should render square mobile correctly', () => {
    const { container } = render(
      <BpkSnippet {...props} imageOrientation="square" />,
    );
    expect(container.querySelectorAll('.bpk-snippet--image').length).toBe(1);
    expect(
      container.querySelectorAll('.bpk-snippet--image__square').length,
    ).toBe(1);
  });
});
