/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import React from 'react';
import AnimateHeight from 'bpk-animate-height';
import { withButtonAlignment } from 'bpk-component-icon';
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-accordion-item.css';

const getClassName = cssModules(STYLES);

const ExpandIcon = withButtonAlignment(ChevronDownIcon);

const BpkAccordionItem = props => {
  const iconClassNames = [getClassName('bpk-accordion__item-expand-icon')];
  const { id, title, children, expanded, onClick, ...rest } = props;

  // if this component is passed initiallyExpanded, this makes sure it doesn't
  // end up on the node. Not ideal as our container component shouldn't be passing
  // it, but the benefit of a better container api versus this was worth it
  delete rest.initiallyExpanded;

  if (expanded) {
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--flipped'),
    );
  }

  const titleId = `${id}_title`;
  const contentId = `${id}_content`;

  return (
    <div id={id} {...rest}>
      <dt
        role="heading"
        aria-level="3"
        className={getClassName('bpk-accordion__title')}
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={onClick}
          className={getClassName('bpk-accordion__toggle-button')}
        >
          <span className={getClassName('bpk-accordion__flex-container')}>
            <span className={getClassName('bpk-accordion__title-text')}>
              {title}
            </span>
            <span className={getClassName('bpk-accordion__icon-wrapper')}>
              <ExpandIcon className={iconClassNames.join(' ')} />
            </span>
          </span>
        </button>
      </dt>
      <AnimateHeight duration={200} height={expanded ? 'auto' : 0}>
        <dd
          id={contentId}
          role="region"
          aria-labelledby={titleId}
          className={getClassName('bpk-accordion__content-container')}
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
