import React, { PropTypes } from 'react';

import './presentation-block.scss';

const PresentationBlock = ({ children }) => (
  <section className="bpkdocs-presentation-block">
    <div className="bpkdocs-presentation-block__container">{children}</div>
  </section>
);

PresentationBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PresentationBlock;
