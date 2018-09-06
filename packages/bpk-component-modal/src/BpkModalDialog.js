/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import { BpkButtonLink } from 'bpk-component-link';
import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import BpkCloseButton from 'bpk-component-close-button';
import { TransitionInitialMount, cssModules } from 'bpk-react-utils';

import STYLES from './bpk-modal-dialog.css';

import { titlePropType, onClosePropType } from './customPropTypes';

const getClassName = cssModules(STYLES);

export type Props = {
  id: string,
  children: Node,
  wide: boolean,
  isIphone: boolean,
  showHeader: boolean,
  fullScreenOnMobile: boolean,
  fullScreen: boolean,
  padded: boolean,
  dialogRef: (ref: ?HTMLElement) => void,
  onClose: ?(event: SyntheticEvent<>) => void,
  className: ?string,
  contentClassName: ?string,
  title: ?string,
  closeLabel: ?string,
  closeText: ?string,
};

const BpkModalDialog = (props: Props) => {
  const classNames = [getClassName('bpk-modal')];
  const contentClassNames = [getClassName('bpk-modal__content')];

  if (props.wide) {
    classNames.push(getClassName('bpk-modal--wide'));
  }
  if (props.className) {
    classNames.push(props.className);
  }

  if (props.fullScreen || props.isIphone) {
    classNames.push(getClassName('bpk-modal--full-screen'));
  } else if (props.fullScreenOnMobile) {
    classNames.push(getClassName('bpk-modal--full-screen-mobile'));
  }

  if (props.padded) {
    contentClassNames.push(getClassName('bpk-modal__content--padded'));
  }

  if (props.contentClassName) {
    contentClassNames.push(props.contentClassName);
  }

  const headingId = `bpk-modal-heading-${props.id}`;

  /* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-element-interactions */
  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-modal--appear')}
      appearActiveClassName={getClassName('bpk-modal--appear-active')}
      transitionTimeout={300}
    >
      <section
        id={props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={headingId}
        className={classNames.join(' ')}
        ref={props.dialogRef}
      >
        {props.showHeader && (
          <header className={getClassName('bpk-modal__header')}>
            <h2 id={headingId} className={getClassName('bpk-modal__heading')}>
              {props.title}
            </h2>
            &nbsp;
            {props.closeText ? (
              <BpkButtonLink onClick={props.onClose}>
                {props.closeText}
              </BpkButtonLink>
            ) : (
              <BpkCloseButton
                className={getClassName('bpk-modal__close-button')}
                label={props.closeLabel}
                onClick={props.onClose}
              />
            )}
          </header>
        )}
        <div className={contentClassNames.join(' ')}>{props.children}</div>
      </section>
    </TransitionInitialMount>
  );
  /* eslint-enable */
};

export const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isIphone: PropTypes.bool.isRequired,
  dialogRef: PropTypes.func.isRequired,
  title: titlePropType,
  onClose: onClosePropType,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string,
  wide: PropTypes.bool,
  showHeader: PropTypes.bool,
  fullScreenOnMobile: PropTypes.bool,
  fullScreen: PropTypes.bool,
  padded: PropTypes.bool,
};

export const defaultProps = {
  title: null,
  onClose: null,
  className: null,
  contentClassName: null,
  closeLabel: null,
  closeText: null,
  wide: false,
  showHeader: true,
  fullScreenOnMobile: true,
  fullScreen: false,
  padded: true,
};

BpkModalDialog.propTypes = { ...propTypes };
BpkModalDialog.defaultProps = { ...defaultProps };

export default BpkModalDialog;
