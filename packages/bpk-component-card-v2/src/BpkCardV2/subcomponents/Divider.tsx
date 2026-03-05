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

import { cssModules, getDataComponentAttribute } from '../../../../bpk-react-utils';

import STYLES from '../BpkCardV2.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Divider between Primary and Secondary in split layout.
 *
 * Renders as a horizontal line on mobile and a vertical line on desktop.
 * Styled via SCSS for breakpoint handling.
 *
 * @returns {JSX.Element} Divider component
 */
const Divider = () => (
  <div className={getClassName('bpk-card-v2__divider')} {...getDataComponentAttribute('CardV2.Divider')} />
);

Divider.displayName = 'BpkCardV2.Divider';

export default Divider;
