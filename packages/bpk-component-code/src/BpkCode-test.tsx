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

import BpkCode from './BpkCode';

describe('BpkCode', () => {
  it('should render correctly', () => {
    const { container } = render(
      <BpkCode>npm install react --save-dev</BpkCode>,
    );
    const codeElement = container.querySelector('code');
    
    expect(codeElement).toBeTruthy();
    expect(codeElement?.textContent).toBe('npm install react --save-dev');
    expect(codeElement?.className).toContain('bpk-code');
  });

  it('should render correctly with "alternate"', () => {
    const { container } = render(
      <BpkCode alternate>npm install react --save-dev</BpkCode>,
    );
    const codeElement = container.querySelector('code');
    
    expect(codeElement?.className).toContain('bpk-code');
    expect(codeElement?.className).toContain('bpk-code--alternate');
  });

  it('should render correctly with custom "className"', () => {
    const { container } = render(
      <BpkCode className="my-class">npm install react --save-dev</BpkCode>,
    );
    const codeElement = container.querySelector('code');
    
    expect(codeElement?.className).toContain('bpk-code');
    expect(codeElement?.className).toContain('my-class');
  });
});
