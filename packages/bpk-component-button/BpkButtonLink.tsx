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

import BpkButton, {type Props} from './src/BpkButton';

/**
 * @deprecated BpkButtonLink is deprecated and will be removed in a future major version. Please use BpkButtonV2 with type={BUTTON_TYPES.link} instead.
 * @param {Props} props - Component props
 * @returns {JSX.Element} Link button component
 */
const BpkButtonLink = (props: Props) => <BpkButton {...props} link />
export default BpkButtonLink;
