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

import { Title, Markdown, PRIMARY_STORY } from '@storybook/addon-docs';

import BpkVisuallyHidden from '../../packages/bpk-component-visually-hidden/src/BpkVisuallyHidden';

import {
  BasicExample,
  DisabledIconOnlyButtonsWithVisuallyHiddenText,
  IconOnlyButtonsWithVisuallyHiddenText,
  LargeIconOnlyButtonsWithVisuallyHiddenText,
  LinkIconOnlyButtonsWithVisuallyHiddenText,
  PrimaryIconOnlyButtonsWithVisuallyHiddenText,
} from './examples';

export default {
  title: 'bpk-component-visually-hidden',
  component: BpkVisuallyHidden,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Markdown>
            {`
The \`BpkVisuallyHidden\` component hides content visually while keeping it accessible to screen readers. This is essential for providing context to assistive technologies without cluttering the visual interface.

## Common Use Cases

### Icon-Only Buttons
Use \`BpkVisuallyHidden\` to provide descriptive text for icon-only buttons. This ensures screen reader users understand the button's purpose.

### Additional Context
Provide extra information for screen readers that would be redundant or unnecessary for sighted users.

### Document Structure
Create semantic HTML structure (like headings) that helps screen reader navigation without affecting the visual layout.

## Accessibility Notes

- Content wrapped in \`BpkVisuallyHidden\` is completely hidden from view using CSS
- Screen readers will announce the hidden content normally
- The component uses the proven "visually-hidden" pattern from industry best practices
- Do not use this component to hide important visual information - only use it to provide additional context for screen readers

## Props

The component accepts an \`as\` prop to specify the HTML element type (defaults to \`span\`).
`}
          </Markdown>
          <PRIMARY_STORY />
        </>
      ),
    },
  },
};

export const IconOnlyButtons = IconOnlyButtonsWithVisuallyHiddenText;
IconOnlyButtons.storyName = 'Icon-only buttons with visually hidden text';

export const LargeIconOnlyButtons = LargeIconOnlyButtonsWithVisuallyHiddenText;
LargeIconOnlyButtons.storyName = 'Large icon-only buttons';

export const PrimaryIconOnlyButtons =
  PrimaryIconOnlyButtonsWithVisuallyHiddenText;
PrimaryIconOnlyButtons.storyName = 'Primary icon-only buttons';

export const LinkIconOnlyButtons = LinkIconOnlyButtonsWithVisuallyHiddenText;
LinkIconOnlyButtons.storyName = 'Link icon-only buttons';

export const DisabledIconOnlyButtons =
  DisabledIconOnlyButtonsWithVisuallyHiddenText;
DisabledIconOnlyButtons.storyName = 'Disabled icon-only buttons';

export const Basic = BasicExample;
Basic.storyName = 'Basic usage examples';
