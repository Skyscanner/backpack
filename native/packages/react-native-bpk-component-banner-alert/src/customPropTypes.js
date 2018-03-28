import { isString } from 'util';

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

export const dismissablePropType = (props, propName, componentName) => {
  if (props[propName] && props.children !== null) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${
        props[propName]
      }\` supplied to \`${componentName}\`. Banner alert cannot be expanded to show children if it is dismissable.`,
    ); // eslint-disable-line max-len
  }

  return false;
};
export const toggleExpandedButtonLabelPropType = (
  props,
  propName,
  componentName,
) => {
  if (!props[propName] && props.children !== null) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${
        props[propName]
      }\` supplied to \`${componentName}\`.`,
    ); // eslint-disable-line max-len
  }

  return false;
};
export const dismissableLabelPropType = (props, propName, componentName) => {
  if (props.dismissable && (!props[propName] || !isString(props[propName]))) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${
        props[propName]
      }\` supplied to \`${componentName}\`.`,
    ); // eslint-disable-line max-len
  }
  return false;
};
export default {
  dismissablePropType,
  toggleExpandedButtonLabelPropType,
  dismissableLabelPropType,
};
