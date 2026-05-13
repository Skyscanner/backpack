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
import userEvent from '@testing-library/user-event';

import BpkCheckboxV2 from './BpkCheckboxV2';

import type { BpkCheckboxV2RootProps } from './BpkCheckboxV2Root';


const SimpleCheckbox = (props: Partial<BpkCheckboxV2RootProps> = {}) => (
  <BpkCheckboxV2.Root {...props}>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Accept terms</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

describe('BpkCheckboxV2', () => {
  describe('Root', () => {
    it('should render correctly with default props', () => {
      const { asFragment } = render(<SimpleCheckbox />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render in checked state', () => {
      const { asFragment } = render(<SimpleCheckbox defaultChecked />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render in disabled state', () => {
      const { asFragment } = render(<SimpleCheckbox disabled />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render in invalid state', () => {
      const { asFragment } = render(<SimpleCheckbox invalid />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render in indeterminate state', () => {
      const { asFragment } = render(<SimpleCheckbox defaultChecked="indeterminate" />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should call onCheckedChange when toggled', async () => {
      const onCheckedChange = jest.fn();
      render(<SimpleCheckbox onCheckedChange={onCheckedChange} />);

      const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
      await userEvent.click(checkbox);

      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('should not call onCheckedChange when disabled', async () => {
      const onCheckedChange = jest.fn();
      render(<SimpleCheckbox disabled onCheckedChange={onCheckedChange} />);

      const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
      await userEvent.click(checkbox);

      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe('Label', () => {
    it('should render label text', () => {
      render(<SimpleCheckbox />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('should render inline link inside label', () => {
      render(
        <BpkCheckboxV2.Root>
          <BpkCheckboxV2.Control>
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <BpkCheckboxV2.Label>
            I agree to the <a href="/terms">terms</a>
          </BpkCheckboxV2.Label>
          <BpkCheckboxV2.HiddenInput />
        </BpkCheckboxV2.Root>,
      );
      expect(screen.getByRole('link', { name: 'terms' })).toBeInTheDocument();
    });
  });

  describe('Description', () => {
    it('should render description text', () => {
      render(
        <BpkCheckboxV2.Root>
          <BpkCheckboxV2.Control>
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <div>
            <BpkCheckboxV2.Label>Price alerts</BpkCheckboxV2.Label>
            <BpkCheckboxV2.Description>
              We&apos;ll email you about price drops.
            </BpkCheckboxV2.Description>
          </div>
          <BpkCheckboxV2.HiddenInput />
        </BpkCheckboxV2.Root>,
      );
      expect(
        screen.getByText("We'll email you about price drops."),
      ).toBeInTheDocument();
    });

    it('should render snapshot with title and description', () => {
      const { asFragment } = render(
        <BpkCheckboxV2.Root>
          <BpkCheckboxV2.Control>
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <div>
            <BpkCheckboxV2.Label>Price alerts</BpkCheckboxV2.Label>
            <BpkCheckboxV2.Description>
              We&apos;ll email you about price drops.
            </BpkCheckboxV2.Description>
          </div>
          <BpkCheckboxV2.HiddenInput />
        </BpkCheckboxV2.Root>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('data attributes', () => {
    it('should have data-backpack-ds-component attribute', () => {
      const { container } = render(<SimpleCheckbox />);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveAttribute('data-backpack-ds-component');
    });
  });

  describe('safe prop forwarding', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('forwards data-* and aria-* attributes on each part', () => {
      render(
        <BpkCheckboxV2.Root data-testid="root" aria-label="root-label">
          <BpkCheckboxV2.Control data-testid="control">
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <BpkCheckboxV2.Label data-testid="label">Label text</BpkCheckboxV2.Label>
          <BpkCheckboxV2.Description data-testid="description">
            Description text
          </BpkCheckboxV2.Description>
          <BpkCheckboxV2.HiddenInput
            data-testid="hidden-input"
            aria-label="hidden-input-label"
          />
        </BpkCheckboxV2.Root>,
      );

      expect(screen.getByTestId('root')).toHaveAttribute(
        'aria-label',
        'root-label',
      );
      expect(screen.getByTestId('control')).toBeInTheDocument();
      expect(screen.getByTestId('label')).toBeInTheDocument();
      expect(screen.getByTestId('description')).toBeInTheDocument();
      expect(screen.getByTestId('hidden-input')).toHaveAttribute(
        'aria-label',
        'hidden-input-label',
      );
    });

    it('strips className from each part and warns in development', () => {
      render(
        <BpkCheckboxV2.Root
          data-testid="root"
          // @ts-expect-error className is intentionally not in the public type
          className="consumer-root"
        >
          <BpkCheckboxV2.Control
            data-testid="control"
            // @ts-expect-error className is intentionally not in the public type
            className="consumer-control"
          >
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <BpkCheckboxV2.Label
            data-testid="label"
            // @ts-expect-error className is intentionally not in the public type
            className="consumer-label"
          >
            Label text
          </BpkCheckboxV2.Label>
          <BpkCheckboxV2.Description
            data-testid="description"
            // @ts-expect-error className is intentionally not in the public type
            className="consumer-description"
          >
            Description text
          </BpkCheckboxV2.Description>
          <BpkCheckboxV2.HiddenInput
            data-testid="hidden-input"
            // @ts-expect-error className is intentionally not in the public type
            className="consumer-hidden-input"
          />
        </BpkCheckboxV2.Root>,
      );

      expect(screen.getByTestId('root').className).not.toMatch('consumer-root');
      expect(screen.getByTestId('control').className).not.toMatch(
        'consumer-control',
      );
      expect(screen.getByTestId('label').className).not.toMatch(
        'consumer-label',
      );
      expect(screen.getByTestId('description').className).not.toMatch(
        'consumer-description',
      );
      expect(screen.getByTestId('hidden-input').className).not.toMatch(
        'consumer-hidden-input',
      );
      expect(warnSpy).toHaveBeenCalledTimes(5);
    });

    it('strips style from each part and warns in development', () => {
      render(
        <BpkCheckboxV2.Root
          data-testid="root"
          // @ts-expect-error style is intentionally not in the public type
          style={{ display: 'block' }}
        >
          <BpkCheckboxV2.Control data-testid="control">
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <BpkCheckboxV2.Label data-testid="label">Label</BpkCheckboxV2.Label>
          <BpkCheckboxV2.HiddenInput data-testid="hidden-input" />
        </BpkCheckboxV2.Root>,
      );

      expect(screen.getByTestId('root')).not.toHaveAttribute('style');
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('BpkCheckboxV2.Root'),
      );
    });
  });
});
