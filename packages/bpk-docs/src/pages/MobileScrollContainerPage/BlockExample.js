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

import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';

import STYLES from './BlockExample.css';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  alternate: boolean,
};

const BlockExampleItem = (props: Props) => {
  const classNames = ['bpkdocs-block-example__item'];

  if (props.alternate) {
    classNames.push('bpkdocs-block-example__item--alternate');
  }

  return (
    <div className={classNames.map(getClassName).join(' ')}>
      {props.children}
    </div>
  );
};

/* eslint-disable react/no-array-index-key */
const BlockExample = () => (
  <BpkMobileScrollContainer>
    <div className={getClassName('bpkdocs-block-example')}>
      {new Array(10).fill().map((props, index) => (
        <BlockExampleItem key={index} alternate={index % 2 === 0}>
          {index}
        </BlockExampleItem>
      ))}
    </div>
  </BpkMobileScrollContainer>
);
/* eslint-enable react/no-array-index-key */

export default BlockExample;
