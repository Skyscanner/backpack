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

import STYLES from './BpkPriceMarkerButton.module.scss';

import BpkText, { TEXT_STYLES } from '@backpack/bpk-component-text';
import { cssModules } from '@backpack/bpk-react-utils';


const getClassName = cssModules(STYLES);

export const MARKER_STATUSES = {
  unselected: 'unselected',
  selected: 'selected',
  previous_selected: 'previous_selected',
} as const;

export type Status = (typeof MARKER_STATUSES)[keyof typeof MARKER_STATUSES];

export type Props = {
  label: string;
  icon?: ReactNode;
  className?: string | null;
  onClick?: () => void;
  buttonProps?: { [key: string]: string };
  status?: Status;
};

const BpkPriceMarkerButton = ({
  buttonProps = {},
  className = null,
  icon,
  label,
  onClick,
  status = MARKER_STATUSES.unselected,
}: Props) => {
  const markerWrapperClassNames = getClassName(
    'bpk-price-marker-button__wrapper',
  );

  const markerClassNames = getClassName(
    'bpk-price-marker-button',
    onClick && 'bpk-price-marker-button--dynamic',
    `bpk-price-marker-button-${status}`,
    icon && `bpk-price-marker-button-${status}--icon`,
    className,
  );
  return (
    <button
      type="button"
      className={markerWrapperClassNames}
      onClick={onClick}
      {...buttonProps}
    >
      <div className={markerClassNames}>
        {icon}
        <BpkText textStyle={TEXT_STYLES.label3}>{label}</BpkText>
      </div>
    </button>
  );
};

export default BpkPriceMarkerButton;
