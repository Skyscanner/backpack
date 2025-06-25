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

/* @flow strict */

import PropTypes from 'prop-types';
// @ts-expect-error TS(2305): Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import BpkBasicMapMarker from './BpkBasicMapMarker';
import BpkIconMarkerBackground from './BpkIconMarkerBackground';
import { LatLongPropType, type LatLong } from './common-types';

// @ts-expect-error TS(2307): Cannot find module './BpkIconMarker.module.scss' o... Remove this comment to see the full error message
import STYLES from './BpkIconMarker.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  icon: Node,
  position: LatLong,
  selected: boolean,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  className: ?string,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  onClick: ?(event: SyntheticEvent<>) => mixed,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
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
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkBasicMapMarker position={position} {...rest}>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <button
        type="button"
        className={wrapperClassNames}
        // @ts-expect-error TS(2322): Type '((event: SyntheticEvent) => mixed) | null' i... Remove this comment to see the full error message
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
