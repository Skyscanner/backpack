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
