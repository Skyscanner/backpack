import find from 'lodash/find'
import filter from 'lodash/filter'
import groupBy from 'lodash/groupBy'
import { props as tokens } from 'backpack-tokens/tokens/base.raw.json'

import * as TOKEN_CATEGORIES from '../constants/token-categories'

const groupTokensByCategory = (tokens) => groupBy(tokens, 'category')

export const tokenCategories = TOKEN_CATEGORIES
export const getTokens = (category, predicate) => filter(groupTokensByCategory(tokens)[ category ], predicate || null)
export const getToken = (category, name) => find(getTokens(category), { name })
export const getTokenValue = (category, name) => getToken(category, name).value
export default { tokenCategories, getTokens, getToken, getTokenValue }
