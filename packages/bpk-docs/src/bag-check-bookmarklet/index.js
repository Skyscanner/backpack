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

const BUCKET_BASE_PATH =
  'https://s3-eu-west-1.amazonaws.com/skyscanner-prod-sttc-int-eu-west-1/sttc/bag-check';

const error = msg => alert(`${msg} - Please contact #backpack`); // eslint-disable-line no-alert

const fetchLatest = basePath => {
  const script = document.createElement('script');
  script.src = `${basePath}/latest.js`;
  script.type = 'text/javascript';
  script.onerror = e => error(`Failed with error: ${e}`);

  document.getElementsByTagName('body')[0].appendChild(script);
};

// Called when latest.js loads
window.bagCheckLatestLoaded = latest => {
  if (!Object.prototype.hasOwnProperty.call(latest, 'css')) {
    error('`css` key missing in latest.js.');
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(latest, 'js')) {
    error('`js` key missing in latest.js.');
    return;
  }

  const cssPath = `${BUCKET_BASE_PATH}/${latest.css}`;
  const jsPath = `${BUCKET_BASE_PATH}/${latest.js}`;

  const link = document.createElement('link');
  link.href = cssPath;
  link.type = 'text/css';
  link.rel = 'stylesheet';

  const script = document.createElement('script');
  script.src = jsPath;
  script.type = 'text/javascript';

  document.getElementsByTagName('head')[0].appendChild(link);
  document.getElementsByTagName('body')[0].appendChild(script);
  delete window.bagCheckLatestLoaded;
};

// Start
fetchLatest(BUCKET_BASE_PATH);
