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

import PropTypes from 'prop-types';
import type { ReactElement } from 'react';
import { Children } from 'react';

import { SPINNER_TYPES } from "..";
import { cssModules } from '../../bpk-react-utils';

import STYLES from './SpinnerLayout.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Array<ReactElement<any, any>> | ReactElement<any, any> // Expect a single or array of React elements
};

const SpinnerLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className={getClassName('bpk-spinner-layout')}>
      {Children.map(children, (child) => {
        const classNames = [getClassName('bpk-spinner-layout__spinner')];

        if (child.props.type === SPINNER_TYPES.light) {
          classNames.push(getClassName('bpk-spinner-layout__spinner--light'));
        }

        return <div className={classNames.join(' ')}>{child}</div>;
      })}
    </div>
  );
};

SpinnerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SpinnerLayout;
