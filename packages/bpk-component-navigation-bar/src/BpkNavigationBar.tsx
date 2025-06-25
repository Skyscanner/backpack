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

import type { ReactElement, ReactNode } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import type { Tag, TextStyle } from '../../bpk-component-text/src/BpkText';

// @ts-expect-error TS(2307): Cannot find module './BpkNavigationBar.module.scss... Remove this comment to see the full error message
import STYLES from './BpkNavigationBar.module.scss';

const getClassNames = cssModules(STYLES);

export const BAR_STYLES = {
  default: 'default',
  onDark: 'on-dark',
};
export type BarStyle = (typeof BAR_STYLES)[keyof typeof BAR_STYLES];

export type Props = {
  id: string;
  title: ReactNode;
  titleTextStyle?: TextStyle;
  titleTagName?: Tag;
  className?: string;
  leadingButton?: ReactElement | null;
  trailingButton?: ReactElement | null;
  sticky?: boolean;
  barStyle?: BarStyle;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const BpkNavigationBar = (props: Props) => {
  const {
    barStyle = BAR_STYLES.default,
    className,
    id,
    leadingButton,
    sticky = false,
    title,
    titleTagName = "span",
    titleTextStyle = TEXT_STYLES.heading5,
    trailingButton,
    ...rest
  } = props;

  // If the title is a component that sets its own id we want the aria-labelledby on the nav to match this so it can find the element
  // Otherwise if its just a string we set the id on the title component.
  const titleId =
    typeof title === 'string' ? `${id}-bpk-navigation-bar-title` : id;

  return (
    <nav
      aria-labelledby={titleId}
      className={getClassNames(
        'bpk-navigation-bar',
        `bpk-navigation-bar--${barStyle}`,
        sticky && 'bpk-navigation-bar__sticky',
        className,
      )}
      {...rest}
    >
      {leadingButton && (
        <div
          className={getClassNames(
            'bpk-navigation-bar__leading-item',
            `bpk-navigation-bar__leading-item--${barStyle}`,
          )}
        >
          {leadingButton}
        </div>
      )}
      {typeof title === 'string' ? (
        <span className={getClassNames(
          'bpk-navigation-bar__title',
          `bpk-navigation-bar__title--${barStyle}`,
        )}>
          <BpkText
            id={titleId}
            textStyle={titleTextStyle}
            tagName={titleTagName}
          >
            {title}
          </BpkText>
        </span>
      ) : (
        <div className={getClassNames('bpk-navigation-bar__title-container')}>{title}</div>
      )}
      {trailingButton && (
        <div
          className={getClassNames(
            'bpk-navigation-bar__trailing-item',
            `bpk-navigation-bar__trailing-item-${barStyle}`,
          )}
        >
          {trailingButton}
        </div>
      )}
    </nav>
  );
};

export default BpkNavigationBar;
