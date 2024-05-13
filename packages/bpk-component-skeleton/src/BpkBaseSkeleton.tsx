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

import { cssModules } from '../../bpk-react-utils';

import type { CUSTOM_SIZE_TYPE } from './common-types';

import STYLES from './BpkBaseSkeleton.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  skeletonStyle: string;
  styleObj?: CUSTOM_SIZE_TYPE;
};

const BpkBaseSkeleton = ({
  skeletonStyle,
  styleObj = undefined,
 }: Props) => (
    <div className={getClassName('bpk-skeleton', skeletonStyle)} style={styleObj}  />
  );

export default BpkBaseSkeleton;
