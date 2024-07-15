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
import { axe } from 'jest-axe';

import { BUTTON_TYPES } from '../../bpk-component-button';
import { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';

import BpkSnippet from './BpkSnippet';

describe('BpkJourneyArrow accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkSnippet
        src="https://content.skyscnr.com/m/f427e62297cce49/original/edinburgh-view-from-calton-hill.jpg"
        altText="image description"
        headline="Title of the section"
        subheading="Subheading"
        bodyText="Lorem ipsum dolor sit amet consectetur. Tristique at pharetra tincidunt elementum vulputate varius sit euismod hac. Dignissim hendrerit enim eros nisi diam. Elit arcu mattis cum in id varius vitae augue neque. Quisque in semper malesuada lacus ut etiam elementum."
        bodyStyle={TEXT_STYLES.bodyDefault}
        buttonStyle={BUTTON_TYPES.primary}
        headlineStyle={TEXT_STYLES.hero5}
        desktopLayout="imageLeft"
        imageOrientation="landscape"
        buttonText="Call to Action"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues with empty content', async () => {
    const { container } = render(<BpkSnippet src="" altText="" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
