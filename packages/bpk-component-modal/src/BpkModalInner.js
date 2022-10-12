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

import PropTypes from 'prop-types';
import React, { type Node, type Element } from 'react';

import { BpkButtonLink } from '../../bpk-component-link';
import BpkCloseButton from '../../bpk-component-close-button';
import BpkNavigationBar from '../../bpk-component-navigation-bar';
import { TransitionInitialMount, cssModules } from '../../bpk-react-utils';

import STYLES from './BpkModalInner.module.scss';
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
  onClose: (event: SyntheticEvent<>) => void,
  className: ?string,
  contentClassName: ?string,
  title: ?string,
  closeLabel: string,
  closeText: ?string,
  accessoryView: ?Element<any>,
};

const BpkModalInner = (props: Props) => {
  const classNames = [getClassName('bpk-modal')];
  const contentClassNames = [getClassName('bpk-modal__content')];
  const navigationStyles = [getClassName('bpk-modal__navigation')];

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

  const accessoryViewFinal = props.accessoryView ? (
    <span className={getClassName('bpk-modal__accessory-view')}>
      {props.accessoryView}
    </span>
  ) : null;

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
        aria-labelledby={props.showHeader ? headingId : null}
        className={classNames.join(' ')}
        ref={props.dialogRef}
      >
        {props.showHeader && (
          <header className={getClassName('bpk-modal__header')}>
            <BpkNavigationBar
              id={headingId}
              className={navigationStyles.join(' ')}
              title={
                <h2
                  id={headingId}
                  className={getClassName('bpk-modal__heading')}
                >
                  {props.title}
                </h2>
              }
              leadingButton={accessoryViewFinal}
              trailingButton={
                props.closeText ? (
                  <BpkButtonLink
                    className={getClassName('bpk-modal__close-button')}
                    onClick={props.onClose}
                  >
                    {/* $FlowIgnore[incompatible-type] this is perfectly good because we're already doing a null check above. THANKS FLOW */}
                    {props.closeText}
                  </BpkButtonLink>
                ) : (
                  <BpkCloseButton
                    className={getClassName('bpk-modal__close-button')}
                    label={props.closeLabel}
                    onClick={props.onClose}
                  />
                )
              }
            />
          </header>
        )}
        <div className={contentClassNames.join(' ')}>{props.children}</div>
      </section>
    </TransitionInitialMount>
  );
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
  accesoryView: PropTypes.func,
};

export const defaultProps = {
  title: null,
  onClose: () => null,
  className: null,
  contentClassName: null,
  closeLabel: '',
  closeText: null,
  wide: false,
  showHeader: true,
  fullScreenOnMobile: true,
  fullScreen: false,
  padded: true,
  accessoryView: null,
};

BpkModalInner.propTypes = { ...propTypes };
BpkModalInner.defaultProps = { ...defaultProps };

export default BpkModalInner;
