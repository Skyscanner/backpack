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

  describe('link type buttons', () => {
    it('should render link type with underline span wrapper', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link}>Link button</BpkButtonV2>,
      );

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).toBeInTheDocument();
      expect(underlinedSpan?.textContent).toBe('Link button');
    });

    it('should render linkOnDark type with underline span wrapper', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.linkOnDark}>Link button</BpkButtonV2>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--link-on-dark')).toBe(true);

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).toBeInTheDocument();
    });

    it('should render link type with implicit class', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit>
          Implicit link
        </BpkButtonV2>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--link--implicit')).toBe(true);

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined--implicit"]');
      expect(underlinedSpan).toBeInTheDocument();
    });

    it('should render linkOnDark with implicit class', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit>
          Implicit link on dark
        </BpkButtonV2>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--link--implicit')).toBe(true);

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined--implicit--alternate"]');
      expect(underlinedSpan).toBeInTheDocument();
    });

    it('should NOT render underline span for iconOnly link', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButtonV2>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--link')).toBe(true);
      expect(button?.classList?.contains('bpk-button--icon-only')).toBe(true);

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).not.toBeInTheDocument();
    });

    it('should NOT render underline span for disabled link', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} disabled>
          Disabled link
        </BpkButtonV2>,
      );

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).not.toBeInTheDocument();
    });

    it('should NOT render underline span for iconOnly linkOnDark', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButtonV2>,
      );

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).not.toBeInTheDocument();
    });

    it('should render link as anchor with href', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          Link anchor
        </BpkButtonV2>,
      );

      const anchor = container.firstElementChild;
      expect(anchor?.tagName).toBe('A');
      expect(anchor?.getAttribute('href')).toBe('#');

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).toBeInTheDocument();
    });

    it('should render correctly with link type and iconOnly', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.link} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButtonV2>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--icon-only')).toBe(true);
    });

    it('should render correctly with linkOnDark type and iconOnly', () => {
      const { container } = render(
        <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButtonV2>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--icon-only')).toBe(true);
    });
  });
});
