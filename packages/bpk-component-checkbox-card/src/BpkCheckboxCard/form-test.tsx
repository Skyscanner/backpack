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

import { BpkCheckboxCardSimple } from '../../index';

// @zag-js/dom-query uses PointerEvent internally; jsdom doesn't provide it.
beforeAll(() => {
  window.PointerEvent = class PointerEvent extends MouseEvent {} as typeof window.PointerEvent;
});

describe('BpkCheckboxCard form tests', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <form data-testid="form">
          <BpkCheckboxCardSimple
            name="hotel-option"
            value="city-centre"
            checked={isChecked}
            onChange={(checked) => setIsChecked(checked)}
            label="City Centre"
            price="£85"
          />
          <button type="submit">Submit</button>
        </form>
      );
    };
    render(<Wrap />);

    const card = screen.getByRole('checkbox');
    expect(card).not.toBeChecked();

    await userEvent.click(card);
    expect(card).toBeChecked();

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
          <BpkCheckboxCardSimple
            name="option"
            value="opt1"
            checked={selectedId === 'opt1'}
            onChange={() => setSelectedId('opt1')}
            label="Option 1"
            price="£100"
          />
          <BpkCheckboxCardSimple
            name="option"
            value="opt2"
            checked={selectedId === 'opt2'}
            onChange={() => setSelectedId('opt2')}
            label="Option 2"
            price="£85"
          />
        </div>
      );
    };
    render(<Wrap />);

    const [opt1, opt2] = screen.getAllByRole('checkbox');

    expect(opt1).not.toBeChecked();
    expect(opt2).not.toBeChecked();

    await userEvent.click(opt1);
    expect(opt1).toBeChecked();
    expect(opt2).not.toBeChecked();

    await userEvent.click(opt2);
    expect(opt1).not.toBeChecked();
    expect(opt2).toBeChecked();
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
          <BpkCheckboxCardSimple
            name="option1"
            value="opt1"
            checked={selected.includes('opt1')}
            onChange={() => handleChange('opt1')}
            label="Option 1"
            price="£100"
          />
          <BpkCheckboxCardSimple
            name="option2"
            value="opt2"
            checked={selected.includes('opt2')}
            onChange={() => handleChange('opt2')}
            label="Option 2"
            price="£85"
          />
          <BpkCheckboxCardSimple
            name="option3"
            value="opt3"
            checked={selected.includes('opt3')}
            onChange={() => handleChange('opt3')}
            label="Option 3"
            price="£122"
          />
        </div>
      );
    };
    render(<Wrap />);

    const [opt1, opt2, opt3] = screen.getAllByRole('checkbox');

    await userEvent.click(opt1);
    await userEvent.click(opt3);

    expect(opt1).toBeChecked();
    expect(opt2).not.toBeChecked();
    expect(opt3).toBeChecked();

    await userEvent.click(opt1);
    expect(opt1).not.toBeChecked();
    expect(opt3).toBeChecked();
  });
});
