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

import BpkHorizontalNav from './BpkHorizontalNav';

describe('BpkHorizontalNav', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: string; }' is missing the follow... Remove this comment to see the full error message
      <BpkHorizontalNav>My nav content.</BpkHorizontalNav>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "type" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: Element[]; type: string; }' is m... Remove this comment to see the full error message
      <BpkHorizontalNav type="light">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </BpkHorizontalNav>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom "className" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: string; className: string; }' is... Remove this comment to see the full error message
      <BpkHorizontalNav className="my-custom-class-name">
        My nav content.
      </BpkHorizontalNav>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom "leadingScrollIndicatorClassName" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: string; leadingScrollIndicatorCl... Remove this comment to see the full error message
      <BpkHorizontalNav leadingScrollIndicatorClassName="my-custom-class-name">
        My nav content.
      </BpkHorizontalNav>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom "trailingScrollIndicatorClassName" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: string; trailingScrollIndicatorC... Remove this comment to see the full error message
      <BpkHorizontalNav trailingScrollIndicatorClassName="my-custom-class-name">
        My nav content.
      </BpkHorizontalNav>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "showUnderline" set to false', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: string; showUnderline: false; }'... Remove this comment to see the full error message
      <BpkHorizontalNav showUnderline={false}>
        My nav content.
      </BpkHorizontalNav>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: string; "data-arbitrary-1": stri... Remove this comment to see the full error message
      <BpkHorizontalNav
        data-arbitrary-1="arbirary-value-1"
        data-arbitrary-2="arbirary-value-2"
        ariaLabel="nav content"
      >
        My nav content.
      </BpkHorizontalNav>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "ariaLabel" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: string; ariaLabel: string; }' is... Remove this comment to see the full error message
      <BpkHorizontalNav ariaLabel="nav content">
        My nav content.
      </BpkHorizontalNav>
    )
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "ariaLabel" prop set to null', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'string'.
      <BpkHorizontalNav ariaLabel={null}>
        My nav content.
      </BpkHorizontalNav>
    )
    expect(asFragment()).toMatchSnapshot();
  });
});
