/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import { cssModules, withDefaultProps } from 'bpk-react-utils';

import STYLES from './Heading.scss';

const getClassName = cssModules(STYLES);
const className = getClassName('bpk-docs-heading');

const HEADINGS = {
  h1: {
    mobile: withDefaultProps(
      BpkText,
      {
        textStyle: 'xl',
        tagName: 'h1',
        bold: false,
        className,
      },
    ),
    other: withDefaultProps(
      BpkText,
      {
        textStyle: 'xxl',
        tagName: 'h1',
        bold: false,
        className,
      },
    ),
  },
  h2: {
    mobile: withDefaultProps(
      BpkText,
      {
        textStyle: 'lg',
        tagName: 'h2',
        bold: false,
        className,
      },
    ),
    other: withDefaultProps(
      BpkText,
      {
        textStyle: 'xl',
        tagName: 'h2',
        bold: false,
        className,
      },
    ),
  },
  h3: {
    mobile: withDefaultProps(
      BpkText,
      {
        textStyle: 'base',
        tagName: 'h3',
        bold: true,
        className,
      },
    ),
    other: withDefaultProps(
      BpkText,
      {
        textStyle: 'lg',
        tagName: 'h3',
        bold: false,
        className,
      },
    ),
  },
  h4: {
    mobile: withDefaultProps(
      BpkText,
      {
        textStyle: 'sm',
        tagName: 'h4',
        bold: true,
        className,
      },
    ),
    other: withDefaultProps(
      BpkText,
      {
        textStyle: 'base',
        tagName: 'h4',
        bold: false,
        className,
      },
    ),
  },
  h5: {
    mobile: withDefaultProps(
      BpkText,
      {
        textStyle: 'xs',
        tagName: 'h5',
        bold: true,
        className,
      },
    ),
    other: withDefaultProps(
      BpkText,
      {
        textStyle: 'sm',
        tagName: 'h5',
        bold: false,
        className,
      },
    ),
  },
  h6: {
    mobile: withDefaultProps(
      BpkText,
      {
        textStyle: 'xs',
        tagName: 'h6',
        bold: true,
        className,
      },
    ),
    other: withDefaultProps(
      BpkText,
      {
        textStyle: 'sm',
        tagName: 'h6',
        bold: false,
        className,
      },
    ),
  },
};

const Heading = (props) => {
  const { level, ...rest } = props;

  const Component = HEADINGS[level];

  if (!Component) {
    return null;
  }

  return (
    <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
      {isMobile => Component[isMobile ? 'mobile' : 'other']({ ...rest })}
    </BpkBreakpoint>
  );
};


Heading.propTypes = {
  level: PropTypes.oneOf(Object.keys(HEADINGS)).isRequired,
};


export default Heading;
