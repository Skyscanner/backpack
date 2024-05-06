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

import BpkButtonBase, { cssModules } from './BpkButtonBase';
import {
  type Props as CommonProps,
  defaultProps,
  propTypes,
} from './common-types';

import STYLES from './BpkButtonLink.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  ...CommonProps,
};
const BpkButtonLink = (props: Props) => {
  const { className, large, ...rest } = props;

  const classNames = [getClassName('bpk-button--link')];

  if (large) {
    classNames.push(getClassName('bpk-button--link-large'));
  }

  if (className) {
    classNames.push(className);
  }
  const classNamesFinal = classNames.join(' ');

  return (
    <BpkButtonBase 
    // TODO: className to be removed
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    className={classNamesFinal} large={large} 
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    {...rest} />
  );
};

BpkButtonLink.propTypes = { ...propTypes };
BpkButtonLink.defaultProps = { ...defaultProps };

export default BpkButtonLink;
