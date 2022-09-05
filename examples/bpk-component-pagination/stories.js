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

import { storiesOf } from '@storybook/react';

import {
  DefaultPaginationExample,
  FivePagesPaginationExample,
  TwoPagesPaginationExample,
  SinglePaginationExample,
  VisibleRangeExample,
} from './examples';

export default {
  title: 'bpk-component-pagination',
};

export const PaginationDefault = DefaultPaginationExample;

PaginationDefault.storyName = 'Pagination - default';

export const Pagination5VisiblePages = FivePagesPaginationExample;

Pagination5VisiblePages.storyName = 'Pagination - 5 visible pages';

export const Pagination2Pages = TwoPagesPaginationExample;

Pagination2Pages.storyName = 'Pagination - 2 pages';

export const PaginationSinglePage = SinglePaginationExample;

PaginationSinglePage.storyName = 'Pagination - single page';

export const PaginationVisibleExample = VisibleRangeExample;

PaginationVisibleExample.storyName = 'Pagination - Visible example';

export const VisualTest = DefaultPaginationExample;

VisualTest.storyName = 'Visual test';
