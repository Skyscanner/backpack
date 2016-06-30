import find from 'lodash/find'
import groupBy from 'lodash/groupBy'
import { props as tokens } from 'backpack-tokens/tokens/base.raw.json'

const groupTokensByCategory = (tokens) => groupBy(tokens, 'category')

const tokensByCategory = groupTokensByCategory(tokens)

export const getToken = (category, name) => find(tokensByCategory[ category ], { name })

export default { getToken }
