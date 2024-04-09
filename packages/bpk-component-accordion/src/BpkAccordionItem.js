/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { Node, Element, useContext, cloneElement } from 'react';

import AnimateHeight from '../../bpk-animate-height';
import { withButtonAlignment } from '../../bpk-component-icon';
import ChevronDownIcon from '../../bpk-component-icon/sm/chevron-down';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import { BpkAccordionContext } from './BpkAccordion';

import STYLES from './BpkAccordionItem.module.scss';

const getClassName = cssModules(STYLES);

const ExpandIcon = withButtonAlignment(ChevronDownIcon);

type Props = {
  children: Node,
  id: string,
  title: string,
  expanded: boolean,
  icon: ?Element<any>,
  onClick: () => mixed,
  tagName: 'span' | 'p' | 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  textStyle: $Values<typeof TEXT_STYLES>,
};

const BpkAccordionItem = (props: Props) => {
  const { divider, onDark } = useContext(BpkAccordionContext);
  const iconClassNames = [getClassName('bpk-accordion__item-expand-icon')];
  const titleTextClassNames = [getClassName('bpk-accordion__title-text')];
  const titleClassNames = [getClassName('bpk-accordion__title')];
  const contentClassNames = [getClassName('bpk-accordion__content-container')];
  const {
    children,
    expanded,
    icon,
    id,
    onClick,
    tagName,
    textStyle,
    title,
    ...rest
  } = props;

  // if this component is passed initiallyExpanded, this makes sure it doesn't
  // end up on the node. Not ideal as our container component shouldn't be passing
  // it, but the benefit of a better container api versus this was worth it
  // $FlowFixMe[prop-missing] - see above
  delete rest.initiallyExpanded;

  if (expanded && !onDark) {
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--flipped'),
    );
    if (divider) {
      contentClassNames.push(
        getClassName('bpk-accordion__content-container--expanded'),
      );
    }
  }

  if (expanded && onDark) {
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--flipped'),
    );
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--on-dark'),
    );
    if (divider) {
      contentClassNames.push(
        getClassName('bpk-accordion__content-container--expanded-on-dark'),
      );
    }
    titleTextClassNames.push(
      getClassName('bpk-accordion__title-text--on-dark'),
    );
  }

  if (!expanded && onDark) {
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--on-dark'),
    );
    if (divider) {
      titleClassNames.push(
        getClassName('bpk-accordion__title--collapsed-on-dark'),
      );
    }
    titleTextClassNames.push(
      getClassName('bpk-accordion__title-text--on-dark'),
    );
  }

  if (!expanded && !onDark && divider) {
    titleClassNames.push(getClassName('bpk-accordion__title--collapsed'));
  }

  const contentId = `${id}_content`;
  const clonedIcon = icon
    ? cloneElement(icon, {
        className: getClassName('bpk-accordion__leading-icon'),
      })
    : null;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
    <div id={id} {...rest}>
      <dt className={titleClassNames.join(' ')}>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={onClick}
          className={getClassName('bpk-accordion__toggle-button')}
        >
          <div className={`${getClassName('bpk-accordion__flex-container')}`}>
            <div className={titleTextClassNames.join(' ')}>
              <BpkText
                textStyle={textStyle}
                tagName={tagName}
              >
                {clonedIcon}
                {title}
              </BpkText>
            </div>
            <span className={`${getClassName('bpk-accordion__icon-wrapper')} ${iconClassNames.join(' ')}`}>
              <ExpandIcon/>
            </span>
          </div>
        </button>
      </dt>
      <dd id={contentId} className={contentClassNames.join(' ')}>
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
  expanded: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  tagName: PropTypes.string,
  textStyle: PropTypes.string,
};

BpkAccordionItem.defaultProps = {
  expanded: false,
  icon: null,
  onClick: () => null,
  tagName: 'h3',
  textStyle: TEXT_STYLES.bodyDefault,
};

export default BpkAccordionItem;
