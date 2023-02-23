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
import { type Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCardWrapper.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  card: Node,
  className: ?string,
  backgroundColor: string,
  header: Node,
};

const BpkCardWrapper = (props: Props) => {
  const { backgroundColor, card, className, header } = props;

  const classNames = getClassName('bpk-card-wrapper', className);

  return (
    <div
      className={classNames}
      style={{
        '--background-color': backgroundColor,
      }}
    >
      <div className={getClassName('bpk-card-wrapper--header')}>{header}</div>
      <div className={getClassName('bpk-card-wrapper--content')}>{card}</div>
    </div>
  );
};

BpkCardWrapper.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  card: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.node.isRequired,
};

BpkCardWrapper.defaultProps = {
  className: null,
};

export default BpkCardWrapper;
