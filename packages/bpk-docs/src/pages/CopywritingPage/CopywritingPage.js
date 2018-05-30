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

import Paragraph, { ParagraphNoMargin } from './../../components/neo/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import CopywritingHeroImage from './../../static/copywriting_hero.jpg';

const sections = [
  {
    id: 'intro',
    title: "That's the point of everything we do.",
    content: [
      <Paragraph>
        So, first of all, take a moment to feel noble. You might even give
        yourself a pat on the back (but, um, make sure no-one is looking first).
      </Paragraph>,
      <Paragraph>
        Still, if we&apos;re going to help people, we need to make sure
        they&apos;re listening. And that&apos;s not just about what we tell them
        &mdash; it&apos;s about how we tell them.
      </Paragraph>,
    ],
  },
];

const CopywritingPage = () => (
  <DocsPageBuilder
    showMenu={false}
    title="Copywriting"
    customSections={sections}
    hero={{
      heading: `Writing for Skyscanner?\nThis basically makes you a hero.`,
      subHeading: (
        <ParagraphNoMargin>
          No cape needed. (Please &mdash; no underwear over tights, either.)
          Because writing for Skyscanner means you&apos;re helping people have
          an amazing trip.
        </ParagraphNoMargin>
      ),
      imageUrl: `/${CopywritingHeroImage}`,
    }}
    showPageHead={false}
  />
);

export default CopywritingPage;
