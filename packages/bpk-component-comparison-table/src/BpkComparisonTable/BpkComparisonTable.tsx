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

import BpkComparisonTableContent from './BpkComparisonTableContent';
import BpkComparisonTableHeader from './BpkComparisonTableHeader';
import BpkComparisonTableRoot from './BpkComparisonTableRoot';

import type { BpkComparisonTableNamespace } from './common-types';

/**
 * BpkComparisonTable — side-by-side comparison modal.
 *
 * @example
 * <BpkComparisonTable.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <BpkComparisonTable.Header title="Compare cars" translations={translations} />
 *   <BpkComparisonTable.Content
 *     columns={columns}
 *     onRemove={(itemId) => handleRemove(itemId)}
 *     onAddMoreClick={() => setIsOpen(false)}
 *     translations={translations}
 *   />
 * </BpkComparisonTable.Root>
 */
const BpkComparisonTable: BpkComparisonTableNamespace = {
  Root: BpkComparisonTableRoot,
  Header: BpkComparisonTableHeader,
  Content: BpkComparisonTableContent,
};

export default BpkComparisonTable;
