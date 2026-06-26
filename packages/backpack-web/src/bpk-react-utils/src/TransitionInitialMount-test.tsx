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
import type { ReactNode, RefObject } from 'react';

import { render } from '@testing-library/react';

import TransitionInitialMount from './TransitionInitialMount';

// Capture the nodeRef CSSTransition is given so we can assert it points at the
// child node. The real CSSTransition drives its appear animation through a
// DOM/raf pipeline jsdom does not run, so we render the children directly.
let capturedNodeRef: RefObject<HTMLElement | null> | null = null;
jest.mock('react-transition-group/CSSTransition', () => ({
  __esModule: true,
  default: ({
    children,
    nodeRef,
  }: {
    children: ReactNode;
    nodeRef: RefObject<HTMLElement | null>;
  }) => {
    capturedNodeRef = nodeRef;
    return children;
  },
}));

describe('TransitionInitialMount', () => {
  beforeEach(() => {
    capturedNodeRef = null;
  });

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

  it('should populate the nodeRef that CSSTransition uses to drive the animation', () => {
    // Covers the nodeRef side of the merged ref. CSSTransition reads nodeRef
    // to drive the appear animation; that animation relies on a real DOM/raf
    // pipeline jsdom cannot run, so we instead assert CSSTransition is handed a
    // nodeRef pointing at the child node. Deleting `nodeRef.current = node`
    // would null this and fail the test, where a snapshot test would not.
    const { container } = render(
      <TransitionInitialMount
        appearClassName="my-appear"
        appearActiveClassName="my-appear-active"
        transitionTimeout={250}
      >
        <section>child</section>
      </TransitionInitialMount>,
    );

    const section = container.querySelector('section');
    expect(capturedNodeRef).not.toBeNull();
    expect(capturedNodeRef?.current).toBe(section);
  });
});
