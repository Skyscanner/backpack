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

import PropTypes from 'prop-types';
import type { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react';


import { cssModules } from '../../bpk-react-utils';

import BpkBasicMapMarker from './BpkBasicMapMarker';
import BpkIconMarkerBackground from './BpkIconMarkerBackground';
import { LatLongPropType } from './common-types';

import type { LatLong } from './common-types';

import STYLES from './BpkIconMarker.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  icon: ReactNode;
  position: LatLong;
  className?: string | null;
  onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | null;
  selected?: boolean;
  buttonProps?: (ButtonHTMLAttributes<HTMLButtonElement> & { [key: `data-${string}`]: string }) | null;
  [key: string]: unknown;
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
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkBasicMapMarker position={position} {...rest}>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <button
        type="button"
        className={wrapperClassNames}
        onClick={onClick ?? undefined}
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

BpkIconMarker.propTypes = {
  icon: PropTypes.node.isRequired,
  position: LatLongPropType.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  buttonProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkIconMarker.defaultProps = {
  className: null,
  onClick: null,
  selected: false,
  buttonProps: null,
};

export default BpkIconMarker;
