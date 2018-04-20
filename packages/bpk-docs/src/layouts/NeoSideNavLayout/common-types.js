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
import { type Node } from 'react';

export type Link = {
  id: string,
  children: Node,
  route: ?string,
  onSelect: ?() => mixed,
};

export type Category = {
  id: string,
  category: string,
  links: Array<Link>,
  sort: ?boolean,
  hero: {
    url: string,
    horizontalPosition: ?number,
  },
};

export type LinkPropType = Link;
export type CategoryPropType = Category;

export type Links = Array<Link | Category>;

export type LinksPropType = {
  links: Links,
};
