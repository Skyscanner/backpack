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
import { type Node } from 'react';
import PropTypes from 'prop-types';

export const HEADER_ICON_TYPES = {
  primary: 'primary',
  warning: 'warning',
  destructive: 'destructive',
};

export type DialogInnerProps = {
  ariaLabel: string,
  id: string,
  children: Node,
  dialogRef: (ref: ?HTMLElement) => void,
  className: ?string,
  contentClassName?: ?string,
  flare: boolean,
  flareClassName: ?string,
};

export const dialogInnerPropTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  dialogRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  flare: PropTypes.bool,
  flareClassName: PropTypes.string,
  withIcon: PropTypes.bool,
};

export const dialogInnerDefaultProps = {
  className: null,
  flare: false,
  flareClassName: null,
  withIcon: false,
};

// Please remove this type when `withScrim` is flow-typed
type ScrimProps = {
  dialogRef: () => ?HTMLElement,
};

export type Props = {
  // The `withScrim` HOC satisfies some of the ModalDialogs required
  // props but it's not flow typed yet so this
  // diff will suffice for now.
  ...$Exact<$Diff<DialogInnerProps, ScrimProps>>,
  isOpen: boolean,
  renderTarget: ?() => ?HTMLElement,
  onClose: (event: SyntheticEvent<>) => void | null,
  closeLabel: string,
  dismissible: boolean,
  headerIcon: ?Node,
  headerIconType: $Keys<typeof HEADER_ICON_TYPES>,
};

const { dialogRef, ...newDialogPropTypes } = dialogInnerPropTypes;

export const propTypes = {
  ...newDialogPropTypes,
  isOpen: PropTypes.bool.isRequired,
  renderTarget: PropTypes.func,
  closeLabel: PropTypes.string,
  onClose: PropTypes.func,
  dismissible: PropTypes.bool,
  headerIcon: PropTypes.node,
  headerIconType: PropTypes.oneOf(Object.keys(HEADER_ICON_TYPES)),
};

export const defaultProps = {
  ...dialogInnerDefaultProps,
  renderTarget: null,
  closeLabel: '',
  onClose: () => null,
  dismissible: true,
  headerIcon: null,
  headerIconType: HEADER_ICON_TYPES.primary,
};
