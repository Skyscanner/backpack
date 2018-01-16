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

import 'bpk-stylesheets/base';
import 'bpk-stylesheets/base.css';

import './static/favicon.ico';
import appleTouchIcon from './static/apple-touch-icon.png';
import ogImage from './static/og-image.png';

const SITE_URL = 'https://backpack.github.io';

export default ({ head = {}, html = '', assets = {} }) => `<!doctype html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <meta property="og:url" content="${SITE_URL}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Backpack">
  <meta property="og:image" content="${SITE_URL}/${ogImage}">
  <meta property="og:description" content="Skyscanner's design system.">
  <meta name="twitter:card" content="summary" />
  ${head.title.toString()}
  <link rel="stylesheet" href="/${assets.docs.css}">
  <link rel="apple-touch-icon" sizes="180x180" href="/${appleTouchIcon}">
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-82476536-1', 'auto');
    ga('send', 'pageview');
  </script>
</head>

<body>

<div id="react-mount">
  ${html}
</div>

<script src="/${assets.docs.js}" async></script>

</body>

</html>`;
