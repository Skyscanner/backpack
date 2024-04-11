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

import XlSpinner from '@skyscanner/bpk-svgs/dist/js/spinners/xl';

import { cssModules } from '../../bpk-react-utils';

import SPINNER_TYPES from './spinnerTypes';

import STYLES from './BpkSpinner.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  type: $Keys<typeof SPINNER_TYPES>,
  className: ?string,
};

const BpkExtraLargeSpinner = (props: Props) => {
  const { className, type, ...rest } = props;
  const classNames = getClassName(
    'bpk-spinner',
    'bpk-spinner--extra-large',
    `bpk-spinner--${type}`,
    className,
  );

  return (
    <XlSpinner
      // TODO: className to be removed
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={classNames}
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      {...rest}
    />
  );
};

BpkExtraLargeSpinner.propTypes = {
  type: PropTypes.oneOf(Object.keys(SPINNER_TYPES)),
  className: PropTypes.string,
};

BpkExtraLargeSpinner.defaultProps = {
  type: SPINNER_TYPES.dark,
  className: null,
};

export default BpkExtraLargeSpinner;
