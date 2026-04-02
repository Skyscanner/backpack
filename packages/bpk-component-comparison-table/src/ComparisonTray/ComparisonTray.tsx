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

import Item from './subcomponents/Item';
import ItemPlaceholder from './subcomponents/ItemPlaceholder';
import Root from './subcomponents/Root';

import type { ComparisonTrayNamespace } from './common-types';

/**
 * ComparisonTray is a data-driven tray component for comparing up to 3 items.
 *
 * Consumer usage — only `Root` is the public API:
 *
 * @example
 * <ComparisonTray.Root
 *   items={items}
 *   onRemove={(id) => setItems(items.filter(i => i.id !== id))}
 *   onCompare={() => navigate('/compare')}
 * />
 *
 * `Item` and `ItemPlaceholder` are internal rendering primitives exported for
 * testing and extension purposes only.
 */
const ComparisonTray: ComparisonTrayNamespace = {
  Root,
  Item,
  ItemPlaceholder,
};

export default ComparisonTray;
