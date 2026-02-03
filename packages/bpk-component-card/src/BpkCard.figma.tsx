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
import figma from '@figma/code-connect';

import BpkCard from './BpkCard';

figma.connect(
  BpkCard,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=4395%3A2506',
  {
    example: () => <BpkCard>children</BpkCard>,
  },
);
