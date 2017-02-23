import _ from 'lodash';

export const tokenTemplate = ({ name, value }) => (
  `export const ${name} = "${value.replace(/"/g, '\\"')}";`
);

export const categoryTemplate = (categoryName, props) => `export const ${_.camelCase(categoryName)} = {
${_.map(props, prop => `${prop.name},`).join('\n')}
};`;

export default (json) => {
  const categories = _(json.props).map(prop => prop.category).uniq().value();

  const singleTokens = _.map(json.props, prop => tokenTemplate(prop)).join('\n');
  const groupedTokens = categories
    .map(category => categoryTemplate(
      category,
      _(json.props).filter({ category }).value()),
    ).join('\n');

  return [singleTokens, groupedTokens].join('\n');
};
