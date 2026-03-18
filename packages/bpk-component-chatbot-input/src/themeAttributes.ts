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

/**
 * Theme attributes for BpkChatbotInput.
 *
 * Usage with BpkThemeProvider:
 *
 *   import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';
 *   import BpkChatbotInput, { themeAttributes } from '@skyscanner/backpack-web/bpk-component-chatbot-input';
 *
 *   <BpkThemeProvider theme={{ chatbotInputBorderRadius: '999px', chatbotInputFocusBorderColor: '#FF6600' }} themeAttributes={themeAttributes}>
 *     <BpkChatbotInput ... />
 *   </BpkThemeProvider>
 */
const themeAttributes = [
  /** Border radius for the input container. Applies to both cars and composer modes. */
  'chatbotInputBorderRadius',
  /** Border colour for hover and focus states. Only applies to the cars (single-line) mode. */
  'chatbotInputFocusBorderColor',
];

export default themeAttributes;
