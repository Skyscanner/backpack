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
// @ts-expect-error TS(2305): Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';
import { Children } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

// @ts-expect-error TS(2307): Cannot find module './BpkSectionListSection.module... Remove this comment to see the full error message
import STYLES from './BpkSectionListSection.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  headerText: ?string,
};

const BpkSectionListSection = (props: Props) => {
  const { children, headerText, ...rest } = props;

  return (
    <section {...rest}>
      {headerText && (
        <header className={getClassName('bpk-section-list-section__header')}>
          <BpkText textStyle={TEXT_STYLES.label1}>{headerText}</BpkText>
        </header>
      )}
      <ul className={getClassName('bpk-section-list-section')}>
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
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
