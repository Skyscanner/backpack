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

import BpkPhoneInput from './BpkPhoneInput';

const dialingCodeProps = {
  id: 'dialing-code',
  name: 'Dialing code',
  label: 'Dialing code',
  className: 'dialing-code',
  wrapperClassName: 'dialing-wrapper',
};

const dialingCodes = [
  { code: '44', description: '+44', numberPrefix: '+44' },
  { code: '55', description: '+55', numberPrefix: '+55' },
];

const defaultProps = {
  id: 'phone-input-id',
  name: 'Telephone input',
  label: 'Telephone number',
  value: '1234',
  dialingCode: '44',
  className: 'fancy-input',
  onChange: () => {},
  onDialingCodeChange: () => {},
  dialingCodes,
  dialingCodeProps,
};

describe('BpkPhoneInput accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    // @ts-expect-error TS(2741): Property 'mixed' is missing in type '{ id: string;... Remove this comment to see the full error message
    const { container } = render(<BpkPhoneInput {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
