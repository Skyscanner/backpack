import find from 'lodash/find'
import groupBy from 'lodash/groupBy'
import { props as tokens } from 'backpack-tokens/tokens/base.raw.json'

import * as GROUPS from '../constants/token-groups'

const groupTokensByCategory = (tokens) => groupBy(tokens, 'category')

export const TOKEN_GROUPS = GROUPS

export const getToken = (category, name) => find(groupTokensByCategory(tokens)[ category ], { name })

export const getTokenValue = (category, name) => getToken(category, name).value

export default {
  TOKEN_GROUPS,
  getToken,
  getTokenValue
}
