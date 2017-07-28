/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import BpkText, { withTextStyle } from 'bpk-component-text';

import { cssModules } from 'bpk-react-utils';

import STYLES from './Heading.scss';

const getClassName = cssModules(STYLES);

const HEADINGS = {
  h1: withTextStyle(BpkText, 'xxl', 'h1', ['bpk-docs-heading', 'bpk-docs-heading--h1'].map(getClassName).join(' ')),
  h2: withTextStyle(BpkText, 'xl', 'h2', ['bpk-docs-heading', 'bpk-docs-heading--h2'].map(getClassName).join(' ')),
  h3: withTextStyle(BpkText, 'lg', 'h3', ['bpk-docs-heading', 'bpk-docs-heading--h3'].map(getClassName).join(' ')),
  h4: withTextStyle(BpkText, 'base', 'h4', ['bpk-docs-heading', 'bpk-docs-heading--h4'].map(getClassName).join(' ')),
  h5: withTextStyle(BpkText, 'base', 'h5', ['bpk-docs-heading', 'bpk-docs-heading--h5'].map(getClassName).join(' ')),
  h6: withTextStyle(BpkText, 'base', 'h6', ['bpk-docs-heading', 'bpk-docs-heading--h6'].map(getClassName).join(' ')),
};

const Heading = (props) => {
  const { level, ...rest } = props;

  return HEADINGS[level]({ ...rest });
};

Heading.propTypes = {
  level: PropTypes.oneOf(Object.keys(HEADINGS)),
};


export default Heading;
