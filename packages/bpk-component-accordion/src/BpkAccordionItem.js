import React, { PropTypes } from 'react';
import AnimateHeight from 'react-animate-height';
import { withButtonAlignment } from 'bpk-component-icon';
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down';

import './bpk-accordion.scss';

const ExpandIcon = withButtonAlignment(ChevronDownIcon);

const BpkAccordionItem = (props) => {
  const iconClassNames = ['bpk-accordion__item-expand-icon'];
  const containerClassNames = ['bpk-accordion__content-container'];
  const { id, title, children, expanded, onClick, ...rest } = props;

  // Icon class names
  if (expanded) { iconClassNames.push('bpk-accordion__item-expand-icon--flipped'); }

  // Container class names
  if (!expanded) { containerClassNames.push('bpk-accordion__content-container--collapsed'); }

  const titleId = `${id}_title`;
  const contentId = `${id}_content`;

  return (
    <div id={id} {...rest}>
      <dt
        role="heading"
        aria-level="3"
        className="bpk-accordion__title"
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={onClick}
          className="bpk-accordion__toggle-button"
        >
          <span className="bpk-accordion__flex-container">
            <span className="bpk-accordion__title-text">{title}</span>
            <span className="bpk-accordion__icon-wrapper">
              <ExpandIcon className={iconClassNames.join(' ')} />
            </span>
          </span>
        </button>
      </dt>
      <AnimateHeight
        duration={200}
        height={expanded ? 'auto' : 0}
      >
        <dd
          id={contentId}
          role="region"
          aria-labelledby={titleId}
          className={containerClassNames.join(' ')}
        >
          {children}
        </dd>
      </AnimateHeight>
    </div>
  );
};

BpkAccordionItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
};

BpkAccordionItem.defaultProps = {
  expanded: false,
  onClick: () => null,
};

export default BpkAccordionItem;
