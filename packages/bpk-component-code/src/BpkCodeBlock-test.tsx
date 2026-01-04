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

import BpkCodeBlock from './BpkCodeBlock';

describe('BpkCodeBlock', () => {
  it('should render correctly', () => {
    const { container } = render(
      <BpkCodeBlock>npm install react --save-dev</BpkCodeBlock>,
    );
    const preElement = container.querySelector('pre');
    const codeElement = container.querySelector('code');
    
    expect(preElement).toBeTruthy();
    expect(codeElement).toBeTruthy();
    expect(codeElement?.textContent).toBe('npm install react --save-dev');
    expect(preElement?.className).toContain('bpk-code__pre');
    expect(codeElement?.className).toContain('bpk-code');
    expect(codeElement?.className).toContain('bpk-code--block');
  });

  it('should render correctly with "alternate"', () => {
    const { container } = render(
      <BpkCodeBlock alternate>npm install react --save-dev</BpkCodeBlock>,
    );
    const preElement = container.querySelector('pre');
    
    expect(preElement?.className).toContain('bpk-code__pre');
    expect(preElement?.className).toContain('bpk-code__pre--alternate');
  });

  it('should render correctly with custom "className"', () => {
    const { container } = render(
      <BpkCodeBlock className="my-custom-class">
        npm install react --save-dev
      </BpkCodeBlock>,
    );
    const preElement = container.querySelector('pre');
    
    expect(preElement?.className).toContain('bpk-code__pre');
    expect(preElement?.className).toContain('my-custom-class');
  });
});
