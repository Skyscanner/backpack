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

import '@testing-library/jest-dom';

import { BpkStack, BpkHStack, BpkVStack } from './BpkStack';
import { BpkSpacing } from './tokens';

describe('BpkStack', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BpkStack gap={BpkSpacing.MD}>
        <div>Child 1</div>
        <div>Child 2</div>
      </BpkStack>,
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });

  describe('BpkHStack', () => {
    it('renders children', () => {
      const { getByText } = render(
        <BpkHStack gap={BpkSpacing.MD}>
          <div>Child 1</div>
          <div>Child 2</div>
        </BpkHStack>,
      );

      expect(getByText('Child 1')).toBeInTheDocument();
      expect(getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('BpkVStack', () => {
    it('renders children', () => {
      const { getByText } = render(
        <BpkVStack gap={BpkSpacing.MD}>
          <div>Child 1</div>
          <div>Child 2</div>
        </BpkVStack>,
      );

      expect(getByText('Child 1')).toBeInTheDocument();
      expect(getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('BpkStack Props', () => {
    it('accepts valid gap tokens', () => {
      const { container } = render(
        <BpkStack gap={BpkSpacing.LG}>
          <div>Child 1</div>
        </BpkStack>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('supports align and justify props', () => {
      const { container } = render(
        <BpkStack align="center" justify="space-between" gap={BpkSpacing.MD}>
          <div>Child 1</div>
        </BpkStack>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('filters out invalid props (e.g. className)', () => {
      const { container } = render(
        // @ts-expect-error className is intentionally not part of the public API
        <BpkStack className="forbidden-class" gap={BpkSpacing.MD}>
          <div>Child</div>
        </BpkStack>,
      );

      const stack = container.firstChild;
      expect(stack).not.toHaveClass('forbidden-class');
    });
  });
});
