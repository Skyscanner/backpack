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

import BpkCompareModalColumn from './BpkCompareModalColumn';
import BpkCompareModalColumnHeader from './BpkCompareModalColumnHeader';
import BpkCompareModalContent from './BpkCompareModalContent';
import BpkCompareModalHeader from './BpkCompareModalHeader';
import BpkCompareModalRoot from './BpkCompareModalRoot';
import BpkCompareModalRows from './BpkCompareModalRows';

import type { BpkCompareModalNamespace } from './common-types';

/**
 * BpkCompareModal — side-by-side comparison modal.
 *
 * Public API: Root · Header · Content · Column · ColumnHeader · Rows
 *
 * Component owns: table layout, scroll animation, column header animations,
 * remove button, placeholder columns, row alignment.
 *
 * Consumer owns: mapping data to Column sub-components, cell content,
 * header slot content, onRemove and onAddMoreClick callbacks.
 *
 * @example
 * <BpkCompareModal.Root isOpen={isOpen} onClose={() => setOpen(false)}>
 *   <BpkCompareModal.Header title="Compare cars" translations={translations}>
 *     <BpkAiBlurb.Root>...</BpkAiBlurb.Root>
 *   </BpkCompareModal.Header>
 *   <BpkCompareModal.Content onAddMoreClick={() => setOpen(false)} translations={translations}>
 *     {columns.map((column) => (
 *       <BpkCompareModal.Column
 *         key={column.itemId}
 *         itemId={column.itemId}
 *         onRemove={() => handleRemove(column.itemId)}
 *         removeA11yLabel={column.removeA11yLabel}
 *       >
 *         <BpkCompareModal.ColumnHeader
 *           imageSrc={column.imageSrc}
 *           imageAlt={column.imageAlt}
 *           bestTag={column.bestTag}
 *           header={column.header}
 *         />
 *         <BpkCompareModal.Rows rows={column.rows} />
 *       </BpkCompareModal.Column>
 *     ))}
 *   </BpkCompareModal.Content>
 * </BpkCompareModal.Root>
 */
const BpkCompareModal: BpkCompareModalNamespace = {
  Root: BpkCompareModalRoot,
  Header: BpkCompareModalHeader,
  Content: BpkCompareModalContent,
  Column: BpkCompareModalColumn,
  ColumnHeader: BpkCompareModalColumnHeader,
  Rows: BpkCompareModalRows,
};

export default BpkCompareModal;
