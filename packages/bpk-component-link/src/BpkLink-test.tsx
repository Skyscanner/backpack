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

/* @flow strict */

import { createRef } from 'react';

import { render } from '@testing-library/react';

import BpkLink, { themeAttributes } from './BpkLink';

describe('BpkLink', () => {
  it('should render correctly with a "href" attribute', () => {
    // @ts-expect-error TS(2740) FIXME: Type '{ children: string; href: string; }' is miss... Remove this comment to see the full error message
    const { asFragment } = render(<BpkLink href="#">Link</BpkLink>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with a ref forwarded', () => {
    const myRef = createRef();

    render(
      // @ts-expect-error TS(2740) FIXME: Type '{ children: string; ref: RefObject<unknown>;... Remove this comment to see the full error message
      <BpkLink ref={myRef} href="#">
        Link
      </BpkLink>,
    );

    expect(myRef.current).not.toBeNull();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; className:... Remove this comment to see the full error message
      <BpkLink href="#" className="test-class">
        Link
      </BpkLink>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "blank" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; blank: tru... Remove this comment to see the full error message
      <BpkLink href="#" blank>
        Link (new window)
      </BpkLink>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "rel" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; blank: tru... Remove this comment to see the full error message
      <BpkLink href="#" blank rel="rel-attr">
        Link (new window)
      </BpkLink>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; blank: tru... Remove this comment to see the full error message
      <BpkLink href="#" blank rel="rel-overwrite">
        Link (new window)
      </BpkLink>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "alternate" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2739) FIXME: Type '{ children: string; href: string; alternate:... Remove this comment to see the full error message
      <BpkLink href="#" alternate>
        Link
      </BpkLink>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2322) FIXME: Type '{ children: string; href: string; id: string... Remove this comment to see the full error message
      <BpkLink href="#" id="test-id">
        Link
      </BpkLink>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('themeAttributes', () => {
    it('exports the expected themeAttributes', () => {
      expect(themeAttributes).toEqual([
        'linkColor',
        'linkHoverColor',
        'linkActiveColor',
        'linkVisitedColor',
      ]);
    });
  });
});
