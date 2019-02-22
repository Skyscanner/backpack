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

import React from 'react';
import BpkButton from 'bpk-component-button';
import BpkSmallDownloadIcon from 'bpk-component-icon/sm/download';
import { withButtonAlignment } from 'bpk-component-icon';

import InfoPageBuilder from '../../components/InfoPageBuilder';
import Paragraph from '../../components/Paragraph';
import CopywritingHeroImage from '../../static/copywriting_hero.jpg';

// eslint-disable-next-line import/no-webpack-loader-syntax
const toneOfVoiceGuidelines = require('!!file-loader?name=[name].[hash].pdf!./../../static/tone-of-voice-guidelines-october-2018.pdf');

const AlignedBpkSmallDownloadIcon = withButtonAlignment(BpkSmallDownloadIcon);

const sections = [
  {
    id: 'download',
    title: 'Download the guidelines',
    expanded: true,
    content: (
      <Paragraph>
        <BpkButton href={`/${toneOfVoiceGuidelines}`}>
          Download <AlignedBpkSmallDownloadIcon />
        </BpkButton>
      </Paragraph>
    ),
  },
];

const CopywritingPage = () => (
  <InfoPageBuilder
    title="Tone of voice"
    hero={{
      heading: `Tone of voice`,
      imageUrl: `/${CopywritingHeroImage}`,
    }}
    sections={sections}
  />
);

export default CopywritingPage;
