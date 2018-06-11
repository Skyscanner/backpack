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

import { ParagraphNoMargin } from './../../components/Paragraph';
import InfoPageBuilder from './../../components/InfoPageBuilder';

import CopywritingHeroImage from './../../static/copywriting_hero.jpg';

import intro from './content/intro.md';
import whyListen from './content/why-listen.md';
import authority from './content/authority.md';
import voice from './content/voice.md';
import goodWriting from './content/good-writing.md';
import travelGuide from './content/travel-guide.md';
import destinationPage from './content/destination-page.md';
import safetyTips from './content/safety-tips.md';
import hotelInsider from './content/hotel-insider.md';
import extras from './content/extras.md';

const sections = [
  {
    id: 'intro',
    title: "That's the point of everything we do",
    markdown: intro,
    expanded: true,
  },
  {
    id: 'what-makes-your-voice-worth-listening-to',
    title: 'What makes your voice worth listening to?',
    markdown: whyListen,
  },
  {
    id: 'how-do-we-know-what-were-talking-about',
    title: "How do we know what we're talking about?",
    markdown: authority,
  },
  {
    id: 'how-do-you-find-the-right-voice',
    title: 'How do you find the right voice?',
    markdown: voice,
  },
  {
    id: 'what-is-good-writing',
    title: 'What is good writing?',
    markdown: goodWriting,
  },
  {
    id: 'how-to-write-a-travel-guide',
    title: 'How to write a travel guide',
    markdown: travelGuide,
  },
  {
    id: 'how-to-write-a-destination-page',
    title: 'How to write a destination page',
    markdown: destinationPage,
  },
  {
    id: 'how-to-write-safety-tips',
    title: 'How to write safety tips',
    markdown: safetyTips,
  },
  {
    id: 'how-to-write-a-hotel-insider',
    title: 'How to write a hotel insider',
    markdown: hotelInsider,
  },
  {
    id: 'a-few-handy-extras',
    title: 'A few handy extras',
    markdown: extras,
  },
];

const CopywritingPage = () => (
  <InfoPageBuilder
    title="Copywriting"
    hero={{
      heading: `Writing for Skyscanner?\nThis basically makes you a hero.`,
      subHeading: (
        <ParagraphNoMargin>
          No cape needed. (Please &mdash; no underwear over tights, either.)
          Because writing for Skyscanner means you&lsquo;re helping people have
          an amazing trip.
        </ParagraphNoMargin>
      ),
      imageUrl: `/${CopywritingHeroImage}`,
    }}
    sections={sections}
  />
);

export default CopywritingPage;
