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

import type { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react';

import { cssModules } from '../../bpk-react-utils';

import themeAttributes from './themeAttributes';

import STYLES from './BpkLink.module.scss';

const getClassName = cssModules(STYLES);

export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick'> {
  /** The content of the link. */
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string | null;
  alternate?: boolean;
  implicit?: boolean;
}

/**
 * @deprecated Use `<BpkLink as="button" />` instead.
 * BpkButtonLink is maintained for backwards compatibility but will be removed in a future major version.
 * @returns {JSX.Element} A button styled as a link.
 */
const BpkButtonLink = ({
  alternate = false,
  children,
  className = null,
  implicit = false,
  onClick,
  ...rest
}: Props) => {
  const classNames = [getClassName('bpk-link')];
  const underlinedClassNames = [getClassName('bpk-link-underlined')];

  if (className) {
    classNames.push(className);
  }
  if (implicit) {
    classNames.push(getClassName('bpk-link--implicit'));
  }
  if (alternate) {
    classNames.push(getClassName('bpk-link--alternate'));
  }

  if (implicit && !alternate) {
    underlinedClassNames.push(getClassName('bpk-link-underlined--implicit'));
  } else if (alternate && !implicit) {
    underlinedClassNames.push(getClassName('bpk-link-underlined--alternate'));
  } else if (implicit && alternate) {
    underlinedClassNames.push(
      getClassName('bpk-link-underlined-implicit--alternate'),
    );
  }

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={onClick}
      {...rest}
    >
      <span className={underlinedClassNames.join(' ')}>{children}</span>
    </button>
  );
};

export { themeAttributes };
export default BpkButtonLink;
