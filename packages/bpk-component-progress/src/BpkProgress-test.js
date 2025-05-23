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

/* @flow strict */

import { render, fireEvent } from '@testing-library/react';

import BpkProgress from './BpkProgress';

describe('BpkProgress', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkProgress min={0} max={100} value={25} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={100} value={25} className="my-progress-bar" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "tabIndex" attribute', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={100} value={25} tabIndex={-1} className="my-progress-bar" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "small" attribute', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={9} value={2} small />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "stepped" attribute', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={9} value={2} stepped />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "small" and "stepped" attributes', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={9} value={2} small stepped />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call "onComplete" when "value" is set to be >= "max"', () => {
    const onCompleteSpy = jest.fn();
    const { rerender } = render(
      <BpkProgress min={0} max={100} value={10} onComplete={onCompleteSpy} />,
    );
    expect(onCompleteSpy).not.toHaveBeenCalled();
    rerender(
      <BpkProgress min={0} max={100} value={100} onComplete={onCompleteSpy} />,
    );
    expect(onCompleteSpy).toHaveBeenCalled();
  });

  it('should call "onCompleteTransitionEnd" when "value" is set to be >= "max"', async () => {
    const onCompleteTransitionEndSpy = jest.fn();
    const { rerender } = render(
      <BpkProgress
        min={0}
        max={100}
        value={10}
        onCompleteTransitionEnd={onCompleteTransitionEndSpy}
      />,
    );
    expect(onCompleteTransitionEndSpy).not.toHaveBeenCalled();

    rerender(
      <BpkProgress
        min={0}
        max={100}
        value={100}
        onCompleteTransitionEnd={onCompleteTransitionEndSpy}
      />,
    );

    expect(onCompleteTransitionEndSpy).toHaveBeenCalled();
    expect(onCompleteTransitionEndSpy.mock.calls.length).toBe(1);

    const progress = document.getElementsByClassName('bpk-progress__value')[0];
    await fireEvent.transitionEnd(progress);
    expect(onCompleteTransitionEndSpy).toHaveBeenCalled();
    expect(onCompleteTransitionEndSpy.mock.calls.length).toBe(2);
  });
});
