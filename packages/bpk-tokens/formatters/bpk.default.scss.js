import _ from 'lodash';
import { sassDocTemplate, nameTemplate, valueTemplate } from './bpk.scss';

export const variableTemplate = ({ name, value, type }) =>
  `${nameTemplate({ name })}: ${valueTemplate({ value, type })} !default;`;

export const template = ({ category, name, value, type }) =>
  `${sassDocTemplate({ category })}\n${variableTemplate({ name, value, type })}`;

export default json => _.map(json.props, prop => template(prop)).join('\n');
