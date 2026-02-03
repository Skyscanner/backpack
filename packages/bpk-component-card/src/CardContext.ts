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

import { createContext } from 'react';

interface BpkCardContext {
  /**
   * Indicates if the BpkCard should render elevated from the page or not. Parent card types can specify `false` when they handle elevation internally, rather than BpkCard.
   * BpkCard will render elevated by default.
   */
  elevated: boolean;
}

const defaultContext: BpkCardContext = {
  elevated: true,
};

/**
 * CardContext is an internal context to be used only within Backpack parent Card types (time of writing BpkDividedCard & BpkCardWrapper).
 * It facillitates the BpkCard to render appropriately when wrapped and/or is rendered indirectly from a parent.
 */
export const CardContext = createContext(defaultContext);
