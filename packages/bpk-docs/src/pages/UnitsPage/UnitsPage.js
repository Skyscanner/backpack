/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const UnitsPage = () => <DocsPageBuilder
  title="Units"
  blurb={[
    <Paragraph>
      Rems are used as an alternative to pixels throughout Backpack’s component library. Rems are a way of setting
      font-sizes based on the font-size of the root HTML element. Using rems brings many
      benefits, in particular when thinking about accessibility since they allow you to quickly scale the entire
      UI beautifully by changing the root font-size.
    </Paragraph>,
  ]}
/>;

export default UnitsPage;
