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

import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import {
  Router,
  RouterContext,
  match,
  browserHistory,
  createMemoryHistory,
} from 'react-router';
import 'es6-promise/auto';

import routes from './routes';
import template from './template';
import { extractAssets } from './webpackStats';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const root = document.getElementById('react-mount');

  ReactDOM.render(
    React.createElement(Router, {
      history: browserHistory,
      onUpdate: () => {
        if (`${window.location}`.indexOf('#') === -1) {
          window.scrollTo(0, 0);
        }
      },
      routes,
    }),
    root,
  );
}

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);
  const assets = extractAssets(locals.webpackStats);

  match({ routes, location, history }, (error, redirectLocation, props) => {
    // Explicit check for null here due to odd behaviour with react router's match function
    // It passes undefined in cases where matches are not found.
    // So we use their error object if it is truthy, otherwise we create our own.
    if (error !== null) {
      return callback(
        error ||
          new Error(`React Router failed to match ${JSON.stringify(location)}`),
      );
    }

    if (redirectLocation) {
      return callback(
        error,
        `<script>window.location = '${redirectLocation.pathname}';</script>`,
      );
    }

    const html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(RouterContext, props),
    );
    const head = Helmet.rewind();

    return callback(error, template({ head, html, assets }));
  });
};
