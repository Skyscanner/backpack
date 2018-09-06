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

import React, { type Node } from 'react';
import PropTypes from 'prop-types';

import STYLES from './bpk-button.css';

// This was originally depended upon from the bpk-react-utils package, however
// we decided to inline it in this particular component so as not to bloat the
// the bundles of consumers who are not yet on webpack 2
// We'll revisit this again soon.
const cssModules = (styles = {}) => className =>
  styles[className] ? styles[className] : className;

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  href: ?string,
  className: ?string,
  disabled: boolean,
  onClick: ?(event: SyntheticEvent<>) => mixed,
  submit: boolean,
  secondary: boolean,
  destructive: boolean,
  large: boolean,
  link: boolean,
  iconOnly: boolean,
  featured: boolean,
  blank: boolean,
  rel: ?string,
};

const BpkButton = (props: Props) => {
  const {
    children,
    href,
    className,
    onClick,
    disabled,
    submit,
    secondary,
    destructive,
    featured,
    large,
    link,
    iconOnly,
    blank,
    rel: propRel,
    ...rest
  } = props;

  const classNames = [getClassName('bpk-button')];

  if (secondary) {
    classNames.push(getClassName('bpk-button--secondary'));
  }
  if (destructive) {
    classNames.push(getClassName('bpk-button--destructive'));
  }
  if (large) {
    classNames.push(getClassName('bpk-button--large'));
  }
  if (link) {
    classNames.push(getClassName('bpk-button--link'));
  }
  if (featured) {
    classNames.push(getClassName('bpk-button--featured'));
  }
  if (iconOnly) {
    classNames.push(
      getClassName(
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

  if (href) {
    return (
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

BpkButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  secondary: PropTypes.bool,
  destructive: PropTypes.bool,
  large: PropTypes.bool,
  link: PropTypes.bool,
  iconOnly: PropTypes.bool,
  featured: PropTypes.bool,
  blank: PropTypes.bool,
  rel: PropTypes.string,
};

BpkButton.defaultProps = {
  href: null,
  className: null,
  disabled: false,
  onClick: null,
  submit: false,
  secondary: false,
  destructive: false,
  large: false,
  link: false,
  iconOnly: false,
  featured: false,
  blank: false,
  rel: null,
};

export default BpkButton;
