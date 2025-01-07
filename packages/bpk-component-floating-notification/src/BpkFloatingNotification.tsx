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

import type { MouseEvent, FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import { CSSTransition } from 'react-transition-group';

import BpkAriaLive from '../../bpk-component-aria-live';
import { BUTTON_TYPES, BpkButtonV2 } from '../../bpk-component-button';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkFloatingNotification.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  animateOnEnter?: boolean;
  animateOnExit?: boolean;
  className?: string;
  ctaText?: string;
  /**
   * This prop controls the amount of time that the notification stays visible before the exit animation begins.
   * The default value is 4 seconds (4000 milliseconds).
   */
  hideAfter?: number;
  icon?: FunctionComponent;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Execute a function after the component has finished the exit animation.
   */
  onExit?: () => void;
  text: string;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const BpkFloatingNotification = (props: Props) => {
  const [showMessage, setShowMessage] = useState(true);

  const {
    animateOnEnter = true,
    animateOnExit = true,
    className,
    ctaText,
    hideAfter = 4000,
    icon: Icon,
    onClick,
    onExit,
    text,
    ...rest
  } = props;

  const classNames = getClassName('bpk-floating-notification', className);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
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
      onExited={onExit}
    >
      <div className={classNames} {...rest}>
        {Icon && (
          <div className={getClassName('bpk-floating-notification__icon')}>
            <Icon aria-hidden />
          </div>
        )}
        <span className={getClassName('bpk-floating-notification__text')}>
          <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
            {text}
          </BpkText>
        </span>
        <BpkAriaLive aria-hidden>{text}</BpkAriaLive>
        {ctaText && (
          <div className={getClassName('bpk-floating-notification__cta')}>
            <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} onClick={onClick}>
              {ctaText}
            </BpkButtonV2>
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default BpkFloatingNotification;
