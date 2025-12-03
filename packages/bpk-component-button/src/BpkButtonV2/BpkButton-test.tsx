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

import { BpkButtonV2 } from './BpkButton';
import { SIZE_TYPES, BUTTON_TYPES } from './common-types';

import type { ButtonType } from './common-types';

describe('BpkButtonV2', () => {
  Object.keys(BUTTON_TYPES).forEach((buttonType) => {
    it(`should render correctly with type="${buttonType}"`, () => {
      const { asFragment } = render(
        <BpkButtonV2 type={buttonType as ButtonType}>
          {buttonType} button
        </BpkButtonV2>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render correctly with a "href" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#">My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 disabled>My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with large size', () => {
    const { asFragment } = render(
      <BpkButtonV2 size={SIZE_TYPES.large}>My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "iconOnly" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 iconOnly>My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly a "large", "secondary" button', () => {
    const { asFragment } = render(
      <BpkButtonV2 size={SIZE_TYPES.large} type={BUTTON_TYPES.secondary}>
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const { asFragment } = render(
      <BpkButtonV2 className="custom-class-1 custom-class-2">
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const { asFragment } = render(
      <BpkButtonV2 className="">My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#" blank>
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "rel" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#" rel="rel-attr">
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#" blank rel="rel-overwrite">
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "disabled" and "href" attributes', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#" disabled>
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with a class name if full width is added', () => {
    const { container } = render(
      <BpkButtonV2 fullWidth>
        My button
      </BpkButtonV2>,
    );

    expect(container?.firstElementChild?.classList?.contains('bpk-button--full-width')).toEqual(true);
  });

  describe('Link type buttons', () => {
    it('should render link type button correctly', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          Link button
        </BpkButtonV2>,
      );
      expect(container?.firstElementChild?.tagName).toBe('A');
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link')).toEqual(true);
    });

    it('should render link type button with large size correctly', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} size={SIZE_TYPES.large} href="#">
          Large link button
        </BpkButtonV2>,
      );
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link')).toEqual(true);
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link--large')).toEqual(true);
    });

    it('should render link type button with implicit underline correctly', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit href="#">
          Implicit link button
        </BpkButtonV2>,
      );
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link')).toEqual(true);
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link--implicit')).toEqual(true);
    });

    it('should render link on dark type button correctly', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} href="#">
          Link on dark button
        </BpkButtonV2>,
      );
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link')).toEqual(true);
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link--alternate')).toEqual(true);
    });

    it('should render link on dark type button with large size correctly', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} href="#">
          Large link on dark button
        </BpkButtonV2>,
      );
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link')).toEqual(true);
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link--alternate')).toEqual(true);
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link--large')).toEqual(true);
    });

    it('should render link type button with text only (no icons)', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          Text only
        </BpkButtonV2>,
      );

      // Text should be wrapped in underlined span
      const underlinedSpan = container.querySelector('.bpk-button-link-underlined');
      expect(underlinedSpan).toBeTruthy();
      expect(underlinedSpan?.textContent).toBe('Text only');
    });

    it('should render link type button with icon correctly (icon should not have underline)', () => {
      // Create a simple icon component for testing
      const TestIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      );

      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          <TestIcon />
        </BpkButtonV2>,
      );

      // Icon should not be wrapped in underlined span
      const underlinedSpan = container.querySelector('.bpk-button-link-underlined');
      expect(underlinedSpan).toBeFalsy();

      // Icon should be present
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render link type button with text and icon correctly (text underlined, icon not)', () => {
      const TestIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      );

      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          Text <TestIcon />
        </BpkButtonV2>,
      );

      // Text should be wrapped in underlined span
      const underlinedSpan = container.querySelector('.bpk-button-link-underlined');
      expect(underlinedSpan).toBeTruthy();
      expect(underlinedSpan?.textContent?.trim()).toBe('Text');

      // Icon should be outside the underlined span
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(underlinedSpan?.contains(svg)).toBeFalsy();
    });

    it('should render link type button with icon before text correctly', () => {
      const TestIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      );

      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          <TestIcon /> Text
        </BpkButtonV2>,
      );

      // Text should be wrapped in underlined span
      const underlinedSpan = container.querySelector('.bpk-button-link-underlined');
      expect(underlinedSpan).toBeTruthy();
      expect(underlinedSpan?.textContent?.trim()).toBe('Text');

      // Icon should be outside the underlined span
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(underlinedSpan?.contains(svg)).toBeFalsy();
    });

    it('should render link type button with icon between text correctly', () => {
      const TestIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      );

      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          Text <TestIcon /> more text
        </BpkButtonV2>,
      );

      // Both text parts should be wrapped in underlined spans
      const underlinedSpans = container.querySelectorAll('.bpk-button-link-underlined');
      expect(underlinedSpans.length).toBeGreaterThan(0);

      // Icon should be outside the underlined spans
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render disabled link type button correctly (no underline processing)', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#" disabled>
          Disabled link
        </BpkButtonV2>,
      );

      // Disabled links should not have underline processing
      const underlinedSpan = container.querySelector('.bpk-button-link-underlined');
      expect(underlinedSpan).toBeFalsy();
    });

    it('should render link type button without href as button (no underline processing)', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link}>
          Button without href
        </BpkButtonV2>,
      );

      // Should render as button, not anchor
      expect(container?.firstElementChild?.tagName).toBe('BUTTON');

      // Should have link button class
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link')).toEqual(true);

      // Buttons without href should not have underline processing
      const underlinedSpan = container.querySelector('.bpk-button-link-underlined');
      expect(underlinedSpan).toBeTruthy();
    });

    it('should detect icon components by name containing "Icon"', () => {
      const TestIconComponent = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      );
      TestIconComponent.displayName = 'TestIcon';

      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          <TestIconComponent />
        </BpkButtonV2>,
      );

      // Icon should not be wrapped in underlined span
      const underlinedSpan = container.querySelector('.bpk-button-link-underlined');
      expect(underlinedSpan).toBeFalsy();
    });

    it('should handle link type button with large size and icon', () => {
      const TestIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      );

      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} size={SIZE_TYPES.large} href="#">
          Large <TestIcon />
        </BpkButtonV2>,
      );

      // Should have large class
      expect(container?.firstElementChild?.classList?.contains('bpk-button-link--large')).toEqual(true);

      // Text should be wrapped in underlined span
      const underlinedSpan = container.querySelector('.bpk-button-link-underlined');
      expect(underlinedSpan).toBeTruthy();
    });

    it('should render link type button with fullWidth correctly', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} fullWidth href="#">
          Full width link
        </BpkButtonV2>,
      );

      expect(container?.firstElementChild?.classList?.contains('bpk-button-link')).toEqual(true);
      expect(container?.firstElementChild?.classList?.contains('bpk-button--full-width')).toEqual(true);
    });
  });
});
