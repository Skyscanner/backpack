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

import BpkInputV2 from './index';

describe('BpkInputGroup (Docked Inputs)', () => {
  describe('User Story 3: Docked Input Group with Auto Border Detection', () => {
    it('should apply no docking styles to a single input', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="single"
            name="single"
            value="single input"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainer = container.querySelector('.bpk-input-v2__input-container');

      expect(inputContainer).not.toHaveClass('bpk-input-v2__input-container--docked-first');
      expect(inputContainer).not.toHaveClass('bpk-input-v2__input-container--docked-middle');
      expect(inputContainer).not.toHaveClass('bpk-input-v2__input-container--docked-last');
    });

    it('should apply docked-first and docked-last classes for 2 inputs', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="first"
            name="first"
            value="First"
            onChange={() => {}}
          />
          <BpkInputV2.Input
            id="second"
            name="second"
            value="Second"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainers = container.querySelectorAll('.bpk-input-v2__input-container');

      expect(inputContainers).toHaveLength(2);
      expect(inputContainers[0]).toHaveClass('bpk-input-v2__input-container--docked-first');
      expect(inputContainers[1]).toHaveClass('bpk-input-v2__input-container--docked-last');
    });

    it('should apply docked-first, docked-middle, and docked-last classes for 3+ inputs', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="first"
            name="first"
            value="First"
            onChange={() => {}}
          />
          <BpkInputV2.Input
            id="middle"
            name="middle"
            value="Middle"
            onChange={() => {}}
          />
          <BpkInputV2.Input
            id="last"
            name="last"
            value="Last"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainers = container.querySelectorAll('.bpk-input-v2__input-container');

      expect(inputContainers).toHaveLength(3);
      expect(inputContainers[0]).toHaveClass('bpk-input-v2__input-container--docked-first');
      expect(inputContainers[1]).toHaveClass('bpk-input-v2__input-container--docked-middle');
      expect(inputContainers[2]).toHaveClass('bpk-input-v2__input-container--docked-last');
    });

    it('should handle docked group with InputAdornments', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>🛫</BpkInputV2.InputAdornment>
          <BpkInputV2.Input
            id="from"
            name="from"
            value="Edinburgh"
            onChange={() => {}}
          />
          <BpkInputV2.InputAdornment>🛬</BpkInputV2.InputAdornment>
          <BpkInputV2.Input
            id="to"
            name="to"
            value="London"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainers = container.querySelectorAll('.bpk-input-v2__input-container');
      const planeUpAdornment = screen.getByText('🛫');
      const planeDownAdornment = screen.getByText('🛬');

      // 2 inputs should be docked
      expect(inputContainers).toHaveLength(2);
      expect(inputContainers[0]).toHaveClass('bpk-input-v2__input-container--docked-first');
      expect(inputContainers[1]).toHaveClass('bpk-input-v2__input-container--docked-last');

      // First container should contain both adornments (start and end of first input)
      // because 🛬 comes AFTER the first input, it becomes its end adornment
      expect(inputContainers[0]).toContainElement(planeUpAdornment);
      expect(inputContainers[0]).toContainElement(planeDownAdornment);
    });

    it('should handle InputAdornments between two inputs correctly', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="first"
            name="first"
            value="First"
            onChange={() => {}}
          />
          <BpkInputV2.InputAdornment>kg</BpkInputV2.InputAdornment>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input
            id="second"
            name="second"
            value="Second"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainers = container.querySelectorAll('.bpk-input-v2__input-container');
      const kgAdornment = screen.getByText('kg');
      const dollarAdornment = screen.getByText('$');

      // 2 inputs should be docked
      expect(inputContainers).toHaveLength(2);
      expect(inputContainers[0]).toHaveClass('bpk-input-v2__input-container--docked-first');
      expect(inputContainers[1]).toHaveClass('bpk-input-v2__input-container--docked-last');

      // Both 'kg' and '$' come AFTER first input, so they belong to it as end adornments
      expect(inputContainers[0]).toContainElement(kgAdornment);
      expect(inputContainers[0]).toContainElement(dollarAdornment);
    });

    it('should apply docked styles with validation states', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="first"
            name="first"
            value="valid@example.com"
            valid
            onChange={() => {}}
          />
          <BpkInputV2.Input
            id="second"
            name="second"
            value="invalid"
            valid={false}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainers = container.querySelectorAll('.bpk-input-v2__input-container');

      // Both should have docked styles
      expect(inputContainers[0]).toHaveClass('bpk-input-v2__input-container--docked-first');
      expect(inputContainers[1]).toHaveClass('bpk-input-v2__input-container--docked-last');

      // And validation styles
      expect(inputContainers[0]).toHaveClass('bpk-input-v2__input-container--valid');
      expect(inputContainers[1]).toHaveClass('bpk-input-v2__input-container--invalid');
    });

    it('should apply docked styles with large variant', () => {
      const { container } = render(
        <BpkInputV2.Root large>
          <BpkInputV2.Input
            id="first"
            name="first"
            value="First"
            onChange={() => {}}
          />
          <BpkInputV2.Input
            id="second"
            name="second"
            value="Second"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainers = container.querySelectorAll('.bpk-input-v2__input-container');

      // Both should have docked styles and large variant
      expect(inputContainers[0]).toHaveClass('bpk-input-v2__input-container--docked-first');
      expect(inputContainers[0]).toHaveClass('bpk-input-v2__input-container--large');
      expect(inputContainers[1]).toHaveClass('bpk-input-v2__input-container--docked-last');
      expect(inputContainers[1]).toHaveClass('bpk-input-v2__input-container--large');
    });
  });

  describe('Snapshots', () => {
    it('should match snapshot with docked 2 inputs', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="from"
            name="from"
            value="Edinburgh"
            onChange={() => {}}
          />
          <BpkInputV2.Input
            id="to"
            name="to"
            value="London"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with docked 3 inputs', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="first"
            name="first"
            value="First"
            onChange={() => {}}
          />
          <BpkInputV2.Input
            id="middle"
            name="middle"
            value="Middle"
            onChange={() => {}}
          />
          <BpkInputV2.Input
            id="last"
            name="last"
            value="Last"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with docked inputs and adornments', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>🛫</BpkInputV2.InputAdornment>
          <BpkInputV2.Input
            id="from"
            name="from"
            value="Edinburgh"
            onChange={() => {}}
          />
          <BpkInputV2.InputAdornment>🛬</BpkInputV2.InputAdornment>
          <BpkInputV2.Input
            id="to"
            name="to"
            value="London"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
