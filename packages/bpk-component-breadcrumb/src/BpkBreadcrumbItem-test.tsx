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
// @ts-nocheck

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkBreadcrumbItem from './BpkBreadcrumbItem';

describe('BpkBreadcrumbItem', () => {
  it('should render correctly', () => {
    render(
      <BpkBreadcrumbItem href="https://skyscanner.design/">
        Backpack
      </BpkBreadcrumbItem>,
    );

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Backpack' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://skyscanner.design/');
    expect(screen.getByText('Backpack')).toBeInTheDocument();
  });

  it('should render correctly with a "active" prop', () => {
    render(
      <BpkBreadcrumbItem active>Backpack</BpkBreadcrumbItem>,
    );

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByText('Backpack')).toBeInTheDocument();
    expect(screen.getByText('Backpack')).toHaveAttribute('aria-current', 'page');
    // Should not render a link when active
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should render correctly with a custom class name', () => {
    const { container } = render(
      <BpkBreadcrumbItem
        href="https://skyscanner.design/"
        className="my-custom-class"
      >
        Backpack
      </BpkBreadcrumbItem>,
    );
    
    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Backpack' })).toBeInTheDocument();
  });

  it('should render correctly with arbitrary props', () => {
    render(
      <BpkBreadcrumbItem
        href="https://skyscanner.design/"
        testid="arbitrary value" // <-- arbitrary prop
      >
        Backpack
      </BpkBreadcrumbItem>,
    );

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveAttribute('testid', 'arbitrary value');
    expect(screen.getByRole('link', { name: 'Backpack' })).toBeInTheDocument();
  });

  it('should render correctly with with "linkProps" attribute', () => {
    render(
      <BpkBreadcrumbItem
        href="https://skyscanner.design/"
        linkProps={{ testid: 'arbitrary value' }} // <-- arbitrary prop
      >
        Backpack
      </BpkBreadcrumbItem>,
    );

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Backpack' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('testid', 'arbitrary value');
  });
});