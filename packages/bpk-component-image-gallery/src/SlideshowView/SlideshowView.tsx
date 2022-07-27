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

import React from 'react';
import { withScrim } from 'bpk-scrim-utils';
import { Portal } from 'bpk-react-utils';

import DialogContent from './DialogContent';
import STYLES from './SlideshowView.module.scss';

const DialogContentWithScrim = withScrim(DialogContent);

type Props = Omit<
  React.ComponentProps<typeof DialogContent>,
  'dialogRef' | 'isIpad' | 'isIphone' | 'renderTarget'
>;

const SlideshowView = (props: Props) => (
  <Portal isOpen onClose={props.onClose} closeOnEscPressed>
    <DialogContentWithScrim
      getApplicationElement={() => document.getElementById('pagewrap')}
      closeOnScrimClick={false}
      containerClassName={STYLES.dialogOverlay}
      {...props}
    />
  </Portal>
);
export default SlideshowView;
