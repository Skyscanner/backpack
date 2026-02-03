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
import '@testing-library/jest-dom';

import BpkInfoBanner from './BpkInfoBanner';
import { ALERT_TYPES } from './common-types';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';

describe('BpkInfoBanner', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkInfoBanner type={ALERT_TYPES.SUCCESS} message={message} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render correctly with no type specified', () => {
    const { asFragment } = render(<BpkInfoBanner message={message} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly hidden', () => {
    const { asFragment } = render(
      <BpkInfoBanner
        show={false}
        type={ALERT_TYPES.SUCCESS}
        message={message}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom bannerClassName', () => {
    render(
      <BpkInfoBanner
        bannerClassName="custom-banner-class-name"
        type={ALERT_TYPES.SUCCESS}
        message={message}
      />,
    );
    expect(screen.getByText(message).parentElement?.parentElement).toHaveClass(
      'custom-banner-class-name',
    );
  });
});
