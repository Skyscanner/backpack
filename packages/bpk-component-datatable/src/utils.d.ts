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

import type { ColumnType } from './common-types';
/**
 * This function abstracts the Cell and Header of the react-table API.
 * The columns API defined in Backpack will therefore be independent of the react-table columns API which consumers don't need to be aware of.
 * @param {Array} columns Array of column objects compatible with the API defined in Backpack
 * @returns {Array} An array of column objects that can be directly passed to the hooks of the react-table library
 *
 */
export declare const createColumnsSchema: (columns: ColumnType[]) => {
    [key: string]: any;
}[];
export default createColumnsSchema;
