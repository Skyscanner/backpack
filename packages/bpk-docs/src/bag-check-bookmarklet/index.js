/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

const BUCKET_BASE_PATH = 'https://js.skyscnr.com/sttc/backpack/bag-check';

const error = (msg, ex = null) => {
  alert(`${msg} - Please contact #backpack`); // eslint-disable-line no-alert
  if (ex) {
    console.error('BagCheck failed:', ex); // eslint-disable-line no-console
  }
};

const fetchLatest = basePath => {
  const script = document.createElement('script');
  script.src = `${basePath}/latest.js`;
  script.type = 'text/javascript';
  script.onerror = e => error(`Failed to download BagCheck`, e);

  document.getElementsByTagName('body')[0].appendChild(script);
};

// Called when latest.js loads
window.bagCheckLatestLoaded = latest => {
  if (!Object.prototype.hasOwnProperty.call(latest, 'js')) {
    error('`js` key missing in latest.js');
    return;
  }

  const jsPath = `${BUCKET_BASE_PATH}/${latest.js}`;

  const script = document.createElement('script');
  script.src = jsPath;
  script.type = 'text/javascript';

  document.getElementsByTagName('body')[0].appendChild(script);
  delete window.bagCheckLatestLoaded;
};

// Start
fetchLatest(BUCKET_BASE_PATH);
