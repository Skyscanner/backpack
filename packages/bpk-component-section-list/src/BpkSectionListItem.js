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

import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkLargeChevronRightIcon from 'bpk-component-icon/lg/chevron-right';
import { withRtlSupport } from 'bpk-component-icon';

import STYLES from './bpk-section-list-item.css';

const BpkLargeChevronRightIconWithRtlSupport = withRtlSupport(
  BpkLargeChevronRightIcon,
);

const getClassName = cssModules(STYLES);

type Props = {
  blank: boolean,
  children: Node,
  className: ?string,
  href: ?string,
  onClick: ?(event: SyntheticEvent<>) => void,
};

const BpkSectionListItem = (props: Props) => {
  const { blank, children, className, href, onClick, ...rest } = props;
  const classNames = [
    getClassName(
      'bpk-section-list-item',
      (href || onClick) && 'bpk-section-list-item--interactive',
      className,
    ),
  ];

  if (href) {
    const target = blank ? '_blank' : null;
    return (
      <a
        href={href}
        target={target}
        onClick={onClick}
        className={classNames.join(' ')}
        {...rest}
      >
        {children}
        <BpkLargeChevronRightIconWithRtlSupport
          className={getClassName('bpk-section-list-item__chevron')}
        />
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames.join(' ')}
        {...rest}
      >
        {children}
        <BpkLargeChevronRightIconWithRtlSupport
          className={getClassName('bpk-section-list-item__chevron')}
        />
      </button>
    );
  }

  return (
    <div className={classNames.join(' ')} {...rest}>
      {children}
    </div>
  );
};

BpkSectionListItem.propTypes = {
  children: PropTypes.node.isRequired,
  blank: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

BpkSectionListItem.defaultProps = {
  blank: false,
  className: null,
  href: null,
  onClick: null,
};

export default BpkSectionListItem;
