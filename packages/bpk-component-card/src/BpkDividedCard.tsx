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

import type { ReactNode } from 'react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import BpkCard from './BpkCard';
import { CardContext } from './CardContext';

import STYLES from './BpkDividedCard.module.scss';

const getClassName = cssModules(STYLES);

export const ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

export type Props = {
  primaryContent: ReactNode;
  secondaryContent: ReactNode;
  orientation?: (typeof ORIENTATION)[keyof typeof ORIENTATION];
  href?: string | null;
  className?: string | null;
  isElevated?: boolean;
  [rest: string]: any;
};

const BpkDividedCard = ({
  href = null,
  isElevated = true,
  orientation = ORIENTATION.horizontal,
  primaryContent,
  secondaryContent,
  ...rest
}: Props) => {
  const isVertical = orientation === ORIENTATION.vertical;

  const containerClassName = getClassName(
    isVertical
      ? 'bpk-divided-card--vertical-container'
      : 'bpk-divided-card--horizontal-container',
  );

  const contentClassName = getClassName(
    'bpk-divided-card--content',
    isVertical && 'bpk-divided-card--vertical-content',
  );

  const secondaryContentClassName = getClassName(
    isVertical
      ? 'bpk-divided-card__secondary--vertical'
      : 'bpk-divided-card__secondary--horizontal',
  );

  return (
    <CardContext.Provider value={{ elevated: isElevated }}>
      <div className={containerClassName} {...getDataComponentAttribute('DividedCard')}>
        <BpkCard href={href} padded={false} {...rest}>
          <div className={contentClassName}>
            <div
              className={getClassName(
                !isVertical && 'bpk-divided-card__primary--horizontal',
              )}
            >
              {primaryContent}
            </div>
            <div className={secondaryContentClassName}>{secondaryContent}</div>
          </div>
        </BpkCard>
      </div>
    </CardContext.Provider>
  );
};

export default BpkDividedCard;
