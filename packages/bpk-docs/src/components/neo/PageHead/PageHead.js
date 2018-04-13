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

import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkLink from 'bpk-component-link';
import { BpkList, BpkListItem } from 'bpk-component-list';
import isString from 'lodash/isString';

import Heading from '../Heading';
import Paragraph from '../Paragraph';

import STYLES from './PageHead.scss';

const getClassName = cssModules(STYLES);

const toNodes = children => {
  if (!children) {
    return null;
  }

  return isString(children) ? [<Paragraph>{children}</Paragraph>] : children;
};

type MenuItem = {
  title: string,
  href: string,
};

type Props = {
  title: string,
  blurb: string | Node,
  menu: ?Array<MenuItem>,
};
const PageHead = (props: Props) => (
  <section className={getClassName('bpkdocs-page-head')}>
    <div className={getClassName('bpkdocs-page-head__content')}>
      <Heading level="h1">{props.title}</Heading>
      {toNodes(props.blurb)}
      {props.menu && (
        <BpkList>
          {props.menu.map(({ title, href }) => (
            <BpkListItem key={`menu-item-${href.substr(1)}`}>
              <BpkLink href={href}>{title}</BpkLink>
            </BpkListItem>
          ))}
        </BpkList>
      )}
    </div>
  </section>
);

export default PageHead;
