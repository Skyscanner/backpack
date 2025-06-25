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

import '@testing-library/jest-dom';

import BpkRadio from './BpkRadio';

describe('BpkRadio form test', () => {
  it('should work as a form component in a form', async () => {
    render(
      <form data-testid="form">
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'type'.
        // @ts-expect-error TS(2304): Cannot find name 'type'.
        // @ts-expect-error TS(2322): Type '{ type: string; name: string; "data-testid":... Remove this comment to see the full error message
        // @ts-expect-error TS(2304): Cannot find name 'type'.
        // @ts-expect-error TS(2322) FIXME: Type '{ type: string; name: string; "data-testid":... Remove this comment to see the full error message
        // @ts-expect-error TS(2322): Type '{ type: string; name: string; "data-testid":... Remove this comment to see the full error message
        <BpkRadio type="radio" name="radio" data-testid="myradio" />
        <button type="submit">Submit</button>
      </form>,
    );

    const radio = screen.getByTestId('myradio');

    expect(radio).not.toBeChecked();

    await userEvent.click(radio);

    expect(radio).toBeChecked();

    // @ts-expect-error TS(2345): Argument of type 'HTMLElement' is not assignable t... Remove this comment to see the full error message
    const formData = new FormData(screen.getByTestId('form'));

    expect(Object.fromEntries(formData.entries())).toEqual({ radio: 'on' });
  });

  it('should emit change event when toggled', async () => {
    const formValidation = jest.fn();
    const Wrap = () => (
      <form data-testid="form">
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'type'.
        // @ts-expect-error TS(2304): Cannot find name 'type'.
        // @ts-expect-error TS(2322): Type '{ type: string; name: string; value: string;... Remove this comment to see the full error message
        // @ts-expect-error TS(2304): Cannot find name 'type'.
        // @ts-expect-error TS(2322) FIXME: Type '{ type: string; name: string; value: string;... Remove this comment to see the full error message
        // @ts-expect-error TS(2322): Type '{ type: string; name: string; value: string;... Remove this comment to see the full error message
        <BpkRadio type="radio" name="radio" value="One" data-testid="myradio" />
        <BpkRadio
          // @ts-expect-error TS(2322): Type '{ type: string; name: string; value: string;... Remove this comment to see the full error message
          type="radio"
          name="radio"
          value="Two"
          data-testid="myradio2"
        />
        <button type="submit">Submit</button>
      </form>
    );

    render(<Wrap />);
    document.addEventListener('change', formValidation);

    const radio = screen.getByTestId('myradio');
    const radio2 = screen.getByTestId('myradio2');

    expect(radio).not.toBeChecked();
    expect(formValidation).not.toHaveBeenCalled();

    await userEvent.click(radio);

    expect(radio).toBeChecked();
    expect(formValidation).toHaveBeenCalledTimes(1);

    await userEvent.click(radio2);

    expect(radio).not.toBeChecked();
    expect(radio2).toBeChecked();
    expect(formValidation).toHaveBeenCalledTimes(2);
  });
});
