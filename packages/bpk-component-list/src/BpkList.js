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
import React, { type Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkList.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  ordered: boolean,
  className: ?string,
  ariaLabel: ?string,
  ariaLabelledby: ?string,
  title: ?string,
};

const BpkList = (props: Props) => {
  const { ariaLabel, ariaLabelledby, children, className, ordered, title } =
    props;

  const TagName: any = ordered ? 'ol' : 'ul';
  const classNames: string = getClassName('bpk-list', className);

  return (
    <TagName
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      title={title}
      className={classNames}
    >
      {children}
    </TagName>
  );
};

BpkList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  ordered: PropTypes.bool,
  className: PropTypes.string,
};

BpkList.defaultProps = {
  ordered: false,
  className: null,
  ariaLabel: null,
  ariaLabelledby: null,
  title: null,
};

export default BpkList;
