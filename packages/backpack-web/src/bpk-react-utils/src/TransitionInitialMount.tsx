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

import { cloneElement, useCallback, useRef } from 'react';
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
  // Must be a single ReactElement that accepts a ref — React 19 removed the
  // findDOMNode fallback in react-transition-group@4, so we inject a nodeRef
  // into the child via cloneElement. A plain string/fragment cannot accept a
  // ref and would crash at runtime, so the type is narrowed accordingly.
  // `Ref` (not `RefObject`) so the merged callback ref we inject is assignable.
  children: ReactElement<{ ref?: Ref<HTMLElement> }>;
};

const assignRef = (ref: Ref<HTMLElement> | undefined, node: HTMLElement | null) => {
  if (!ref) {
    return;
  }
  if (typeof ref === 'function') {
    ref(node);
  } else {
    // eslint-disable-next-line no-param-reassign
    (ref as MutableRefObject<HTMLElement | null>).current = node;
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
  const nodeRef = useRef<HTMLElement>(null);
  // Read the child's own ref so injecting nodeRef does not clobber it.
  // React 19 exposes ref as a normal prop (children.props.ref); React 18 keeps
  // it on the element itself (children.ref). Check props.ref FIRST so that on
  // React 19 we never touch element.ref (which logs a deprecation warning).
  const childProps = children.props as { ref?: Ref<HTMLElement> };
  const childRef =
    childProps.ref ??
    (children as ReactElement & { ref?: Ref<HTMLElement> }).ref;

  // Compose the nodeRef CSSTransition needs with any ref the child already has,
  // so injecting nodeRef does not clobber the child's own ref (e.g. the
  // `dialogRef` used by withScrim to scope focus inside BpkModal/BpkDialog).
  // Memoised so the callback ref keeps a stable identity across renders and is
  // only re-run when nodeRef or the child's ref actually changes.
  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      assignRef(nodeRef, node);
      assignRef(childRef, node);
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
