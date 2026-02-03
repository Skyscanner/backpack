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
import type { ReactNode } from 'react';

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
  children: string | ReactNode;
};

const TransitionInitialMount = ({
  appearActiveClassName,
  appearClassName,
  children,
  transitionTimeout,
}: Props) => (
  <CSSTransition
    classNames={{
      appear: appearClassName,
      appearActive: appearActiveClassName,
    }}
    in
    appear
    timeout={{ exit: 0, enter: 0, appear: transitionTimeout }}
  >
    {children}
  </CSSTransition>
);

export default TransitionInitialMount;
