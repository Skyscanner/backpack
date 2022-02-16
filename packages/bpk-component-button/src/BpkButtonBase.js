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

import React from 'react';

import { type Props, propTypes, defaultProps } from './common-types';
import COMMON_STYLES from './BpkButtonBase.module.scss';

// This was originally depended upon from the bpk-react-utils package, however
// we decided to inline it in this particular component so as not to bloat the
// the bundles of consumers who are not yet on webpack 2
// We'll revisit this again soon.
const cssModules =
  (styles: {} = {}) =>
  (className: string) =>
    styles[className] ? styles[className] : className;

const getCommonClassName = cssModules(COMMON_STYLES);

const BpkButton = (props: Props) => {
  const {
    blank,
    children,
    className,
    disabled,
    href,
    iconOnly,
    large,
    onClick,
    rel: propRel,
    submit,
    ...rest
  } = props;

  const classNames = [getCommonClassName('bpk-button')];

  if (large) {
    classNames.push(getCommonClassName('bpk-button--large'));
  }

  if (iconOnly) {
    classNames.push(
      getCommonClassName(
        large ? 'bpk-button--large-icon-only' : 'bpk-button--icon-only',
      ),
    );
  }
  if (className) {
    classNames.push(className);
  }

  const classNameFinal = classNames.join(' ');

  const target = blank ? '_blank' : null;
  const rel = blank ? propRel || 'noopener noreferrer' : propRel;

  if (!disabled && href) {
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <a
        href={href}
        className={classNameFinal}
        onClick={onClick}
        target={target}
        rel={rel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Due to React bug in Chrome, the onClick event fires even if the button is disabled.
  // Pull request is being worked on (as of 2016-12-22): https://github.com/facebook/react/pull/8329
  const onClickWrapper = onClick
    ? (...args) => {
        if (!disabled) {
          onClick(...args);
        }
      }
    : null;

  const buttonType = submit ? 'submit' : 'button';

  /* eslint-disable react/button-has-type */
  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <button
      type={buttonType}
      disabled={disabled}
      className={classNameFinal}
      onClick={onClickWrapper}
      {...rest}
    >
      {children}
    </button>
  );
  /* eslint-enable */
};

BpkButton.propTypes = { ...propTypes };
BpkButton.defaultProps = { ...defaultProps };

export default BpkButton;
export { cssModules };
