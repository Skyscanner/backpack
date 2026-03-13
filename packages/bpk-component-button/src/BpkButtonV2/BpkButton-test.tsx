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

import { fireEvent, render } from '@testing-library/react';

import { BpkButtonV2 as BpkButton } from './BpkButton';
import { SIZE_TYPES, BUTTON_TYPES } from './common-types';

describe('BpkButton', () => {
  Object.values(BUTTON_TYPES).forEach((buttonType) => {
    it(`should render correctly with type="${buttonType}"`, () => {
      const { container } = render(
        <BpkButton type={buttonType}>
          {buttonType} button
        </BpkButton>,
      );

      const el = container.firstElementChild;
      expect(el?.tagName).toBe('BUTTON');
      expect(el).toHaveAttribute('type', 'button');
      expect(el).toHaveAttribute('data-backpack-ds-component', 'Button');
      expect(el).toHaveClass('bpk-button');
      expect(el).toHaveClass(`bpk-button--${buttonType}`);
    });
  });

  it('should render correctly with a "href" attribute', () => {
    const { container } = render(
      <BpkButton href="#">My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '#');
    expect(el).toHaveAttribute('target', '');
    expect(el).toHaveAttribute('data-backpack-ds-component', 'Button');
    expect(el).toHaveClass('bpk-button');
    expect(el).toHaveClass('bpk-button--primary');
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { container } = render(
      <BpkButton disabled>My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute('type', 'button');
    expect(el).toHaveClass('bpk-button');
    expect(el).toHaveClass('bpk-button--primary');
  });

  it('should render correctly with large size', () => {
    const { container } = render(
      <BpkButton size={SIZE_TYPES.large}>My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el).toHaveClass('bpk-button');
    expect(el).toHaveClass('bpk-button--large');
    expect(el).toHaveClass('bpk-button--primary');
  });

  it('should render correctly with an "iconOnly" attribute', () => {
    const { container } = render(
      <BpkButton iconOnly>My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el).toHaveClass('bpk-button');
    expect(el).toHaveClass('bpk-button--icon-only');
    expect(el).toHaveClass('bpk-button--primary');
  });

  it('should render correctly a "large", "secondary" button', () => {
    const { container } = render(
      <BpkButton size={SIZE_TYPES.large} type={BUTTON_TYPES.secondary}>
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('BUTTON');
    expect(el).toHaveClass('bpk-button');
    expect(el).toHaveClass('bpk-button--large');
    expect(el).toHaveClass('bpk-button--secondary');
  });

  it('should respect the class names entered as a string', () => {
    const { container } = render(
      <BpkButton className="custom-class-1 custom-class-2">
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el).toHaveClass('bpk-button');
    expect(el).toHaveClass('bpk-button--primary');
    expect(el).toHaveClass('custom-class-1');
    expect(el).toHaveClass('custom-class-2');
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const { container } = render(
      <BpkButton className="">My button</BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el).toHaveAttribute('class', 'bpk-button bpk-button--primary');
  });

  it('should render correctly with "blank" attribute', () => {
    const { container } = render(
      <BpkButton href="#" blank>
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '#');
    expect(el).toHaveAttribute('target', '_blank');
    expect(el).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render correctly with "rel" attribute', () => {
    const { container } = render(
      <BpkButton href="#" rel="rel-attr">
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '#');
    expect(el).toHaveAttribute('rel', 'rel-attr');
    expect(el).toHaveAttribute('target', '');
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const { container } = render(
      <BpkButton href="#" blank rel="rel-overwrite">
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el?.tagName).toBe('A');
    expect(el).toHaveAttribute('target', '_blank');
    expect(el).toHaveAttribute('rel', 'rel-overwrite');
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
    expect(el).toBeDisabled();
  });

  it('should render with a class name if full width is added', () => {
    const { container } = render(
      <BpkButton fullWidth>
        My button
      </BpkButton>,
    );

    const el = container.firstElementChild;
    expect(el).toHaveClass('bpk-button--full-width');
  });


  describe('loading prop', () => {
    it('should render without spinner or aria-busy when loading=false', () => {
      const { container } = render(
        <BpkButton loading={false}>My button</BpkButton>,
      );

      expect(container.querySelector('[data-backpack-ds-component="Spinner"]')).not.toBeInTheDocument();
      expect(container.firstElementChild).not.toHaveAttribute('aria-busy');
    });

    it('should render spinner, disable interaction, and hide children when loading=true', () => {
      const { container } = render(
        <BpkButton loading>My button</BpkButton>,
      );

      const el = container.firstElementChild;
      expect(container.querySelector('[data-backpack-ds-component="Spinner"]')).toBeInTheDocument();
      expect(el).toBeDisabled();
      expect(el).toHaveAttribute('aria-busy', 'true');

      const hiddenDiv = container.querySelector('[class*="bpk-button__content--hidden"]');
      expect(hiddenDiv).toBeInTheDocument();
      expect(hiddenDiv).toHaveTextContent('My button');

      // href is suppressed: renders as <button>, not <a>
      const { container: hrefContainer } = render(
        <BpkButton loading href="#">My button</BpkButton>,
      );
      expect(hrefContainer.firstElementChild?.tagName).toBe('BUTTON');
      expect(hrefContainer.firstElementChild).toBeDisabled();
    });

    it('should render a LargeSpinner when loading=true with size=large', () => {
      const { container } = render(
        <BpkButton loading size={SIZE_TYPES.large}>My button</BpkButton>,
      );

      expect(container.querySelector('[data-backpack-ds-component="LargeSpinner"]')).toBeInTheDocument();
    });

    it('should not call onClick when loading=true', () => {
      const mockOnClick = jest.fn();
      const { container } = render(
        <BpkButton loading onClick={mockOnClick}>My button</BpkButton>,
      );

      fireEvent.click(container.firstElementChild!);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('should render spinner correctly when loading=true and iconOnly=true', () => {
      const { container } = render(
        <BpkButton loading iconOnly aria-label="Loading">
          <span>Icon</span>
        </BpkButton>,
      );

      const el = container.firstElementChild;
      expect(container.querySelector('[data-backpack-ds-component="Spinner"]')).toBeInTheDocument();
      expect(el).toBeDisabled();
      expect(el).toHaveAttribute('aria-busy', 'true');
    });

    it('should render correctly when loading=true and fullWidth=true', () => {
      const { container } = render(
        <BpkButton loading fullWidth>My button</BpkButton>,
      );

      const el = container.firstElementChild;
      expect(container.querySelector('[data-backpack-ds-component="Spinner"]')).toBeInTheDocument();
      expect(el).toBeDisabled();
      expect(el).toHaveClass('bpk-button--full-width');
    });

    it('should render as disabled when both loading=true and disabled=true', () => {
      const { container } = render(
        <BpkButton loading disabled>My button</BpkButton>,
      );

      const el = container.firstElementChild;
      expect(el).toBeDisabled();
      expect(container.querySelector('[data-backpack-ds-component="Spinner"]')).toBeInTheDocument();
    });

    it('should use dark spinner for secondary type when loading=true', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.secondary} loading>My button</BpkButton>,
      );

      expect(container.querySelector('[class*="bpk-spinner--dark"]')).toBeInTheDocument();
    });

    it('should use dark spinner for destructive type when loading=true', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.destructive} loading>My button</BpkButton>,
      );

      expect(container.querySelector('[class*="bpk-spinner--dark"]')).toBeInTheDocument();
    });

    it('should use dark spinner for link type when loading=true', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link} loading>My button</BpkButton>,
      );

      expect(container.querySelector('[class*="bpk-spinner--dark"]')).toBeInTheDocument();
    });

    it('should use light spinner for featured type when loading=true', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.featured} loading>My button</BpkButton>,
      );

      expect(container.querySelector('[class*="bpk-spinner--light"]')).toBeInTheDocument();
    });

    it('should not render underline wrapper for link type when loading=true', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link} loading>My button</BpkButton>,
      );

      expect(container.querySelector('[class*="bpk-button--link-underlined"]')).not.toBeInTheDocument();
    });

    it('should not render underline wrapper and should use light spinner for linkOnDark type when loading=true', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.linkOnDark} loading>My button</BpkButton>,
      );

      expect(container.querySelector('[class*="bpk-button--link-underlined"]')).not.toBeInTheDocument();
      expect(container.querySelector('[class*="bpk-spinner--light"]')).toBeInTheDocument();
    });
  });

  describe('link type buttons', () => {
    it('should render link type with underline span wrapper', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.link}>Link button</BpkButton>,
      );

      const underlinedSpan = container.querySelector('[class*="bpk-button--link-underlined"]');
      expect(underlinedSpan).toBeInTheDocument();
      expect(underlinedSpan).toHaveTextContent('Link button');
    });

    it('should render linkOnDark type with underline span wrapper', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.linkOnDark}>Link button</BpkButton>,
      );

      const button = container.firstElementChild;
      expect(button).toHaveClass('bpk-button--link-on-dark');

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
      expect(button).toHaveClass('bpk-button--link--implicit');

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
      expect(button).toHaveClass('bpk-button--link--implicit');

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
      expect(button).toHaveClass('bpk-button--link');
      expect(button).toHaveClass('bpk-button--icon-only');

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
      expect(anchor).toHaveAttribute('href', '#');

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
      expect(button).toHaveClass('bpk-button--icon-only');
    });

    it('should render correctly with linkOnDark type and iconOnly', () => {
      const { container } = render(
        <BpkButton type={BUTTON_TYPES.linkOnDark} iconOnly aria-label="Icon link">
          <span>Icon</span>
        </BpkButton>,
      );

      const button = container.firstElementChild;
      expect(button).toHaveClass('bpk-button--icon-only');
    });
  });
});
