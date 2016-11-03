import _ from 'lodash'

export const nameTemplate = ({ name }) => `$bpk-${_.kebabCase(name)}`

export const variableTemplate = ({ name, value }) => `${nameTemplate({ name })}: ${value};`

export const sassDocTemplate = ({ category }) => `/// @group ${category}`

export const template = ({ category, name, value }) => {
  return `${sassDocTemplate({ category })}\n${variableTemplate({ name, value })}`
}

export default json => {
  return _.map(json.props, prop => template(prop)).join('\n')
}
