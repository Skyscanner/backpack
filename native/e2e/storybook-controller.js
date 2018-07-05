/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018-present Skyscanner Ltd
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
const { URL, URLSearchParams } = require('url');
const puppeteer = require('puppeteer');

class StorybookController {
  constructor(storybookBaseUrl) {
    this.storybookBaseUrl = storybookBaseUrl;
  }

  async start() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async done() {
    await this.browser.close();
  }

  async activateStory(kind, story) {
    const url = this.buildUrl(kind, story);
    await this.page.goto(url);
  }

  buildUrl(kind, story) {
    const params = new URLSearchParams({
      selectedKind: kind,
      selectedStory: story,
    });
    return new URL(`?${params.toString()}`, this.storybookBaseUrl);
  }
}

module.exports = StorybookController;
