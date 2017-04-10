import React, { PropTypes } from 'react';

import BpkCardSimple from './BpkCardSimple';
import BpkCardTicket from './BpkCardTicket';

const BpkCard = ({ stub, ...rest }) => (
  stub
    ? <BpkCardTicket stub={stub} {...rest} />
    : <BpkCardSimple {...rest} />
);

BpkCard.propTypes = {
  stub: PropTypes.node,
};

BpkCard.defaultProps = {
  stub: null,
};

export default BpkCard;
