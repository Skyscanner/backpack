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

import React, { type Node, type Element } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import STYLES from './BpkNavigationBar.module.scss';

const getClassNames = cssModules(STYLES);

export type Props = {
  id: string,
  title: Node,
  className: ?string,
  leadingButton: ?Element<any>,
  trailingButton: ?Element<any>,
  sticky: ?boolean,
};

const cloneWithClass = (elem: Element<any>, newStyle: string) => {
  const className = getClassNames(elem.props.className, newStyle);
  return React.cloneElement(elem, { ...elem.props, className });
};

const BpkNavigationBar = (props: Props) => {
  const {
    className,
    id,
    leadingButton,
    sticky,
    title,
    trailingButton,
    ...rest
  } = props;

  // If the title is a component that sets its own id we want the aria-labelledby on the nav to match this so it can find the element
  // Otherwise if its just a string we set the id on the title component.
  const titleId =
    typeof title === 'string' ? `${id}-bpk-navigation-bar-title` : id;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <nav
      aria-labelledby={titleId}
      className={getClassNames(
        'bpk-navigation-bar',
        sticky && 'bpk-navigation-bar__sticky',
        className,
      )}
      {...rest}
    >
      {leadingButton &&
        cloneWithClass(leadingButton, 'bpk-navigation-bar__leading-item')}
      {typeof title === 'string' ? (
        <BpkText
          id={titleId}
          textStyle={TEXT_STYLES.heading5}
          className={getClassNames('bpk-navigation-bar__title')}
        >
          {title}
        </BpkText>
      ) : (
        title
      )}
      {trailingButton &&
        cloneWithClass(trailingButton, 'bpk-navigation-bar__trailing-item')}
    </nav>
  );
};

BpkNavigationBar.propTypes = {
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
  leadingButton: PropTypes.element,
  trailingButton: PropTypes.element,
  sticky: PropTypes.bool,
};

BpkNavigationBar.defaultProps = {
  className: null,
  leadingButton: null,
  trailingButton: null,
  sticky: false,
};

export default BpkNavigationBar;
