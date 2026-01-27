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

import BpkButton, {
  BUTTON_TYPES,
} from '../../packages/bpk-component-button';
import { withButtonAlignment } from '../../packages/bpk-component-icon';
import CloseIcon from '../../packages/bpk-component-icon/sm/close';
import EditIcon from '../../packages/bpk-component-icon/sm/edit';
import HeartIcon from '../../packages/bpk-component-icon/sm/heart';
import ShareIcon from '../../packages/bpk-component-icon/sm/share';
import TrashIcon from '../../packages/bpk-component-icon/sm/trash';
import BpkText from '../../packages/bpk-component-text/src/BpkText';
import BpkVisuallyHidden from '../../packages/bpk-component-visually-hidden';
import {
  action,
  // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
} from '../bpk-storybook-utils';

const AlignedCloseIcon = withButtonAlignment(CloseIcon);
const AlignedEditIcon = withButtonAlignment(EditIcon);
const AlignedHeartIcon = withButtonAlignment(HeartIcon);
const AlignedShareIcon = withButtonAlignment(ShareIcon);
const AlignedTrashIcon = withButtonAlignment(TrashIcon);

export const IconOnlyButtonsWithVisuallyHiddenText = () => (
  <div>
    <BpkButton
      iconOnly
      onClick={action('Close clicked')}
      type={BUTTON_TYPES.secondary}
    >
      <AlignedCloseIcon />
      <BpkVisuallyHidden>Close</BpkVisuallyHidden>
    </BpkButton>
    &nbsp;
    <BpkButton
      iconOnly
      onClick={action('Edit clicked')}
      type={BUTTON_TYPES.secondary}
    >
      <AlignedEditIcon />
      <BpkVisuallyHidden>Edit</BpkVisuallyHidden>
    </BpkButton>
    &nbsp;
    <BpkButton
      iconOnly
      onClick={action('Like clicked')}
      type={BUTTON_TYPES.secondary}
    >
      <AlignedHeartIcon />
      <BpkVisuallyHidden>Like</BpkVisuallyHidden>
    </BpkButton>
    &nbsp;
    <BpkButton
      iconOnly
      onClick={action('Share clicked')}
      type={BUTTON_TYPES.secondary}
    >
      <AlignedShareIcon />
      <BpkVisuallyHidden>Share</BpkVisuallyHidden>
    </BpkButton>
    &nbsp;
    <BpkButton
      iconOnly
      onClick={action('Delete clicked')}
      type={BUTTON_TYPES.secondary}
    >
      <AlignedTrashIcon />
      <BpkVisuallyHidden>Delete</BpkVisuallyHidden>
    </BpkButton>
  </div>
);

export const BasicExample = () => (
  <div>
    <BpkText>
      This text is visible.{' '}
      <BpkVisuallyHidden>This text is only for screen readers.</BpkVisuallyHidden>
    </BpkText>
    <BpkVisuallyHidden as="h2">Hidden heading for screen readers</BpkVisuallyHidden>
    <BpkText>Content that follows the hidden heading.</BpkText>
  </div>
);
