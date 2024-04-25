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

import { getClassName } from '../../bpk-react-utils';

import BpkCard from './BpkCard';

import STYLES from './BpkDividedCard.module.scss';

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
  className = null,
  href = null,
  isElevated = true,
  orientation = ORIENTATION.horizontal,
  primaryContent,
  secondaryContent,
  ...rest
}: Props) => {
  const isVertical = orientation === ORIENTATION.vertical;
  const classNames = getClassName(
    STYLES["bpk-divided-card"],
    isVertical ? STYLES["bpk-divided-card--vertical"] : STYLES["bpk-divided-card--horizontal"],
    !isElevated && STYLES["bpk-divided-card--no-elevation"],
    className,
  );

  return (
    // TODO: className to be removed
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    (<BpkCard className={classNames} href={href} padded={false} {...rest}>
      <div
        className={getClassName(
          !isVertical && STYLES["bpk-divided-card__primary--horizontal"],
        )}
      >
        {primaryContent}
      </div>
      <div
        className={getClassName(
          isVertical
            ? STYLES["bpk-divided-card__secondary--vertical"]
            : STYLES["bpk-divided-card__secondary--horizontal"],
        )}
      >
        {secondaryContent}
      </div>
    </BpkCard>)
  );
};

export default BpkDividedCard;
