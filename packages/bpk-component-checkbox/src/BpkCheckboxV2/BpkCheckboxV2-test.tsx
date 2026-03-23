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
});
