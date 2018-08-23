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
/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import { cssModules } from 'bpk-react-utils';
import omit from 'lodash/omit';
import BpkAnimateHeight from 'bpk-animate-height';
import { withAlignment } from 'bpk-component-icon';
import BpkLargeArrowDown from 'bpk-component-icon/lg/arrow-down';
import BpkLargeArrowUp from 'bpk-component-icon/lg/arrow-up';
import { lineHeightLg, iconSizeLg } from 'bpk-tokens/tokens/base.es6';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import ComponentsIcon from '../../static/components_icon.svg';
import DesignTokensIcon from '../../static/design_tokens_icon.svg';
import UsingBackpackIcon from '../../static/using_bpk_icon.svg';
import StyleGuideIcon from '../../static/style_guide_icon.svg';

import * as ROUTES from '../../constants/routes';
import STYLES from './SectionsList.scss';

const getClassName = cssModules(STYLES);

const sections = {
  USING_BACKPACK: {
    title: 'Using Backpack',
    link: ROUTES.USING_BACKPACK,
    icon: UsingBackpackIcon,
  },
  TOKENS: {
    title: 'Design tokens',
    link: ROUTES.TOKENS,
    icon: DesignTokensIcon,
  },
  STYLE_GUIDE: {
    title: 'Style guide',
    link: ROUTES.STYLE_GUIDE,
    icon: StyleGuideIcon,
  },
  COMPONENTS: {
    title: 'Components',
    link: ROUTES.COMPONENTS,
    icon: ComponentsIcon,
  },
  GITHUB: {
    title: 'GitHub',
    link: 'https://github.com/Skyscanner/backpack',
    external: true,
  },
};

const BpkAlignedArrowDown = withAlignment(
  BpkLargeArrowDown,
  lineHeightLg,
  iconSizeLg,
);

const BpkAlignedArrowUp = withAlignment(
  BpkLargeArrowUp,
  lineHeightLg,
  iconSizeLg,
);

const omitActiveSection = activeSection => omit(sections, activeSection);

type SectionListItemProps = {
  link: string,
  external: boolean,
  navigateOnClick: boolean,
  title: string,
  onClick: () => mixed,
};

const SectionListItem = (props: SectionListItemProps) => {
  if (props.external) {
    return (
      <li>
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          className={getClassName('bpkdocs-sections-list__list-item')}
        >
          {props.title}
        </a>
      </li>
    );
  }

  if (props.navigateOnClick) {
    return (
      <li>
        <Link
          to={props.link}
          className={getClassName('bpkdocs-sections-list__list-item')}
        >
          {props.title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={getClassName('bpkdocs-sections-list__list-item')}
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </li>
  );
};

type Props = {
  activeSection: string,
  onMenuToggle: () => mixed,
  onSectionChange: (activeSection: string) => mixed,
  expanded?: boolean,
  className?: string,
};

const SectionsList = (props: Props) => {
  const {
    activeSection,
    expanded,
    onMenuToggle,
    onSectionChange,
    className,
  } = props;
  const outerClassnames = [getClassName('bpkdocs-sections-list')];
  const listClassNames = [getClassName('bpkdocs-sections-list__list')];
  const Arrow = expanded ? BpkAlignedArrowUp : BpkAlignedArrowDown;
  const { icon } = sections[activeSection];

  if (expanded) {
    listClassNames.push(getClassName('bpkdocs-sections-list__list--expanded'));
  }

  if (className) {
    outerClassnames.push(className);
  }

  return (
    <div className={outerClassnames.join(' ')}>
      <div className={getClassName('bpkdocs-sections-list__heading')}>
        {icon && (
          <img
            alt={sections[activeSection].title}
            src={`/${icon}`}
            className={getClassName('bpkdocs-sections-list__heading-icon')}
          />
        )}
        <button
          type="button"
          onClick={onMenuToggle}
          className={getClassName('bpkdocs-sections-list__heading-button')}
        >
          {sections[activeSection].title}
          <Arrow
            className={getClassName(
              'bpkdocs-sections-list__heading-button-arrow',
            )}
          />
        </button>
      </div>
      <BpkAnimateHeight height={expanded ? 'auto' : 0} duration={200}>
        <ul className={getClassName('bpkdocs-sections-list__list')}>
          {Object.keys(omitActiveSection(activeSection)).map(section => (
            <BpkBreakpoint
              key={`${section}-${sections[section].title}`}
              query={BREAKPOINTS.TABLET}
            >
              {isTablet => (
                <SectionListItem
                  link={sections[section].link}
                  external={sections[section].external}
                  navigateOnClick={!isTablet}
                  title={sections[section].title}
                  onClick={() => onSectionChange(section)}
                />
              )}
            </BpkBreakpoint>
          ))}
        </ul>
      </BpkAnimateHeight>
    </div>
  );
};

SectionsList.defaultProps = {
  expanded: false,
  className: null,
};

export default SectionsList;
