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

import BpkButton from '../../packages/bpk-component-button';
import { cssModules } from '../../packages/bpk-react-utils';
import { withScrimmedPortal } from '../../packages/bpk-scrim-utils';

import STYLES from './examples.scss';

const getClassName = cssModules(STYLES);

const DialogContent = () => (
  <section
    tabIndex={-1}
    role="dialog"
    className={getClassName('bpk-scrim-utils-example__dialog')}
  >
    <div className={getClassName('bpk-scrim-utils-example__dialog-content')}>
      <div>Dialog content here.</div>
      <BpkButton>Some button</BpkButton>
    </div>
  </section>
);
const DialogContentWithScrim = withScrimmedPortal(DialogContent);

const WithPortalScrimExample = () => (
  <div id="pagewrap">
    <div>
      This element should be hidden from AT by the scrim. It should also not be
      possible to tab to it.
    </div>
    <DialogContentWithScrim
      getApplicationElement={() => document.getElementById('pagewrap')}
      closeOnScrimClick={false}
      containerClassName={getClassName(
        'bpk-scrim-utils-example__dialog-container',
      )}
    />
  </div>
);

const WithCustomElementAndPortalScrimExample = () => (
  <div>
    <div id="portalElement">Dialog attached here.</div>
    <div id="pagewrap">
      <div>
        This element should be hidden from AT by the scrim. It should also not
        be possible to tab to it.
      </div>
      <DialogContentWithScrim
        getApplicationElement={() => document.getElementById('pagewrap')}
        closeOnScrimClick={false}
        containerClassName={getClassName(
          'bpk-scrim-utils-example__dialog-container',
        )}
        renderTarget={() => document.getElementById('portalElement')}
      />
    </div>
  </div>
);

export { WithPortalScrimExample, WithCustomElementAndPortalScrimExample };
