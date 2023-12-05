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
import type { ReactNode } from "react";

import { Portal, cssModules } from "../../bpk-react-utils";
import { withScrim } from "../../bpk-scrim-utils";

import STYLES from './BpkBottomSheet.module.scss';
import BpkBottomSheetInner from "./BpkBottomSheetInner";


const getClassName = cssModules(STYLES);
const ScrimBpkBottomSheetInner = withScrim(BpkBottomSheetInner)

export type Props = {
  actionText?: string;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
  closeOnEscPressed?: boolean;
  closeOnScrimClick?: boolean;
  contentClassName?: string;
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
  className = '',
  closeLabel = '',
  closeOnEscPressed = false,
  closeOnScrimClick = false,
  contentClassName = '',
  id,
  isOpen,
  onAction = () => null,
  onClose,
  renderTarget,
  title = '',
  wide = false,
  ...rest
}: Props) => (
    <Portal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEscPressed={closeOnEscPressed}
      renderTarget={renderTarget}
      >
      <ScrimBpkBottomSheetInner
        id={id}
        onClose={onClose}
        closeOnScrimClick={closeOnScrimClick}
        containerClassName={getClassName('bpk-bottom-sheet--container')}
        title={title}
        className={className}
        contentClassName={contentClassName}
        closeLabel={closeLabel}
        actionText={actionText}
        onAction={onAction}
        wide={wide}
        {...rest}
      />
    </Portal>
  )

export default BpkBottomSheet
