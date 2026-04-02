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

import { render, screen } from '@testing-library/react';

import { BpkSpacing } from '../../bpk-component-layout/src/tokens';
import { TEXT_COLORS } from '../../bpk-component-text/src/BpkText';
import { SURFACE_COLORS } from '../../bpk-react-utils';

import BpkAiBase from './BpkAiBase';

// Mock layout components that depend on @chakra-ui/react (not available in Jest)
jest.mock('../../bpk-component-layout/src/BpkStack', () => ({
  BpkVStack: ({ children, ...props }: any) => <div data-testid="mock-vstack" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-layout/src/BpkBox', () => ({
  BpkBox: ({ children, ...props }: any) => <div data-testid="mock-box" {...props}>{children}</div>,
}));

describe('BpkAiBase.Root', () => {
  it('should render with default surface-default background class', () => {
    const { container } = render(
      <BpkAiBase.Root>Content</BpkAiBase.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('bpk-ai-base');
    expect(root).toHaveClass('bpk-ai-base--surface-default');
  });

  it('should render with a custom backgroundColor', () => {
    const { container } = render(
      <BpkAiBase.Root backgroundColor={SURFACE_COLORS.surfaceElevated}>
        Content
      </BpkAiBase.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('bpk-ai-base--surface-elevated');
  });

  it('should render with a color class when color prop is provided', () => {
    const { container } = render(
      <BpkAiBase.Root color={TEXT_COLORS.textPrimary}>
        Content
      </BpkAiBase.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('bpk-ai-base--text-primary');
  });

  it('should not add color class when color prop is not provided', () => {
    const { container } = render(
      <BpkAiBase.Root>Content</BpkAiBase.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).not.toContain('bpk-ai-base--text');
  });

  it('should set data-component attribute', () => {
    const { container } = render(
      <BpkAiBase.Root>Content</BpkAiBase.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('data-backpack-ds-component')).toBe('AiBase');
  });

  it('should pass gap to BpkVStack', () => {
    const { container } = render(
      <BpkAiBase.Root gap={BpkSpacing.MD}>Content</BpkAiBase.Root>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should pass padding to BpkVStack', () => {
    const { container } = render(
      <BpkAiBase.Root padding={BpkSpacing.Base}>Content</BpkAiBase.Root>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <BpkAiBase.Root>
        <span>Test child content</span>
      </BpkAiBase.Root>,
    );
    expect(screen.getByText('Test child content')).toBeInTheDocument();
  });
});

describe('BpkAiBase.Header', () => {
  it('should render children', () => {
    render(<BpkAiBase.Header>Header content</BpkAiBase.Header>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('should set data-component attribute', () => {
    const { container } = render(
      <BpkAiBase.Header>Header</BpkAiBase.Header>,
    );
    // BpkBox wraps with a data-bpk-component attribute via getDataComponentAttribute
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('BpkAiBase.Content', () => {
  it('should render children', () => {
    render(<BpkAiBase.Content>Content body</BpkAiBase.Content>);
    expect(screen.getByText('Content body')).toBeInTheDocument();
  });
});

describe('BpkAiBase.Footer', () => {
  it('should render children', () => {
    render(<BpkAiBase.Footer>Footer content</BpkAiBase.Footer>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });
});

describe('BpkAiBase composition', () => {
  it('should render all slots in a full composition', () => {
    render(
      <BpkAiBase.Root>
        <BpkAiBase.Header>My Header</BpkAiBase.Header>
        <BpkAiBase.Content>My Content</BpkAiBase.Content>
        <BpkAiBase.Footer>My Footer</BpkAiBase.Footer>
      </BpkAiBase.Root>,
    );
    expect(screen.getByText('My Header')).toBeInTheDocument();
    expect(screen.getByText('My Content')).toBeInTheDocument();
    expect(screen.getByText('My Footer')).toBeInTheDocument();
  });

  it('should render with surfaceContrast background and text-on-dark color', () => {
    const { container } = render(
      <BpkAiBase.Root
        backgroundColor={SURFACE_COLORS.surfaceContrast}
        color={TEXT_COLORS.textOnDark}
      >
        <BpkAiBase.Header>Header</BpkAiBase.Header>
        <BpkAiBase.Content>Content</BpkAiBase.Content>
        <BpkAiBase.Footer>Footer</BpkAiBase.Footer>
      </BpkAiBase.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('bpk-ai-base--surface-contrast');
    expect(root).toHaveClass('bpk-ai-base--text-on-dark');
  });
});
