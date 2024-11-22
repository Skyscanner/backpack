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
import { createContext } from 'react';
import type { Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkAccordion.module.scss';

const getClassName = cssModules(STYLES);

type Props = { children: Node, className: ?string };

export const BpkAccordionContext = createContext({
  onDark: false,
  divider: true,
});

const BpkAccordion = (props: Props) => {
  const { children, className, divider, onDark, ...rest } = props;

  const classNames = getClassName(
    'bpk-accordion',
    onDark && 'bpk-accordion--on-dark',
    className,
  );

  return (
    <BpkAccordionContext.Provider value={{ onDark, divider }}>
      {/* // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md */}
      <div className={classNames} {...rest}>
        {children}
      </div>
    </BpkAccordionContext.Provider>
  );
};

BpkAccordion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onDark: PropTypes.bool,
  divider: PropTypes.bool,
};

BpkAccordion.defaultProps = {
  className: null,
  onDark: false,
  divider: true,
};

export default BpkAccordion;
