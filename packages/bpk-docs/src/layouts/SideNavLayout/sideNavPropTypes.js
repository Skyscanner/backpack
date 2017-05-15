import PropTypes from 'prop-types';

export const linkPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  route: PropTypes.string,
  children: PropTypes.node.isRequired,
});

export const categoryPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(linkPropType).isRequired,
});

export const linksPropType = PropTypes.arrayOf(PropTypes.oneOfType([
  linkPropType,
  categoryPropType,
]));
