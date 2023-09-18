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

import type { MouseEvent, ReactNode } from 'react';

import { cssModules } from '../../../bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import BpkBasicMapMarker from '../BpkBasicMapMarker';

import STYLES from './BpkPriceMarker.module.scss';

const getClassName = cssModules(STYLES);
export const PRICE_MARKER_STATUSES = {
  default: 'default',
  focused: 'focused',
  viewed: 'viewed',
} as const;

export type Status =
  (typeof PRICE_MARKER_STATUSES)[keyof typeof PRICE_MARKER_STATUSES];

type Props = {
  label: string;
  icon?: ReactNode;
  accessibilityLabel: string;
  position: {
    latitude: number;
    longitude: number;
  };
  className?: string;
  onClick?: (event: MouseEvent) => void;
  buttonProps?: { [key: string]: string };
  status?: Status;
};

const BpkPriceMarkerV2 = (props: Props) => {
  const {
    accessibilityLabel,
    buttonProps,
    className,
    icon,
    label,
    onClick,
    position,
    status = PRICE_MARKER_STATUSES.default,
    ...rest
  } = props;

  const markerWrapperClassNames = getClassName('bpk-price-marker__wrapper');

  const classNames = getClassName(
    'bpk-price-marker',
    onClick && 'bpk-price-marker--dynamic',
    `bpk-price-marker-${status}`,
    className,
    status === PRICE_MARKER_STATUSES.focused && 'bpk-price-marker--icon',
  );

  return (
    <BpkBasicMapMarker
      position={position}
      aria-label={accessibilityLabel}
      {...rest}
    >
      <button
        type="button"
        className={markerWrapperClassNames}
        onClick={onClick}
        {...buttonProps}
      >
        <div className={classNames}>
          {icon}
          <BpkText textStyle={TEXT_STYLES.label2}>{label}</BpkText>
        </div>
      </button>
    </BpkBasicMapMarker>
  );
};

export default BpkPriceMarkerV2;
