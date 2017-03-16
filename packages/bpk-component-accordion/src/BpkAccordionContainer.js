import React, { PropTypes } from 'react';

import BpkAccordionContainerSingle from './BpkAccordionContainerSingle';
import BpkAccordionContainerMultiple from './BpkAccordionContainerMultiple';

const BpkAccordionContainer = (props) => {
  const { allowMultiple, ...rest } = props;

  const Component = allowMultiple
    ? BpkAccordionContainerMultiple
    : BpkAccordionContainerSingle;

  return <Component {...rest} />;
};

BpkAccordionContainer.propTypes = {
  allowMultiple: PropTypes.bool,
};

BpkAccordionContainer.defaultProps = {
  allowMultiple: false,
};

export default BpkAccordionContainer;
