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
import BpkText from 'bpk-component-text';
import STYLES from './bpk-section-list-section.css';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  headerText: ?string,
};

const BpkSectionListSection = (props: Props) => {
  const { children, headerText, ...rest } = props;

  return (
    <section {...rest}>
      {headerText && (
        <header className={getClassName('bpk-section-list-section__header')}>
          <BpkText bold textStyle="base">
            {headerText}
          </BpkText>
        </header>
      )}
      <ul className={getClassName('bpk-section-list-section')}>
        {React.Children.map(children, child => <li>{child}</li>)}
      </ul>
    </section>
  );
};

BpkSectionListSection.propTypes = {
  children: PropTypes.node.isRequired,
  headerText: PropTypes.string,
};

BpkSectionListSection.defaultProps = {
  headerText: null,
};

export default BpkSectionListSection;
