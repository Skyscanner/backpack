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
import { TransitionInitialMount, cssModules } from 'bpk-react-utils';
import { BpkContentBubble } from 'bpk-component-flare';

import {
  type DialogInnerProps as Props,
  dialogInnerPropTypes,
  dialogInnerDefaultProps,
} from './common-types';
import STYLES from './BpkDialogInner.scss';

const getClassName = cssModules(STYLES);

const BpkDialogInner = (props: Props) => {
  const classNames = getClassName(
    'bpk-dialog',
    props.wide && 'bpk-dialog--wide',
    props.className,
  );
  const contentClassNames = getClassName(
    'bpk-dialog__content',
    props.padded && 'bpk-dialog__content--padded',
    props.contentClassName,
  );
  const flareClassNames = getClassName(
    'bpk-dialog__flare',
    props.flareClassName,
  );

  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-dialog--appear')}
      appearActiveClassName={getClassName('bpk-dialog--appear-active')}
      transitionTimeout={300}
    >
      <section
        id={props.id}
        tabIndex="-1"
        role="dialog"
        aria-label={props.ariaLabel}
        className={classNames}
        ref={props.dialogRef}
      >
        {props.flare && <BpkContentBubble className={flareClassNames} />}
        <div className={contentClassNames}>{props.children}</div>
      </section>
    </TransitionInitialMount>
  );
};

export const propTypes = {
  ...dialogInnerPropTypes,
};

export const defaultProps = {
  ...dialogInnerDefaultProps,
};

BpkDialogInner.propTypes = { ...propTypes };
BpkDialogInner.defaultProps = { ...defaultProps };

export default BpkDialogInner;
