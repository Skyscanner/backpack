import _ from 'lodash'
import { sassDocTemplate, nameTemplate } from './bpk.scss'

export const variableTemplate = ({ name, value }) => `${nameTemplate({name})}: ${value} !default;`

export const template = ({ category, name, value }) => {
  return `${sassDocTemplate({ category })}\n${variableTemplate({ name, value })}`
}

export default json => {
  return _.map(json.props, prop => template(prop)).join('\n')
}
