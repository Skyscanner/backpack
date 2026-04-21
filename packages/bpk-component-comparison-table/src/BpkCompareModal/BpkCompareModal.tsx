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

import BpkCompareModalContent from './BpkCompareModalContent';
import BpkCompareModalHeader from './BpkCompareModalHeader';
import BpkCompareModalRoot from './BpkCompareModalRoot';

import type { BpkCompareModalNamespace } from './common-types';

/**
 * BpkCompareModal — side-by-side comparison modal.
 *
 * Public API: BpkCompareModal.Root + BpkCompareModal.Header + BpkCompareModal.Content
 *
 * @example
 * const translations = {
 *   closeLabel: 'Close',
 *   removeLabel: 'Remove',
 *   bestTagLabel: 'Best',
 *   addMoreDescription: '...',
 *   addMoreLinkText: 'Add more',
 * };
 *
 * <BpkCompareModal.Root isOpen={isOpen} onClose={() => setOpen(false)}>
 *   <BpkCompareModal.Header title="Compare cars" translations={translations}>
 *     <BpkAiBlurb.Root>...</BpkAiBlurb.Root>
 *   </BpkCompareModal.Header>
 *   <BpkCompareModal.Content
 *     columns={columns}
 *     onRemove={(itemId) => handleRemove(itemId)}
 *     onAddMoreClick={() => setOpen(false)}
 *     translations={translations}
 *   />
 * </BpkCompareModal.Root>
 */
const BpkCompareModal: BpkCompareModalNamespace = {
  Root: BpkCompareModalRoot,
  Header: BpkCompareModalHeader,
  Content: BpkCompareModalContent,
};

export default BpkCompareModal;
