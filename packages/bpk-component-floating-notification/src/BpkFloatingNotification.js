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
import React, { useEffect, useState, ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import BpkButton from 'bpk-component-button';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkFloatingNotification.module.scss';

const getClassName = cssModules(STYLES);

export const THEME = {
  light: 'light',
  dark: 'dark',
};

export type Props = {
  animateOnEnter: ?boolean,
  animateOnExit: ?boolean,
  className: ?string,
  ctaText: ?string,
  darkMode: ?boolean,
  hideAfter: ?number,
  icon: ?() => ReactElement,
  onClick: ?() => void,
  text: string,
  theme: ?THEME,
};

const BpkFloatingNotification = (props: Props) => {
  const [showMessage, setShowMessage] = useState(true);

  const {
    animateOnEnter,
    animateOnExit,
    className,
    ctaText,
    darkMode,
    hideAfter,
    icon: Icon,
    onClick,
    text,
    theme,
    ...rest
  } = props;

  console.log(`THEME: ${THEME}`);

  const classNames = getClassName(
    'bpk-floating-notification',
    theme === 'dark' && 'bpk-floating-notification--dark',
    className,
  );

  const iconClassNames = getClassName(
    'bpk-floating-notification__icon',
    theme === 'dark' && 'bpk-floating-notification__icon--dark',
  );

  const buttonClassNames = getClassName(
    'bpk-floating-notification__button',
    theme === 'dark' && 'bpk-floating-notification__button--dark',
  );

  useEffect(() => {
    let timer;
    if (hideAfter) {
      timer = setTimeout(() => setShowMessage(false), hideAfter);
    }
    return () => timer && clearTimeout(timer);
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
      timeout={400}
      appear={animateOnEnter}
      exit={animateOnExit}
      unmountOnExit
    >
      <div className={classNames} {...rest}>
        {Icon && (
          <div className={iconClassNames}>
            <Icon />
          </div>
        )}
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.bodyDefault}
          className={getClassName('bpk-floating-notification__text')}
        >
          {text}
        </BpkText>
        {ctaText && (
          <BpkButton link onClick={onClick} className={buttonClassNames}>
            {ctaText}
          </BpkButton>
        )}
      </div>
    </CSSTransition>
  );
};

BpkFloatingNotification.propTypes = {
  className: PropTypes.string,
  ctaText: PropTypes.string,
  text: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(Object.values(THEME)),
};

BpkFloatingNotification.defaultProps = {
  animateOnEnter: true,
  animateOnExit: true,
  className: null,
  ctaText: null,
  darkMode: false,
  hideAfter: 4000,
  icon: null,
  theme: THEME.light,
};

export default BpkFloatingNotification;
