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

import { cssModules } from '../../bpk-react-utils';

import BpkBasicMapMarker from './BpkBasicMapMarker';
import BpkIconMarkerBackground from './BpkIconMarkerBackground';
import { LatLongPropType, type LatLong } from './common-types';

import STYLES from './BpkIconMarker.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  icon: ReactNode,
  position: LatLong,
  selected: boolean,
  className: string | null,
  onClick: ?(event: SyntheticEvent<>) => mixed,
  buttonProps: ?{ [string]: any },
};

const BpkIconMarker = (props: Props) => {
  const { buttonProps, className, icon, onClick, position, selected, ...rest } =
    props;

  const wrapperClassNames = getClassName(
    'bpk-icon-marker__wrapper',
    selected && 'bpk-icon-marker__wrapper--selected',
    className,
  );

  const iconClassNames = getClassName(
    'bpk-icon-marker__icon',
    onClick && 'bpk-icon-marker__icon--interactive',
    selected && 'bpk-icon-marker__icon--selected',
  );

  return (
    <BpkBasicMapMarker position={position} {...rest}>
      { }
      <button
        type="button"
        className={wrapperClassNames}
        onClick={onClick}
        {...buttonProps}
      >
        <BpkIconMarkerBackground
          interactive={onClick !== null}
          selected={selected}
        />
        <div className={iconClassNames}>{icon}</div>
      </button>
    </BpkBasicMapMarker>
  );
};
export default BpkIconMarker;
