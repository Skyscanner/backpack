/* @flow strict */

import { type Node } from 'react';
import PropTypes from 'prop-types';

export type Props = {
  children: Node,
  href: ?string,
  className: ?string,
  disabled: boolean,
  onClick: ?(event: SyntheticEvent<>) => mixed,
  submit: boolean,
  large: boolean,
  iconOnly: boolean,
  blank: boolean,
  rel: ?string,
};

const propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  large: PropTypes.bool,
  iconOnly: PropTypes.bool,
  blank: PropTypes.bool,
  rel: PropTypes.string,
};

const defaultProps = {
  href: null,
  className: null,
  disabled: false,
  onClick: null,
  submit: false,
  large: false,
  iconOnly: false,
  blank: false,
  rel: null,
};

export { propTypes, defaultProps };
