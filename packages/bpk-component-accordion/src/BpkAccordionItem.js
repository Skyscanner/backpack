/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* @flow strict */

import PropTypes from 'prop-types';
import React, { type Node, type Element } from 'react';
import AnimateHeight from 'bpk-animate-height';
import { withButtonAlignment } from 'bpk-component-icon';
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down';
import BpkText, {
  TEXT_STYLES,
  WEIGHT_STYLES as weights,
} from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkAccordionItem.scss';

const getClassName = cssModules(STYLES);

const ExpandIcon = withButtonAlignment(ChevronDownIcon);

export const WEIGHT_STYLES = weights;

type Props = {
  children: Node,
  id: string,
  title: string,
  weight: $Keys<typeof WEIGHT_STYLES>,
  expanded: boolean,
  icon: ?Element<any>,
  onClick: () => mixed,
  tagName: 'span' | 'p' | 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  textStyle: $Keys<typeof TEXT_STYLES>,
};

const BpkAccordionItem = (props: Props) => {
  const iconClassNames = [getClassName('bpk-accordion__item-expand-icon')];
  const {
    id,
    title,
    children,
    weight,
    expanded,
    icon,
    onClick,
    tagName,
    textStyle,
    ...rest
  } = props;

  // if this component is passed initiallyExpanded, this makes sure it doesn't
  // end up on the node. Not ideal as our container component shouldn't be passing
  // it, but the benefit of a better container api versus this was worth it
  // $FlowFixMe[prop-missing] - see above
  delete rest.initiallyExpanded;

  if (expanded) {
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--flipped'),
    );
  }

  const contentId = `${id}_content`;
  const clonedIcon = icon
    ? React.cloneElement(icon, {
        className: getClassName('bpk-accordion__leading-icon'),
      })
    : null;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
    <div id={id} {...rest}>
      <dt
        aria-level="3"
        aria-labelledby={id}
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
            <BpkText
              textStyle={textStyle}
              tagName={tagName}
              className={getClassName('bpk-accordion__title-text')}
              weight={weight}
            >
              {clonedIcon}
              {title}
            </BpkText>
            <span className={getClassName('bpk-accordion__icon-wrapper')}>
              <ExpandIcon className={iconClassNames.join(' ')} />
            </span>
          </span>
        </button>
      </dt>
      <dd
        id={contentId}
        aria-labelledby={contentId}
        className={getClassName('bpk-accordion__content-container')}
      >
        <AnimateHeight duration={200} height={expanded ? 'auto' : 0}>
          {children}
        </AnimateHeight>
      </dd>
    </div>
  );
};

BpkAccordionItem.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  weight: PropTypes.string,
  expanded: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  tagName: PropTypes.string,
  textStyle: PropTypes.string,
};

BpkAccordionItem.defaultProps = {
  weight: WEIGHT_STYLES.regular,
  expanded: false,
  icon: null,
  onClick: () => null,
  tagName: 'span',
  textStyle: TEXT_STYLES.base,
};

export default BpkAccordionItem;
