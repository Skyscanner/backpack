/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import BpkLink, { BpkButtonLink } from '../../packages/bpk-component-link';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action, BpkDarkExampleWrapper } from '../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

// Spacing values for non-polymorphic examples (legacy)
const SPACING = {
  md: '1rem',
  lg: '1.5rem',
};

// =============================================================================
// Basic Link Examples
// =============================================================================

const LinkExample = () => (
  <div>
    <BpkLink href="#" onClick={action('#1 clicked')}>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')}>
      Link #2
    </BpkLink>
  </div>
);

const ImplicitLinkExample = () => (
  <div>
    <BpkLink href="#" onClick={action('#1 clicked')} implicit>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} implicit>
      Link #2
    </BpkLink>
  </div>
);

const LinkInGridExample = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: SPACING.lg,
      width: '100%',
      maxWidth: '800px',
    }}
  >
    <BpkLink href="#" onClick={action('#1 clicked')}>
      Link #1
    </BpkLink>
    <BpkLink href="#" onClick={action('#2 clicked')}>
      Link #2
    </BpkLink>
    <BpkLink href="#" onClick={action('#3 clicked')}>
      Link #3
    </BpkLink>
    <BpkLink href="#" onClick={action('#5 clicked')}>
      Link #4
    </BpkLink>
  </div>
);

// =============================================================================
// Legacy BpkButtonLink Examples (Deprecated)
// =============================================================================

const ButtonLinkExample = () => (
  <div>
    <BpkButtonLink onClick={action('#1 clicked')}>Link #1</BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')}>Link #2</BpkButtonLink>
  </div>
);

const ImplicitButtonLinkExample = () => (
  <div>
    <BpkButtonLink onClick={action('#1 clicked')} implicit>
      Link #1
    </BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')} implicit>
      Link #2
    </BpkButtonLink>
  </div>
);

const ButtonLinkAlternativeExample = () => (
  <BpkDarkExampleWrapper>
    <BpkButtonLink onClick={action('#1 clicked')} alternate>
      Link #1
    </BpkButtonLink>
    <br />
    <BpkButtonLink onClick={action('#2 clicked')} alternate>
      Link #2
    </BpkButtonLink>
  </BpkDarkExampleWrapper>
);

// =============================================================================
// Alternate (Dark Background) Examples
// =============================================================================

const LinkAlternativeExample = () => (
  <BpkDarkExampleWrapper>
    <BpkLink href="#" onClick={action('#1 clicked')} alternate>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} alternate>
      Link #2
    </BpkLink>
  </BpkDarkExampleWrapper>
);

const LinkAlternativeImplicitExample = () => (
  <BpkDarkExampleWrapper>
    <BpkLink href="#" onClick={action('#1 clicked')} alternate implicit>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} alternate implicit>
      Link #2
    </BpkLink>
  </BpkDarkExampleWrapper>
);

// =============================================================================
// Combined Examples
// =============================================================================

const CombinedExample = () => (
  <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
    Links can be both <BpkLink href="#">anchor tags</BpkLink> as well as{' '}
    <BpkButtonLink onClick={() => null}>button tags</BpkButtonLink>.
  </BpkText>
);

const CombinedAlternativeExample = () => (
  <BpkDarkExampleWrapper>
    <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault} color="text-on-dark">
      Links can be both{' '}
      <BpkLink href="#" alternate>
        anchor tags
      </BpkLink>{' '}
      as well as{' '}
      <BpkButtonLink onClick={() => null} alternate>
        button tags
      </BpkButtonLink>
      .
    </BpkText>
  </BpkDarkExampleWrapper>
);

const OverviewExample = () => (
  <>
    <div style={{ paddingBottom: SPACING.md }}>
      <BpkText tagName="p" textStyle={TEXT_STYLES.bodyLongform}>
        Big skies, big landscapes and cool cities, the great American Northwest
        is the place to discover the great outdoors. Get a real taste of the
        Frontier spirit and explore a rich history of what was once the Wild
        West. <BpkLink href="#">Explore incredible national parks</BpkLink>,
        ancient forests, rugged coastlines, and beautiful islands.
      </BpkText>
    </div>
    <BpkDarkExampleWrapper style={{ padding: SPACING.md }}>
      <BpkText tagName="p" textStyle={TEXT_STYLES.bodyLongform} color="text-on-dark">
        Big skies, big landscapes and cool cities, the great American Northwest
        is the place to discover the great outdoors. Get a real taste of the
        Frontier spirit and explore a rich history of what was once the Wild
        West.{' '}
        <BpkLink href="#" alternate>
          Explore incredible national parks
        </BpkLink>
        , ancient forests, rugged coastlines, and beautiful islands.
      </BpkText>
    </BpkDarkExampleWrapper>
  </>
);

const MixedExample = () => (
  <div>
    <CombinedExample />
    <CombinedAlternativeExample />
  </div>
);

// =============================================================================
// Polymorphic "as" Prop Examples
// =============================================================================

const PolymorphicOverviewExample = () => (
  <div className={getClassName('bpk-link-example__section')}>
    <div>
      <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
        Polymorphic BpkLink
      </BpkText>
      <BpkText
        tagName="p"
        textStyle={TEXT_STYLES.bodyDefault}
        className={getClassName('bpk-link-example__description')}
      >
        BpkLink supports a polymorphic{' '}
        <BpkText textStyle={TEXT_STYLES.label1}>as</BpkText> prop that allows
        rendering as different HTML elements while maintaining consistent link
        styling. Use the appropriate element based on the use case:
      </BpkText>
    </div>

    <div className={getClassName('bpk-link-example__cards-grid')}>
      <div className={getClassName('bpk-link-example__card')}>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          as=a (default)
        </BpkText>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.caption}
          color="text-secondary"
          className={getClassName('bpk-link-example__card-description')}
        >
          For navigation
        </BpkText>
        <BpkLink href="#">Click to navigate</BpkLink>
      </div>

      <div className={getClassName('bpk-link-example__card')}>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          as=button
        </BpkText>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.caption}
          color="text-secondary"
          className={getClassName('bpk-link-example__card-description')}
        >
          For actions without navigation
        </BpkText>
        <BpkLink as="button" onClick={action('Action triggered')}>
          Trigger action
        </BpkLink>
      </div>

      <div className={getClassName('bpk-link-example__card')}>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          as=span
        </BpkText>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.caption}
          color="text-secondary"
          className={getClassName('bpk-link-example__card-description')}
        >
          Non-interactive inline text
        </BpkText>
        <BpkLink as="span">Static inline text</BpkLink>
      </div>

      <div className={getClassName('bpk-link-example__card')}>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          as=div
        </BpkText>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.caption}
          color="text-secondary"
          className={getClassName('bpk-link-example__card-description')}
        >
          Non-interactive block element
        </BpkText>
        <BpkLink as="div">Static block text</BpkLink>
      </div>
    </div>
  </div>
);

export {
  // Basic examples
  LinkExample,
  ImplicitLinkExample,
  LinkInGridExample,
  // Legacy BpkButtonLink (deprecated)
  ButtonLinkExample,
  ImplicitButtonLinkExample,
  ButtonLinkAlternativeExample,
  // Alternate (dark background)
  LinkAlternativeExample,
  LinkAlternativeImplicitExample,
  // Combined
  CombinedExample,
  CombinedAlternativeExample,
  OverviewExample,
  MixedExample,
  // Polymorphic "as" prop examples
  PolymorphicOverviewExample,
};
