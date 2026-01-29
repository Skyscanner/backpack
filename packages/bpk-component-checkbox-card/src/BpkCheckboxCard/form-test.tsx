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

import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkCheckboxCard from './BpkCheckboxCard';

describe('BpkCheckboxCard form tests', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <form data-testid="form">
          <BpkCheckboxCard
            name="hotel-option"
            value="city-centre"
            checked={isChecked}
            onChange={(checked) => setIsChecked(checked)}
            label="City Centre"
            price="£85"
            data-testid="checkbox-card"
          />
          <button type="submit">Submit</button>
        </form>
      );
    };
    render(<Wrap />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const form = screen.getByTestId('form') as HTMLFormElement;
    const formData = new FormData(form);
    expect(Object.fromEntries(formData.entries())).toEqual({
      'hotel-option': 'city-centre',
    });
  });

  it('should support single selection pattern', async () => {
    const Wrap = () => {
      const [selectedId, setSelectedId] = useState<string | null>(null);

      return (
        <div>
          <BpkCheckboxCard
            name="option"
            value="opt1"
            checked={selectedId === 'opt1'}
            onChange={() => setSelectedId('opt1')}
            label="Option 1"
            price="£100"
            data-testid="opt1"
          />
          <BpkCheckboxCard
            name="option"
            value="opt2"
            checked={selectedId === 'opt2'}
            onChange={() => setSelectedId('opt2')}
            label="Option 2"
            price="£85"
            data-testid="opt2"
          />
          <BpkCheckboxCard
            name="option"
            value="opt3"
            checked={selectedId === 'opt3'}
            onChange={() => setSelectedId('opt3')}
            label="Option 3"
            price="£122"
            data-testid="opt3"
          />
        </div>
      );
    };
    render(<Wrap />);

    const opt1 = screen.getByTestId('opt1') as HTMLInputElement;
    const opt2 = screen.getByTestId('opt2') as HTMLInputElement;
    const opt3 = screen.getByTestId('opt3') as HTMLInputElement;

    // Initially none selected
    expect(opt1).not.toBeChecked();
    expect(opt2).not.toBeChecked();
    expect(opt3).not.toBeChecked();

    // Select option 1
    await userEvent.click(opt1);
    expect(opt1).toBeChecked();
    expect(opt2).not.toBeChecked();
    expect(opt3).not.toBeChecked();

    // Select option 2 (only opt2 should be checked)
    await userEvent.click(opt2);
    expect(opt1).not.toBeChecked();
    expect(opt2).toBeChecked();
    expect(opt3).not.toBeChecked();
  });

  it('should support multi-selection pattern', async () => {
    const Wrap = () => {
      const [selected, setSelected] = useState<string[]>([]);

      const handleChange = (id: string) => {
        setSelected((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
      };

      return (
        <div>
          <BpkCheckboxCard
            name="option1"
            value="opt1"
            checked={selected.includes('opt1')}
            onChange={() => handleChange('opt1')}
            label="Option 1"
            price="£100"
            data-testid="opt1"
          />
          <BpkCheckboxCard
            name="option2"
            value="opt2"
            checked={selected.includes('opt2')}
            onChange={() => handleChange('opt2')}
            label="Option 2"
            price="£85"
            data-testid="opt2"
          />
          <BpkCheckboxCard
            name="option3"
            value="opt3"
            checked={selected.includes('opt3')}
            onChange={() => handleChange('opt3')}
            label="Option 3"
            price="£122"
            data-testid="opt3"
          />
        </div>
      );
    };
    render(<Wrap />);

    const opt1 = screen.getByTestId('opt1') as HTMLInputElement;
    const opt2 = screen.getByTestId('opt2') as HTMLInputElement;
    const opt3 = screen.getByTestId('opt3') as HTMLInputElement;

    // Select multiple options
    await userEvent.click(opt1);
    await userEvent.click(opt3);

    expect(opt1).toBeChecked();
    expect(opt2).not.toBeChecked();
    expect(opt3).toBeChecked();

    // Deselect one
    await userEvent.click(opt1);
    expect(opt1).not.toBeChecked();
    expect(opt3).toBeChecked();
  });
});
