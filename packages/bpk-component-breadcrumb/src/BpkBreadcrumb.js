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

import STYLES from './BpkBreadcrumb.css';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  label: string,
};

const BpkBreadcrumb = (props: Props) => {
  const { children, label, ...rest } = props;

  return (
    <nav aria-label={label} {...rest}>
      <ol className={getClassName('bpk-breadcrumb')}>{children}</ol>
    </nav>
  );
};

BpkBreadcrumb.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default BpkBreadcrumb;
