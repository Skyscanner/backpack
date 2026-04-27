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
import type { ReactNode } from 'react';

import { getDataComponentAttribute } from '../../bpk-react-utils';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkOverlayView from './BpkOverlayView';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { LatLongPropType, type LatLong } from './common-types';

type Props = {
  children: ReactNode,
  position: LatLong,
};

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -height,
});

// A basic map marker that positions arbitrary content at a given latitude/longitude on a map.
// The marker is anchored at the bottom-centre of its content, making it suitable for pin-style overlays.
const BpkBasicMapMarker = (props: Props) => {
  const { children, position, ...rest } = props;

  return (
    <BpkOverlayView
      position={position}
      getPixelPositionOffset={getPixelPositionOffset}
      {...getDataComponentAttribute('BasicMapMarker')}
      {...rest}
    >
      {children}
    </BpkOverlayView>
  );
};

BpkBasicMapMarker.propTypes = {
  children: PropTypes.node.isRequired,
  position: LatLongPropType.isRequired,
};

export default BpkBasicMapMarker;
