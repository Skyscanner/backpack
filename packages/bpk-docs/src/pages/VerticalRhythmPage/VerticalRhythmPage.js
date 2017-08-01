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
import BpkLink from 'bpk-component-link';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';

const baselinerLink = 'https://chrome.google.com/webstore/detail/baseliner/agoopbiflnjadjfbhimhlmcbgmdgldld?hl=en-GB';

const VerticalRhythmPage = () => <DocsPageBuilder
  title="Vertical rhythm"
  blurb={[
    <Paragraph>
      Vertical rhythm is a concept that originated from print design. Vertical rhythm helps keep the vertical spaces
      between elements on a page consistent with each other. This is often achieved with the help of a baseline grid –
      an underlying structure that helps guide the vertical spacing of a design.
    </Paragraph>,
    <Paragraph>
      Just like using columns for laying out elements horizontally, the baseline grid is a way to help make decisions
      and build consistency into a layout.
    </Paragraph>,
    <Heading level="h2">How can I achieve it?</Heading>,
    <Paragraph>
      By using common spacing we are able to create a sense of repetition, which has the ability to make things feel as
      if they belong together.  Your mind subconsciously sees that this is part of a pattern and brings a clear sense of
      unity, consistency, and cohesiveness.
    </Paragraph>,
    <Heading level="h2">Why do we need it?</Heading>,
    <Paragraph>
      In Backpack vertical rhythm has been baked into every single component. By standardising around five font-sizes
      and line-height pairs, together with a consistent set of spacing values means its very easy to achieve. In most
      cases you won’t even need to think about vertical rhythm, you’ll get it by just using the pre-defined variables.
    </Paragraph>,
    <Heading level="h2">How was it calculated?</Heading>,
    <Paragraph>
      As mentioned vertical rhythm is achieved by aligning font-size, line-height and spacing. We start with the
      browsers default text-size, (roughly equating 16px in most cases) and the default line-height (roughly equating
        to 24px in most cases). From there, it was a case of creating a scale using multiples of the line-hight. Since
        6 is the smallest (usable) number which 24 is divisible by, we use 6 to form the baseline.
    </Paragraph>,
    <Heading level="h2">Borders</Heading>,
    <Paragraph>
      One of the things to bear in mind when trying to maintain vertical rhythm is how borders are rendered. Since
      borders are rendered outside an element’s container, they can often throw elements off the grid. To get around
      this we use inset box-shadows, which render on the inside, and mimic the look of borders.
    </Paragraph>,
    <Heading level="h2">Exceptions</Heading>,
    <Paragraph>
      In general, vertical rhythm is not an optional thing, everything must adhere to it. However, there are some cases
      where this proves
      more difficult. In particular when working with third party components. Where we don’t have fine-grained control
      to fully style these using Backpack values, we ensure that these components are placed within a container which
      does. This ensures the rest of the page remains unaffected.
    </Paragraph>,
    <Heading level="h2">Testing</Heading>,
    <Paragraph>
      It’s relatively easy to test if your components and screens to ensure everything adheres to the vertical rhythm.
      For example, on every page of the docs site, you’ll find a toggle at the bottom of the page to enable the baseline
      grid. This will overlay a grid so you can see how things are aligned.
    </Paragraph>,
    <Paragraph>
      The baseline grid toggle is also baked into the OC cookie cutter and can be enabled on any component in the OC
      Registry.
    </Paragraph>,
    <Paragraph>
      Alternatively you can use a third-party plugin for Chrome called <BpkLink href={baselinerLink} blank> Baseliner
      </BpkLink> which will overlay a similar grid on any webpage (just be sure to configure it to 6px).
    </Paragraph>,
  ]}
/>;

export default VerticalRhythmPage;
