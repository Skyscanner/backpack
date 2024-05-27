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

/**
 * This file is a workaround for Storybook not supporting HOCs API table generation in v7 by creating mock components that can be used to generate the API table
 * They plan on adding support in v8
 * https://github.com/storybookjs/storybook/issues/12558#issuecomment-1288834879
 * @todo remove this file once we upgrade to Storybook v8
 */

import type { Props as bpkCalendarContainerProps } from '../../packages/bpk-component-calendar/src/BpkCalendarContainer';
import type { Props as composeProps } from '../../packages/bpk-component-calendar/src/composeCalendar';

const BpkScrollableCalendarMock = (props: composeProps & bpkCalendarContainerProps) => <div />;

// eslint-disable-next-line import/prefer-default-export
export { BpkScrollableCalendarMock };