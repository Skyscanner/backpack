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

// @ts-expect-error TS(2724) FIXME: '"@skyscanner/bpk-foundations-web/tokens/base.es6"... Remove this comment to see the full error message
import { spacingSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkBackgroundImage from './BpkBackgroundImage';
import BpkImage from './BpkImage';

describe('BpkImage accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkImage
        altText="image description"
        aspectRatio={816 / 544}
        src="./path/to/image.jpg"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkBackgroundImage accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkBackgroundImage
        aspectRatio={612 / 408}
        style={{
          width: '100%',
          height: '20rem',
        }}
        src="./path/to/image.jpg"
      >
        <div
          style={{
            opacity: 0.7,
            marginLeft: spacingSm,
            paddingTop: spacingSm,
          }}
        />
      </BpkBackgroundImage>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
