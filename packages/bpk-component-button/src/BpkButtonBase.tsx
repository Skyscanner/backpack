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


import { BUTTON_TYPES } from './BpkButtonV2/common-types';

import type { Props } from './common-types';

import COMMON_STYLES from './BpkButtonBase.module.scss';

type ValueOf<T> = T[keyof T];
const BpkButton = (props: Props & {type?: ValueOf<typeof BUTTON_TYPES>}) => {
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
    type,
    ...rest
  } = props;

  const classNames = [];
  if(type === undefined){
    classNames.push(COMMON_STYLES['bpk-button']);

  }
  if(type === BUTTON_TYPES.featured){
    classNames.push(COMMON_STYLES.featured);
  }
  if(type === BUTTON_TYPES.destructive){
    classNames.push(COMMON_STYLES.destructive);
  }
  if(type === BUTTON_TYPES.link){
    classNames.push(COMMON_STYLES.link);
  }
  if(type === BUTTON_TYPES.linkOnDark){
    classNames.push(COMMON_STYLES.linkOnDark);
  }
  if(type === BUTTON_TYPES.primaryOnDark){
    classNames.push(COMMON_STYLES.primaryOnDark);
  }
  if(type === BUTTON_TYPES.primaryOnLight){
    classNames.push(COMMON_STYLES.primaryOnDark);
  }
  if(type === BUTTON_TYPES.secondary){
    classNames.push(COMMON_STYLES.secondary);
  }
  if(type === BUTTON_TYPES.secondaryOnDark){
    classNames.push(COMMON_STYLES.secondaryOnDark);
  }

  if (large) {
    classNames.push(COMMON_STYLES['bpk-button--large']);
  }

  if (iconOnly) {
    classNames.push(
      COMMON_STYLES[large ? 'bpk-button--large-icon-only' : 'bpk-button--icon-only'],
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
      <a
        href={href}
        className={classNameFinal}
        onClick={onClick}
        target={target || undefined}
        rel={rel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const buttonType = submit ? 'submit' : 'button';


  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={buttonType}
      disabled={disabled}
      className={classNameFinal}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );

};

export default BpkButton;
export const cssModules = () => {}