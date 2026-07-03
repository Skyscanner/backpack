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

import { cloneElement, useCallback, useRef, version } from 'react';
import type { MutableRefObject, ReactElement, Ref } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import assign from 'object-assign';
import CSSTransition from 'react-transition-group/CSSTransition';

// Object.assign() is used unpolyfilled in react-transition-group.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = assign;

type Props = {
  appearClassName: string;
  appearActiveClassName: string;
  transitionTimeout: number;
  // Must be a single ReactElement that forwards a ref to a DOM node — React 19
  // removed the findDOMNode fallback in react-transition-group@4, so we inject
  // a nodeRef into the child via cloneElement. The child therefore has to be a
  // DOM element (e.g. <section>), a class component, or a forwardRef component;
  // a plain string/fragment or a function component that drops the ref cannot
  // receive nodeRef, so CSSTransition would have no node to animate.
  // `Ref` (not `RefObject`) so the merged callback ref we inject is assignable.
  children: ReactElement<{ ref?: Ref<HTMLElement> }>;
};

// Assigns a node to the child's own ref, supporting both callback refs and
// object refs (e.g. createRef). nodeRef is handled separately below since it is
// always an object ref we own.
const assignChildRef = (
  childRef: Ref<HTMLElement> | undefined,
  node: HTMLElement | null,
) => {
  if (!childRef) {
    return;
  }
  if (typeof childRef === 'function') {
    childRef(node);
  } else {
    // eslint-disable-next-line no-param-reassign
    (childRef as MutableRefObject<HTMLElement | null>).current = node;
  }
};

// TODO: revisit the cloneElement pattern when react-transition-group v5 ships;
// it is expected to remove the nodeRef requirement.
const TransitionInitialMount = ({
  appearActiveClassName,
  appearClassName,
  children,
  transitionTimeout,
}: Props) => {
  const nodeRef = useRef<HTMLElement | null>(null);
  // Read the child's own ref so injecting nodeRef does not clobber it.
  // React 19 exposes ref as a normal prop (children.props.ref) and logs a
  // deprecation warning if you read element.ref; React 18 keeps it on the
  // element itself. Pick the source by major version so we never touch
  // element.ref on React 19, even when the child has no ref of its own.
  const isReact19OrLater = parseInt(version, 10) >= 19;
  const childRef = isReact19OrLater
    ? (children.props as { ref?: Ref<HTMLElement> }).ref
    : (children as ReactElement & { ref?: Ref<HTMLElement> }).ref;

  // Compose the nodeRef CSSTransition needs with any ref the child already has,
  // so injecting nodeRef does not clobber the child's own ref (e.g. the
  // `dialogRef` used by withScrim to scope focus inside BpkModal/BpkDialog).
  // Memoised so the callback ref keeps a stable identity across renders and is
  // only re-run when nodeRef or the child's ref actually changes.
  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      nodeRef.current = node;
      assignChildRef(childRef, node);
    },
    [childRef],
  );

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={{
        appear: appearClassName,
        appearActive: appearActiveClassName,
      }}
      in
      appear
      timeout={{ exit: 0, enter: 0, appear: transitionTimeout }}
    >
      {cloneElement(children, { ref: mergedRef })}
    </CSSTransition>
  );
};

export default TransitionInitialMount;
