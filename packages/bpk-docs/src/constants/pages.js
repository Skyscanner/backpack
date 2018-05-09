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

import React, { type Element } from 'react';
import { Route } from 'react-router';
import { withDefaultProps } from 'bpk-react-utils';

import * as routes from './routes';

import TextPage from '../pages/NeoTextPage';
import WebTextPage from '../pages/TextPage';
import NativeTextPage from '../pages/NativeTextPage';

class Page {
  id: string;
  route: string;
  title: string;
  RootPage: Element<any>;

  constructor({
    id,
    route,
    title,
    rootPage,
    webPage,
    nativePage,
  }: {
    id: string,
    route: string,
    title: string,
    rootPage: Element<any>,
    webPage: ?Element<any>,
    nativePage: ?Element<any>,
  }) {
    this.id = id;
    this.route = route;
    this.title = title;
    this.RootPage = withDefaultProps(rootPage, {
      WebSubpage: webPage,
      NativeSubpage: nativePage,
    });
  }

  renderRoute() {
    return <Route path={this.route} component={this.RootPage} />;
  }

  link() {
    return {
      id: this.id,
      route: this.route,
      children: this.title,
    };
  }
}

export const NEO_TEXT_PAGE = new Page({
  id: 'TEXT',
  route: routes.NEO_TEXT,
  title: 'Text',
  rootPage: TextPage,
  webPage: WebTextPage,
  nativePage: NativeTextPage,
});
