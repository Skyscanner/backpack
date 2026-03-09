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

import BpkPanel, { PANEL_BG_COLORS } from './BpkPanel';

describe('BpkPanel', () => {
  it('should render correctly', () => {
    const { container } = render(
      <BpkPanel>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(container.querySelector('.bpk-panel')).toHaveTextContent(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`)
    expect(container.querySelector('.bpk-panel')).toBeInTheDocument();
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--keyline');
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--padded');
  });

  it('should render with padded attribute', () => {
    const { container } = render(
      <BpkPanel padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--keyline');
    expect(container.querySelector('.bpk-panel')).not.toHaveClass('bpk-panel--padded');
  });

  it('should render with fullWidth attribute', () => {
    const { container } = render(
      <BpkPanel fullWidth>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--padded');
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--full-width');
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--full-width-keyline');
  });

  it('should render BpkPanel without keyline when keyline attribute is false', () => {
    const { container } = render(
      <BpkPanel keyline={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--padded');
    expect(container.querySelector('.bpk-panel')).not.toHaveClass('bpk-panel--keyline');
  });

  it('should render BpkPanel without keyline when keyline attribute is false and fullwidth', () => {
    const { container } = render(
      <BpkPanel keyline={false} fullWidth>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    );
    expect(container.querySelector('.bpk-panel')).not.toHaveClass('bpk-panel--keyline');
    expect(container.querySelector('.bpk-panel')).not.toHaveClass('bpk-panel--full-width-keyline');
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--full-width');
  });

  it('should render with bgColor', () => {
    const { container } = render(
      <BpkPanel bgColor={PANEL_BG_COLORS.surfaceSubtle}>
        Content
      </BpkPanel>,
    );
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--surface-subtle');
  });

  it('should default to surfaceDefault bgColor', () => {
    const { container } = render(
      <BpkPanel>
        Content
      </BpkPanel>,
    );
    expect(container.querySelector('.bpk-panel')).toHaveClass('bpk-panel--surface-default');
  });
});
