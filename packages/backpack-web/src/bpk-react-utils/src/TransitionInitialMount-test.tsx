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

import { createRef } from 'react';

import { render } from '@testing-library/react';

import TransitionInitialMount from './TransitionInitialMount';

describe('TransitionInitialMount', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <TransitionInitialMount
        appearClassName="block--appear"
        appearActiveClassName="block--apear-active"
        transitionTimeout={250}
      >
        <p>My transition</p>
      </TransitionInitialMount>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should preserve the child's own ref when injecting nodeRef", () => {
    // Regression: cloneElement used to overwrite the child ref with nodeRef,
    // which broke focus trapping in BpkModal/BpkDialog (the dialogRef from
    // withScrim never fired). See backpack#4701.
    const callbackRef = jest.fn();
    const objectRef = createRef<HTMLElement>();

    render(
      <TransitionInitialMount
        appearClassName="block--appear"
        appearActiveClassName="block--appear-active"
        transitionTimeout={250}
      >
        <section ref={callbackRef}>callback ref child</section>
      </TransitionInitialMount>,
    );
    expect(callbackRef).toHaveBeenCalledWith(expect.any(HTMLElement));

    render(
      <TransitionInitialMount
        appearClassName="block--appear"
        appearActiveClassName="block--appear-active"
        transitionTimeout={250}
      >
        <section ref={objectRef}>object ref child</section>
      </TransitionInitialMount>,
    );
    expect(objectRef.current).toBeInstanceOf(HTMLElement);
  });
});
