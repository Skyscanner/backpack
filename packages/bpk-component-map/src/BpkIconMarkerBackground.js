/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkIconMarkerBackground.scss';

const getClassName = cssModules(STYLES);

type Props = {
  disabled: boolean,
  interactive: boolean,
  selected: boolean,
};

const BpkIconMarkerBackground = (props: Props) => {
  const { disabled, interactive, selected, ...rest } = props;

  const classNames = getClassName(
    'bpk-icon-marker-background',
    interactive && 'bpk-icon-marker-background--interactive',
    disabled && 'bpk-icon-marker-background--disabled',
    selected && 'bpk-icon-marker-background--selected',
  );

  if (selected) {
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="42"
        viewBox="4.5 3.5 36 42"
        className={classNames}
        {...rest}
      >
        <path d="M39.4994 20.1989L39.4995 20.2056C39.5034 20.6193 39.4841 21.031 39.4414 21.4376L39.4413 21.4376L39.4405 21.4466C39.1868 24.3698 38.1316 27.0792 36.4808 29.3774L36.4693 29.3933L36.4592 29.4101C33.1039 34.9496 27.5027 40.3879 23.1254 44.0934C22.4849 44.6355 21.5151 44.6355 20.8746 44.0934C16.4973 40.3879 10.8961 34.9496 7.5408 29.4101L7.53065 29.3933L7.51923 29.3774C5.86842 27.0792 4.8132 24.3698 4.55947 21.4466L4.55955 21.4466L4.55861 21.4376C4.51593 21.031 4.49659 20.6193 4.50049 20.2055L4.50054 20.2055L4.50051 20.1988L4.5 20.0704C4.5 20.07 4.5 20.0697 4.5 20.0694C4.50056 10.9429 12.31 3.5 22 3.5C31.6899 3.5 39.4994 10.9429 39.5 20.0694C39.5 20.0697 39.5 20.07 39.5 20.0704L39.4994 20.1989Z" />
      </svg>
    );
  }
  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="36"
      viewBox="4 3 30 36"
      className={classNames}
      {...rest}
    >
      <path d="M34 17.6317L33.9996 17.7436C34.003 18.1142 33.9861 18.4834 33.9489 18.8484C33.7307 21.4344 32.8231 23.8297 31.4057 25.8592C28.5742 30.6675 23.8653 35.3648 20.2071 38.55C19.5179 39.15 18.4821 39.15 17.7929 38.55C14.1347 35.3648 9.42576 30.6675 6.59428 25.8592C5.17695 23.8297 4.26934 21.4344 4.05112 18.8484C4.01387 18.4834 3.99703 18.1142 4.00043 17.7435L4 17.6317C4 9.55085 10.7157 3 19 3C27.2843 3 34 9.55085 34 17.6317Z" />
    </svg>
  );
};

BpkIconMarkerBackground.defaultProps = {
  disabled: false,
  interactive: false,
  selected: false,
};

export default BpkIconMarkerBackground;
