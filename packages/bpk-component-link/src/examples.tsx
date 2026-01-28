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

import BpkLink from "..";
import BpkPanel from '../../bpk-component-panel';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action, BpkDarkExampleWrapper } from '../../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

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
      >
        BpkLink supports a polymorphic{' '}
        <BpkText textStyle={TEXT_STYLES.label1}>as</BpkText> prop that allows
        rendering as different HTML elements while maintaining consistent link
        styling. Use the appropriate element based on the use case:
      </BpkText>
    </div>

    <div className={getClassName('bpk-link-example__cards')}>
      <BpkPanel>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          {`as="a" (default)`}
        </BpkText>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.caption}
          color={TEXT_COLORS.textSecondary}
          className={getClassName('bpk-link-example__card-description')}
        >
          For navigation
        </BpkText>
        <BpkLink href="#">Click to navigate</BpkLink>
      </BpkPanel>

      <BpkPanel>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          {`as="button"`}
        </BpkText>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.caption}
          color={TEXT_COLORS.textSecondary}
          className={getClassName('bpk-link-example__card-description')}
        >
          For actions without navigation
        </BpkText>
        <BpkLink as="button" onClick={action('Action triggered')}>
          Trigger action
        </BpkLink>
      </BpkPanel>

      <BpkPanel>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          {`as="span"`}
        </BpkText>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.caption}
          color={TEXT_COLORS.textSecondary}
          className={getClassName('bpk-link-example__card-description')}
        >
          Non-interactive inline text
        </BpkText>
        <BpkLink as="span">Static inline text</BpkLink>
      </BpkPanel>

      <BpkPanel>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          {`as="div"`}
        </BpkText>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.caption}
          color={TEXT_COLORS.textSecondary}
          className={getClassName('bpk-link-example__card-description')}
        >
          Non-interactive block element
        </BpkText>
        <BpkLink as="div">Static block text</BpkLink>
      </BpkPanel>
    </div>
  </div>
);


const MixedExample = () => (
  <div>
    <LinkExample />
    <ImplicitLinkExample />
    <LinkAlternativeExample />
    <LinkAlternativeImplicitExample />
  </div>
);

export {
  // Basic examples
  LinkExample,
  ImplicitLinkExample,
  // Alternate (dark background)
  LinkAlternativeExample,
  LinkAlternativeImplicitExample,
  // Polymorphic "as" prop examples
  PolymorphicOverviewExample,
  // Mixed examples for visual tests
  MixedExample,
};
