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

import '@testing-library/jest-dom';

import { BpkVessel } from './BpkVessel';

describe('BpkVessel', () => {
  it('renders children content', () => {
    const { getByText } = render(<BpkVessel>Content</BpkVessel>);

    expect(getByText('Content')).toBeInTheDocument();
  });

  it('forwards className', () => {
    const { container } = render(
      <BpkVessel className="custom-class">Content</BpkVessel>,
    );

    const div = container.querySelector('div');
    expect(div).toHaveClass('custom-class');
  });

  it('forwards style', () => {
    const { container } = render(
      <BpkVessel style={{ opacity: 0.5 }}>Content</BpkVessel>,
    );

    const div = container.querySelector('div');
    expect(div).toHaveStyle('opacity: 0.5');
  });

  it('forwards multiple classNames correctly', () => {
    const { container } = render(
      <BpkVessel className="class-one class-two">Content</BpkVessel>,
    );

    const div = container.querySelector('div');
    expect(div).toHaveClass('class-one');
    expect(div).toHaveClass('class-two');
  });

  it('works without className or style props', () => {
    const { getByText } = render(<BpkVessel>Plain Content</BpkVessel>);

    expect(getByText('Plain Content')).toBeInTheDocument();
  });

  it('handles empty className gracefully', () => {
    const { container } = render(<BpkVessel className="">Content</BpkVessel>);

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('merges inline styles correctly', () => {
    const { container } = render(
      <BpkVessel style={{ opacity: 0.8, fontSize: '16px', padding: '8px' }}>
        Styled Content
      </BpkVessel>,
    );

    const div = container.querySelector('div');
    expect(div).toHaveStyle('opacity: 0.8');
    expect(div).toHaveStyle('font-size: 16px');
    expect(div).toHaveStyle('padding: 8px');
  });

  it('renders as a div element by default', () => {
    const { container } = render(<BpkVessel>Content</BpkVessel>);

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div?.tagName).toBe('DIV');
  });

  it('renders as a custom element when "as" prop is provided', () => {
    const { container } = render(
      <BpkVessel as="section" className="custom-section">
        Section Content
      </BpkVessel>,
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
    expect(section).toHaveClass('custom-section');
  });

  it('supports different HTML elements via "as" prop', () => {
    const { container: spanContainer } = render(
      <BpkVessel as="span">Span</BpkVessel>,
    );
    expect(spanContainer.querySelector('span')).toBeInTheDocument();

    const { container: articleContainer } = render(
      <BpkVessel as="article">Article</BpkVessel>,
    );
    expect(articleContainer.querySelector('article')).toBeInTheDocument();

    const { container: navContainer } = render(
      <BpkVessel as="nav">Nav</BpkVessel>,
    );
    expect(navContainer.querySelector('nav')).toBeInTheDocument();

    const { container: mainContainer } = render(
      <BpkVessel as="main">Main</BpkVessel>,
    );
    expect(mainContainer.querySelector('main')).toBeInTheDocument();

    const { container: asideContainer } = render(
      <BpkVessel as="aside">Aside</BpkVessel>,
    );
    expect(asideContainer.querySelector('aside')).toBeInTheDocument();

    const { container: headerContainer } = render(
      <BpkVessel as="header">Header</BpkVessel>,
    );
    expect(headerContainer.querySelector('header')).toBeInTheDocument();

    const { container: footerContainer } = render(
      <BpkVessel as="footer">Footer</BpkVessel>,
    );
    expect(footerContainer.querySelector('footer')).toBeInTheDocument();
  });

  it('supports both className and style together', () => {
    const { container } = render(
      <BpkVessel
        className="custom-class"
        style={{ padding: '10px', margin: '5px' }}
      >
        Combined Content
      </BpkVessel>,
    );

    const div = container.querySelector('div');
    expect(div).toHaveClass('custom-class');
    expect(div).toHaveStyle('padding: 10px');
    expect(div).toHaveStyle('margin: 5px');
  });

  it('works with as, className, and style together', () => {
    const { container } = render(
      <BpkVessel
        as="section"
        className="section-class"
        style={{ opacity: 0.9 }}
      >
        Section with all props
      </BpkVessel>,
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('section-class');
    expect(section).toHaveStyle('opacity: 0.9');
  });
});
