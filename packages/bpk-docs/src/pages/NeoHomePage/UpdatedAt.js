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
import React from 'react';
import PropTypes from 'prop-types';

import BpkText from 'bpk-component-text';

const formatDate = ((): (Date => string) => {
  if (typeof window === 'object' && window.Intl && window.Intl.DateTimeFormat) {
    const formatter = new window.Intl.DateTimeFormat();
    return (date: Date): string => formatter.format(date);
  }

  return (date: Date): string => date.toLocaleDateString();
})();

type Props = {
  date: Date,
  className: ?string,
};

const UpdatedAt = (props: Props) => (
  <BpkText className={props.className} textStyle="base">
    Updated {formatDate(props.date)}
  </BpkText>
);

UpdatedAt.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  className: PropTypes.string,
};

UpdatedAt.defaultProps = {
  className: null,
};

export default UpdatedAt;
