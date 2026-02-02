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
/* @flow strict */

import BpkSkipLink from '../../packages/bpk-component-skip-link';

const DefaultExample = () => (
  <BpkSkipLink
    style={{ position: 'absolute' }}
    href="#main"
    label="Skip to main content"
  />
);

const DocsSiteExample = () => (
  <BpkSkipLink
    style={{ position: 'absolute' }}
    href="#implementation"
    label="Skip to implementation"
  />
);

const RealisticExample = () => {
  const onSkipToMain = () => {
    setTimeout(() => {
      const el = document.getElementById('main');
      if (el) el.focus();
    }, 0);
  };

  return (
    <div>
      <p>
        Press <kbd>Tab</kbd> to reveal the skip link, then press{' '}
        <kbd>Enter</kbd>.
      </p>

      <BpkSkipLink
        href="#main"
        label="Skip to main content"
        onClick={(e) => {
          e.preventDefault();
          onSkipToMain();
        }}
      />

      <main id="main" tabIndex={-1}>
        <h1>Main content</h1>
        <p>Focus should land here after activating the skip link.</p>
      </main>
    </div>
  );
};

export { DefaultExample, DocsSiteExample, RealisticExample };
