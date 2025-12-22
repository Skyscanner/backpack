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

import { cssModules } from '../../../packages/bpk-react-utils';

import STYLES from './BpkDarkExampleWrapper.module.scss';

const getClassName = cssModules(STYLES);

const BpkDarkExampleWrapper = (props: { padded: boolean }) => {
  const { padded, ...rest } = props;
  return (
    /* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */
    <div
      className={getClassName(
        'bpk-dark-example-wrapper',
        padded && 'bpk-dark-example-wrapper--padded',
      )}
      {...rest}
    />
  );
};

BpkDarkExampleWrapper.defaultProps = {
  padded: false,
};

export default BpkDarkExampleWrapper;
