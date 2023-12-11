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
import { useState, type ReactNode } from "react";

import { Portal, cssModules } from "../../bpk-react-utils";
import { withScrim } from "../../bpk-scrim-utils";

import STYLES from './BpkBottomSheet.module.scss';
import BpkBottomSheetInner from "./BpkBottomSheetInner";


const getClassName = cssModules(STYLES);
const ScrimBpkBottomSheetInner = withScrim(BpkBottomSheetInner)

export type Props = {
  actionText?: string;
  children: ReactNode;
  closeLabel?: string;
  closeOnEscPressed?: boolean;
  closeOnScrimClick?: boolean;
  id: string;
  isOpen: boolean;
  onAction?: () => void;
  onClose: () => void;
  title?: string;
  wide?: boolean;
  getApplicationElement: () => HTMLElement | null;
  renderTarget?: null | HTMLElement | (() => null | HTMLElement);
}

const BpkBottomSheet = ({
  actionText = '',
  closeLabel = '',
  closeOnEscPressed = false,
  closeOnScrimClick = false,
  id,
  isOpen,
  onAction = () => null,
  onClose,
  renderTarget,
  title = '',
  wide = false,
  ...rest
}: Props) => {
  const [ exiting, setExitting ] = useState(false);
  const handleClose = () => {
    setExitting(true)
    setTimeout(() => {
      onClose()
      setExitting(false)
    }, 240)
  }
  return  <Portal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnEscPressed={closeOnEscPressed}
      renderTarget={renderTarget}
      >
      <ScrimBpkBottomSheetInner
        id={id}
        onClose={handleClose}
        closeOnScrimClick={closeOnScrimClick}
        containerClassName={getClassName('bpk-bottom-sheet--container')}
        title={title}
        closeLabel={closeLabel}
        actionText={actionText}
        onAction={onAction}
        wide={wide}
        exiting={exiting}
        {...rest}
      />
    </Portal>
}

export default BpkBottomSheet
