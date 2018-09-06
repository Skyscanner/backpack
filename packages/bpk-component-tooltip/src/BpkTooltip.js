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
import { TransitionInitialMount, cssModules } from 'bpk-react-utils';

import STYLES from './BpkTooltip.css';
import { ARROW_ID } from './constants';

const getClassName = cssModules(STYLES);

export type TooltipProps = {
  id: string,
  children: Node,
  className: ?string,
  padded: boolean,
};

const BpkTooltip = (props: TooltipProps) => {
  const { id, children, className, padded, ...rest } = props;

  const classNames = [getClassName('bpk-tooltip')];
  const innerClassNames = [getClassName('bpk-tooltip__inner')];

  // outer classNames
  if (className) {
    classNames.push(className);
  }

  // inner classNames
  if (padded) {
    innerClassNames.push(getClassName('bpk-tooltip__inner--padded'));
  }

  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-tooltip--appear')}
      appearActiveClassName={getClassName('bpk-tooltip--appear-active')}
      transitionTimeout={200}
    >
      <section
        id={id}
        tabIndex="-1"
        role="dialog"
        className={classNames.join(' ')}
        {...rest}
      >
        <span
          id={ARROW_ID}
          className={getClassName('bpk-tooltip__arrow')}
          role="presentation"
        />
        <div className={innerClassNames.join(' ')}>{children}</div>
      </section>
    </TransitionInitialMount>
  );
};

export const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
};

export const defaultProps = {
  className: null,
  padded: true,
};

BpkTooltip.propTypes = { ...propTypes };
BpkTooltip.defaultProps = { ...defaultProps };

export default BpkTooltip;
