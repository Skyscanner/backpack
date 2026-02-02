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

import BpkBreadcrumb from './BpkBreadcrumb';

describe('BpkBreadcrumb', () => {
  it('should render correctly', () => {
    render(
      <BpkBreadcrumb label="My breadcrumbs">
        <div>Anything can go in here</div>
      </BpkBreadcrumb>,
    );

    expect(
      screen.getByRole('navigation', { name: 'My breadcrumbs' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Anything can go in here')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render correctly with a custom class name', () => {
    const { container } = render(
      <BpkBreadcrumb label="My breadcrumbs" className="my-custom-class">
        <div>Anything can go in here</div>
      </BpkBreadcrumb>,
    );

    expect(
      screen.getByRole('navigation', { name: 'My breadcrumbs' }),
    ).toBeInTheDocument();
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
    expect(screen.getByText('Anything can go in here')).toBeInTheDocument();
  });

  it('should render correctly with arbitrary props', () => {
    render(
      <BpkBreadcrumb
        label="My breadcrumbs"
        testid="arbitrary value" // <-- arbitrary prop
      >
        <div>Anything can go in here</div>
      </BpkBreadcrumb>,
    );

    expect(
      screen.getByRole('navigation', { name: 'My breadcrumbs' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'testid',
      'arbitrary value',
    );
    expect(screen.getByText('Anything can go in here')).toBeInTheDocument();
  });

  it('should render correctly with schema meta data', () => {
    const schemaMetaData = [
      {
        url: 'http://www.skyscanner.net',
        label: 'home',
      },
      {
        url: 'http://www.skyscanner.net/hotels',
        label: 'hotels',
      },
    ];
    const { container } = render(
      <BpkBreadcrumb label="My breadcrumbs" schemaMetaData={schemaMetaData}>
        <div>Anything can go in here</div>
      </BpkBreadcrumb>,
    );

    expect(
      screen.getByRole('navigation', { name: 'My breadcrumbs' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Anything can go in here')).toBeInTheDocument();
    // Check that the schema script tag is present
    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).toBeInTheDocument();
  });
});
