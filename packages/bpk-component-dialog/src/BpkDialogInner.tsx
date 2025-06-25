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

import { BpkContentBubble } from '../../bpk-component-flare';
import { TransitionInitialMount, cssModules } from '../../bpk-react-utils';
import { withScrim } from '../../bpk-scrim-utils';

import { type DialogInnerProps as Props } from './common-types';

// @ts-expect-error TS(2307): Cannot find module './BpkDialogInner.module.scss' ... Remove this comment to see the full error message
import STYLES from './BpkDialogInner.module.scss';

const getClassName = cssModules(STYLES);

const BpkDialogInner = (props: Props) => {
  const {
    ariaLabel,
    ariaModal = true,
    children,
    className = null,
    contentClassName,
    dialogRef,
    flare = false,
    flareClassName = null,
    id,
  } = props;

  const classNames = getClassName('bpk-dialog-inner', className);
  const contentClassNames = getClassName(
    'bpk-dialog-inner__content',
    contentClassName,
  );
  const flareClassNames = getClassName(
    'bpk-dialog-inner__flare',
    flareClassName,
  );

  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-dialog-inner--appear')}
      appearActiveClassName={getClassName('bpk-dialog-inner--appear-active')}
      transitionTimeout={300}
    >
      <section
        id={id}
        tabIndex={-1}
        role="dialog"
        aria-label={ariaLabel}
        aria-modal={ariaModal}
        className={classNames}
        ref={dialogRef}
      >
        {flare && <div className={flareClassNames}><BpkContentBubble/></div>}
        <div className={contentClassNames}>{children}</div>
      </section>
    </TransitionInitialMount>
  );
};

export default withScrim(BpkDialogInner);
