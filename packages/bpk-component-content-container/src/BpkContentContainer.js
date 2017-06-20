import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-content-container.scss';

const getClassName = cssModules(STYLES);

const BpkContentContainer = (props) => {
  const TagName = props.tagName;
  const classNames = [getClassName('bpk-content-container')];

  if (props.bareHtml) { classNames.push(getClassName('bpk-content-container--bare-html')); }

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

