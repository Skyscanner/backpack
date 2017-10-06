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

// This is the same as https://github.com/iamstarkov/theming/blob/master/src/create-theme-listener.js
// but returns null instead of an error when context[CHANNEL] is undefined.

import PropTypes from 'prop-types';

const createThemeListener = () => {
  const CHANNEL = '__THEMING__';
  const contextTypes = {
    [CHANNEL]: PropTypes.object,
  };

  function initial(context) {
    return context[CHANNEL] ? context[CHANNEL].getState() : null;
  }

  function subscribe(context, cb) {
    return context[CHANNEL] ? context[CHANNEL].subscribe(cb) : null;
  }

  return {
    contextTypes,
    initial,
    subscribe,
  };
};

export default createThemeListener;
