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

import BpkButtonDestructive from './BpkButtonDestructive';
import BpkButtonFeatured from './BpkButtonFeatured';
import BpkButtonLink from './BpkButtonLink';
import BpkButtonLinkOnDark from './BpkButtonLinkOnDark';
import BpkButtonPrimary from './BpkButtonPrimary';
import BpkButtonPrimaryOnDark from './BpkButtonPrimaryOnDark';
import BpkButtonPrimaryOnLight from './BpkButtonPrimaryOnLight';
import BpkButtonSecondary from './BpkButtonSecondary';
import BpkButtonSecondaryOnDark from './BpkButtonSecondaryOnDark';

describe.each([
  { name: 'BpkButtonDestructive', ButtonToTest: BpkButtonDestructive },
  { name: 'BpkButtonFeatured', ButtonToTest: BpkButtonFeatured },
  { name: 'BpkButtonLink', ButtonToTest: BpkButtonLink },
  { name: 'BpkButtonLinkOnDark', ButtonToTest: BpkButtonLinkOnDark },
  { name: 'BpkButtonPrimary', ButtonToTest: BpkButtonPrimary },
  { name: 'BpkButtonPrimaryOnDark', ButtonToTest: BpkButtonPrimaryOnDark },
  { name: 'BpkButtonPrimaryOnLight', ButtonToTest: BpkButtonPrimaryOnLight },
  { name: 'BpkButtonSecondary', ButtonToTest: BpkButtonSecondary },
  { name: 'BpkButtonSecondaryOnDark', ButtonToTest: BpkButtonSecondaryOnDark },
])('$name', ({ ButtonToTest }) => {
  it('should render correctly', () => {
    // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
    const { asFragment } = render(<ButtonToTest>My button</ButtonToTest>);
    // @ts-expect-error TS(2554): Expected 1-2 arguments, but got 3.
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "href" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest href="#">My button</ButtonToTest>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest disabled>My button</ButtonToTest>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
    const { asFragment } = render(<ButtonToTest large>My button</ButtonToTest>);
    // @ts-expect-error TS(2554): Expected 1-2 arguments, but got 3.
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "iconOnly" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest iconOnly>My button</ButtonToTest>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest large className="custom-class-1 custom-class-2">
        // @ts-expect-error TS(2304): Cannot find name 'My'.
        My button
      </ButtonToTest>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest large className="">
        // @ts-expect-error TS(2304): Cannot find name 'My'.
        My button
      </ButtonToTest>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest href="#" blank>
        // @ts-expect-error TS(2304): Cannot find name 'My'.
        My button
      </ButtonToTest>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "rel" attribute', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest href="#" rel="rel-attr">
        // @ts-expect-error TS(2304): Cannot find name 'My'.
        My button
      </ButtonToTest>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest href="#" blank rel="rel-overwrite">
        // @ts-expect-error TS(2304): Cannot find name 'My'.
        My button
      </ButtonToTest>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "disabled" and "href" attributes', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2749): 'ButtonToTest' refers to a value, but is being use... Remove this comment to see the full error message
      <ButtonToTest href="#" disabled>
        // @ts-expect-error TS(2304): Cannot find name 'My'.
        My button
      </ButtonToTest>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
