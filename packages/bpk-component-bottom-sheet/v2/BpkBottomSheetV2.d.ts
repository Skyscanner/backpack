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
import { ReactNode } from 'react';
import type { Props as BottomSheetProps } from './BpkBottomSheetV2';
export type Props = Partial<BottomSheetProps> & {
  actionText?: string;
  ariaLabelledby: string;
  children: ReactNode;
  closeLabel?: string;
  id: string;
  isOpen: boolean;
  onAction?: () => void;
  onClose: () => void;
  title?: string;
  wide?: boolean;
};
declare const BpkBottomSheetV2: ({ actionText, ariaLabelledby, children, closeLabel, id, isOpen, onAction, onClose, title, wide, ...rest }: Props) => JSX.Element;
export default BpkBottomSheetV2;
