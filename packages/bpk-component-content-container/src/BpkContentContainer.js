import PropTypes from 'prop-types';
import React from 'react';

import './bpk-content-container.scss';

const BpkContentContainer = (props) => {
  const TagName = props.tagName;
  const classNames = ['bpk-content-container'];

  if (props.bareHtml) { classNames.push('bpk-content-container--bare-html'); }

  /* eslint-disable react/no-danger-with-children */
  return (
    <TagName
      className={classNames.join(' ')}
      dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
    >
      {props.children}
    </TagName>
  );
  /* eslint-enable */
};

BpkContentContainer.propTypes = {
  children: PropTypes.node,
  dangerouslySetInnerHTML: PropTypes.shape({
    __html: PropTypes.string.isRequired,
  }),
  tagName: PropTypes.oneOf(['article', 'aside', 'div', 'main', 'section']),
  bareHtml: PropTypes.bool,
};

BpkContentContainer.defaultProps = {
  children: null,
  dangerouslySetInnerHTML: null,
  tagName: 'div',
  bareHtml: false,
};

export default BpkContentContainer;

