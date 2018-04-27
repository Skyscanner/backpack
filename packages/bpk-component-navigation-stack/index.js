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

import withNavigationStackState, {
  type Props as StateProps,
} from './src/withNavigationStackState';
import BpkNavigationStack, { type Props } from './src/BpkNavigationStack';

export type BpkNavigationStackProps = Props;
export type StatefulBpkNavigationStackProps = StateProps;

export default BpkNavigationStack;
export { withNavigationStackState };
