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

import { useContext, cloneElement } from 'react';
import type { ReactNode, ReactElement } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import AnimateHeight from '../../bpk-animate-height';
import { withButtonAlignment } from '../../bpk-component-icon';
import ChevronDownIcon from '../../bpk-component-icon/sm/chevron-down';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import { BpkAccordionContext } from './BpkAccordion';
import { ACCORDION_TYPES } from './common-types';

import STYLES from './BpkAccordionItem.module.scss';

const getClassName = cssModules(STYLES);

const ExpandIcon = withButtonAlignment(ChevronDownIcon);

export type BpkAccordionItemProps = {
  children: ReactNode;
  id: string;
  title?: string | ReactElement | null;
  label?: string | null;
  className?: string;
  expanded?: boolean;
  initiallyExpanded?: boolean;
  icon?: ReactElement;
  onClick?: () => void;
  tagName?: 'span' | 'p' | 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textStyle?: (typeof TEXT_STYLES)[keyof typeof TEXT_STYLES];
};

const BpkAccordionItem = (props: BpkAccordionItemProps) => {
  const { divider, onDark, type } = useContext(BpkAccordionContext);
  const itemClassNames = [getClassName('bpk-accordion__item')];
  const iconClassNames = [getClassName('bpk-accordion__item-expand-icon')];
  const titleTextClassNames = [getClassName('bpk-accordion__title-text')];
  const titleClassNames = [getClassName('bpk-accordion__title')];
  const contentClassNames = [getClassName('bpk-accordion__content-container')];
  const contentInnerClassNames = [
    getClassName('bpk-accordion__content-inner-container'),
  ];
  const toggleButtonClassNames = [getClassName('bpk-accordion__toggle-button')];

  const {
    children,
    expanded = false,
    icon = null,
    id,
    onClick = () => null,
    tagName = 'h3',
    textStyle = TEXT_STYLES.bodyDefault,
    title,
    label,
    ...rest
  } = props;

  // if this component is passed initiallyExpanded, this makes sure it doesn't
  // end up on the node. Not ideal as our container component shouldn't be passing
  // it, but the benefit of a better container api versus this was worth it
  delete rest.initiallyExpanded;

  if (divider) {
    contentInnerClassNames.push(
      getClassName('bpk-accordion__content-inner-container--with-divider'),
    );

    if (onDark) {
      itemClassNames.push(
        getClassName('bpk-accordion__item--with-divider-on-dark'),
      );
    } else {
      itemClassNames.push(getClassName('bpk-accordion__item--with-divider'));
    }
  }

  if (onDark) {
    itemClassNames.push(getClassName('bpk-accordion__item--on-dark'));
  }

  if (expanded && !onDark) {
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--flipped'),
    );
  }

  if (expanded && onDark) {
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--flipped'),
    );
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--on-dark'),
    );
    titleTextClassNames.push(
      getClassName('bpk-accordion__title-text--on-dark'),
    );
  }

  if (!expanded && onDark) {
    iconClassNames.push(
      getClassName('bpk-accordion__item-expand-icon--on-dark'),
    );

    titleTextClassNames.push(
      getClassName('bpk-accordion__title-text--on-dark'),
    );
  }

  if (type === ACCORDION_TYPES.surfaceLowContrast || type === ACCORDION_TYPES.surfaceDefault) {
    toggleButtonClassNames.push(
      getClassName('bpk-accordion__toggle-button--background-variant-padding'),
    );
  }

  const contentId = `${id}_content`;
  const clonedIcon = icon
    ? cloneElement(icon, {
        className: getClassName('bpk-accordion__leading-icon'),
      })
    : null;

  const titleItem = typeof title === 'string'
    ?  <BpkText textStyle={textStyle} tagName={tagName}>{clonedIcon} {title}</BpkText>
    : <>{clonedIcon} {title}</>;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
    <div id={id} className={itemClassNames.join(' ')} {...rest}>
      <div className={titleClassNames.join(' ')}>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={onClick}
          className={toggleButtonClassNames.join(' ')}
        >
          <div className={`${getClassName('bpk-accordion__flex-container')}`}>
            <div className={titleTextClassNames.join(' ')}>
              {titleItem}
            </div>
            <span
              className={`${getClassName(
                'bpk-accordion__icon-wrapper',
              )}`}
            >
              { label && ( <BpkText textStyle={TEXT_STYLES.label2}>{label}</BpkText> ) }
              <span className={`${iconClassNames.join(' ')}`}>
                <ExpandIcon />
              </span>
            </span>
          </div>
        </button>
      </div>
      <div id={contentId} className={contentClassNames.join(' ')}>
        <AnimateHeight duration={200} height={expanded ? 'auto' : 0}>
          <div className={contentInnerClassNames.join(' ')}>{children}</div>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default BpkAccordionItem;
