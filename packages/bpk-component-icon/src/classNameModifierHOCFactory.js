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
import React from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

export default (displayName, classNamesToAdd = []) =>
  (ComposedComponent) => {
    const ClassNameModifierHOC = (props) => {
      let classNames = [];
      const { className, ...rest } = props;

      if (className) {
        classNames.push(className);
      }
      classNames = classNamesToAdd.length
        ? classNames.concat(classNamesToAdd)
        : classNames;

      return <ComposedComponent className={classNames.join(' ')} {...rest} />;
    };

    ClassNameModifierHOC.propTypes = {
      className: PropTypes.string,
    };

    ClassNameModifierHOC.defaultProps = {
      className: null,
    };

    ClassNameModifierHOC.displayName = wrapDisplayName(
      ComposedComponent,
      displayName,
    );

    return ClassNameModifierHOC;
  };
