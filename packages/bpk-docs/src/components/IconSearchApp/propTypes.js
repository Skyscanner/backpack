import { PropTypes } from 'react';

const icons = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
}));

export default { icons };
