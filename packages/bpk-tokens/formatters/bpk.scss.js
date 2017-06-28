import _ from 'lodash';

export const nameTemplate = ({ name }) => `$bpk-${_.kebabCase(name)}`;

export const valueTemplate = ({ value, type }) => (type === 'media-query' ? `"${value}"` : value);

export const variableTemplate = ({ name, value, type }) =>
  `${nameTemplate({ name })}: ${valueTemplate({ value, type })};`;

export const sassDocTemplate = ({ category }) => `/// @group ${category}`;

export const template = ({ category, name, value, type }) =>
  `${sassDocTemplate({ category })}\n${variableTemplate({ name, value, type })}`;

export default json => _.map(json.props, prop => template(prop)).join('\n');
