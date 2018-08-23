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

import './static/favicon.ico';
import appleTouchIcon from './static/apple-touch-icon.png';

export default ({ head = {}, html = '', assets = {} }) => `<!doctype html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  ${head.title.toString()}
  <link rel="stylesheet" href="/${assets.docs.css}">
  <link rel="apple-touch-icon" sizes="180x180" href="/${appleTouchIcon}">
</head>

<body>

<div id="react-mount">
  ${html}
</div>

<script src="/${assets.docs.js}" async></script>

</body>

</html>`;
