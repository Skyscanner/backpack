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
import React, { useEffect, useState } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkButton from 'bpk-component-button';
import BpkIconHeart from 'bpk-component-icon/sm/heart';
import { CSSTransition } from 'react-transition-group';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';

import STYLES from './BpkFloatingNotification.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  className: ?string,
  ctaText: ?string,
  darkMode: ?boolean,
  icon: ?boolean,
  onClick: ?() => void,
  text: string,
  animateOnEnter: ?boolean,
  animateOnExit: ?boolean,
  hideAfter: ?number,
};

const BpkFloatingNotification = (props: Props) => {
  const [showMessage, setShowMessage] = useState(true);
  const { className, ctaText, darkMode, icon, onClick, text, ...rest } = props;
  const classNames = [getClassName('bpk-floating-notification', className)];

  if (darkMode) {
    classNames.push(getClassName('bpk-floating-notification--dark'));
  }

  useEffect(() => {
    if (props.hideAfter) {
      setTimeout(() => setShowMessage(false), props.hideAfter);
    }
  });

  return (
    <CSSTransition
      in={showMessage}
      classNames={{
        exit: getClassName('bpk-floating-notification--leave'),
        exitActive: getClassName('bpk-floating-notification--leave-active'),
        exitDone: getClassName('bpk-floating-notification--leave-done'),
        appear: getClassName('bpk-floating-notification--appear'),
        appearActive: getClassName('bpk-floating-notification--appear-active'),
      }}
      timeout={500}
      appear={props.animateOnEnter}
      exit={props.animateOnExit}
    >
      <div className={getClassName('bpk-floating-notification')}>
        {icon && (
          <BpkIconHeart
            className={`${getClassName('bpk-floating-notification__icon')} ${
              darkMode
                ? getClassName('bpk-floating-notification__icon--dark')
                : ''
            }`}
          />
        )}
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.bodyDefault}
          className={getClassName('bpk-floating-notification__text')}
        >
          {text}
        </BpkText>
        {ctaText && (
          <BpkButton
            link
            onClick={onClick}
            className={`${getClassName('bpk-floating-notification__button')} ${
              darkMode
                ? getClassName('bpk-floating-notification__button--dark')
                : ''
            }`}
          >
            {ctaText}
          </BpkButton>
        )}
      </div>
    </CSSTransition>
  );
};

BpkFloatingNotification.propTypes = {
  className: PropTypes.string,
};

BpkFloatingNotification.defaultProps = {
  className: null,
  ctaText: null,
  darkMode: false,
  icon: false,
  animateOnEnter: false,
  animateOnExit: false,
};

export default BpkFloatingNotification;
