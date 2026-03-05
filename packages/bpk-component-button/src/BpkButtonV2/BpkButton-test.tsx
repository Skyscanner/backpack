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

import { BpkButtonV2 as BpkButton } from './BpkButton';
import { SIZE_TYPES, BUTTON_TYPES } from './common-types';

import type { ButtonType } from './common-types';

describe('BpkButton', () => {
  Object.keys(BUTTON_TYPES).forEach((buttonType) => {
    it(`should render correctly with type="${buttonType}"`, () => {
      const { container } = render(
        <BpkButton type={buttonType as ButtonType}>
          {buttonType} button
        </BpkButton>,
      );

      const el = container.firstElementChild;
      expect(el?.tagName).toBe('BUTTON');
      expect(el?.getAttribute('type')).toBe('button');
      expect(el?.getAttribute('data-backpack-ds-component')).toBe('Button');
      expect(el?.classList.contains('bpk-button')).toBe(true);
      expect(el?.classList.contains(`bpk-button--${buttonType}`)).toBe(true);
    });
  });

  it('should render correctly with a "href" attribute', () => {
    const { container } = render(
      <BpkButton href="#">My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('A');
    expect(el?.getAttribute('href')).toBe('#');
    expect(el?.getAttribute('target')).toBe('');
    expect(el?.getAttribute('data-backpack-ds-component')).toBe('Button');
    expect(el?.classList.contains('bpk-button')).toBe(true);
    expect(el?.classList.contains('bpk-button--primary')).toBe(true);
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { container } = render(
      <BpkButton disabled>My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el?.hasAttribute('disabled')).toBe(true);
    expect(el?.getAttribute('type')).toBe('button');
    expect(el?.classList.contains('bpk-button')).toBe(true);
    expect(el?.classList.contains('bpk-button--primary')).toBe(true);
  });

  it('should render correctly with large size', () => {
    const { container } = render(
      <BpkButton size={SIZE_TYPES.large}>My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el?.classList.contains('bpk-button')).toBe(true);
    expect(el?.classList.contains('bpk-button--large')).toBe(true);
    expect(el?.classList.contains('bpk-button--primary')).toBe(true);
  });

  it('should render correctly with an "iconOnly" attribute', () => {
    const { container } = render(
      <BpkButton iconOnly>My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el?.classList.contains('bpk-button')).toBe(true);
    expect(el?.classList.contains('bpk-button--icon-only')).toBe(true);
    expect(el?.classList.contains('bpk-button--primary')).toBe(true);
  });

  it('should render correctly a "large", "secondary" button', () => {
    const { container } = render(
      <BpkButton size={SIZE_TYPES.large} type={BUTTON_TYPES.secondary}>
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el?.classList.contains('bpk-button')).toBe(true);
    expect(el?.classList.contains('bpk-button--large')).toBe(true);
    expect(el?.classList.contains('bpk-button--secondary')).toBe(true);
  });

  it('should respect the class names entered as a string', () => {
    const { container } = render(
      <BpkButton className="custom-class-1 custom-class-2">
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.classList.contains('bpk-button')).toBe(true);
    expect(el?.classList.contains('bpk-button--primary')).toBe(true);
    expect(el?.classList.contains('custom-class-1')).toBe(true);
    expect(el?.classList.contains('custom-class-2')).toBe(true);
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const { container } = render(
      <BpkButton className="">My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.getAttribute('class')).toBe('bpk-button bpk-button--primary');
  });

  it('should render correctly with "blank" attribute', () => {
    const { container } = render(
      <BpkButton href="#" blank>
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('A');
    expect(el?.getAttribute('href')).toBe('#');
    expect(el?.getAttribute('target')).toBe('_blank');
    expect(el?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render correctly with "rel" attribute', () => {
    const { container } = render(
      <BpkButton href="#" rel="rel-attr">
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('A');
    expect(el?.getAttribute('href')).toBe('#');
    expect(el?.getAttribute('rel')).toBe('rel-attr');
    expect(el?.getAttribute('target')).toBe('');
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const { container } = render(
      <BpkButton href="#" blank rel="rel-overwrite">
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('A');
    expect(el?.getAttribute('target')).toBe('_blank');
    expect(el?.getAttribute('rel')).toBe('rel-overwrite');
  });

  it('should render correctly with "disabled" and "href" attributes', () => {
    const { container } = render(
      <BpkButton href="#" disabled>
        My button
      </BpkButton>,
    );

    // disabled + href renders as <button disabled>, not <a>
    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el?.hasAttribute('disabled')).toBe(true);
  });

  it('should render with a class name if full width is added', () => {
    const { container } = render(
      <BpkButton fullWidth>
        My button
      </BpkButton>,
    );

    expect(container?.firstElementChild?.classList?.contains('bpk-button--full-width')).toEqual(true);
  });


  describe('link type buttons', () => {
    it('should render link type with underline span wrapper', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link}>Link button</BpkButton>,
      );

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).toBeInTheDocument();
      expect(underlinedSpan?.textContent).toBe('Link button');
    });

    it('should render linkOnDark type with underline span wrapper', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.linkOnDark}>Link button</BpkButton>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--link-on-dark')).toBe(true);

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).toBeInTheDocument();
    });

    it('should render link type with implicit class', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link} implicit>
          Implicit link
        </BpkButton>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--link--implicit')).toBe(true);

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined--implicit"]');
      expect(underlinedSpan).toBeInTheDocument();
    });

    it('should render linkOnDark with implicit class', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.linkOnDark} implicit>
          Implicit link on dark
        </BpkButton>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--link--implicit')).toBe(true);

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined--implicit--alternate"]');
      expect(underlinedSpan).toBeInTheDocument();
    });

    it('should NOT render underline span for iconOnly link', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButton>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--link')).toBe(true);
      expect(button?.classList?.contains('bpk-button--icon-only')).toBe(true);

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).not.toBeInTheDocument();
    });

    it('should NOT render underline span for disabled link', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link} disabled>
          Disabled link
        </BpkButton>,
      );

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).not.toBeInTheDocument();
    });

    it('should NOT render underline span for iconOnly linkOnDark', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.linkOnDark} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButton>,
      );

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).not.toBeInTheDocument();
    });

    it('should render link as anchor with href', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link} href="#">
          Link anchor
        </BpkButton>,
      );

      const anchor = container.firstElementChild;
      expect(anchor?.tagName).toBe('A');
      expect(anchor?.getAttribute('href')).toBe('#');

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).toBeInTheDocument();
    });

    it('should render correctly with link type and iconOnly', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButton>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--icon-only')).toBe(true);
    });

    it('should render correctly with linkOnDark type and iconOnly', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.linkOnDark} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButton>,
      );

      const button = container.firstElementChild;
      expect(button?.classList?.contains('bpk-button--icon-only')).toBe(true);
    });
  });
});
