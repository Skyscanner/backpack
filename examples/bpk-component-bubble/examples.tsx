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
import BpkBubble from '../../packages/bpk-component-bubble/src/BpkBubble';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassNames = cssModules(STYLES);

const SimpleExample = () => (
  <div className={getClassNames('bpk-content')}>
    <span className={getClassNames('bpk-content__container')}>
      <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
        Simple
      </BpkText>

      <span className={getClassNames('bpk-content__container__bubble-wrapper')}>
        <BpkBubble>
          New
        </BpkBubble>
      </span>
    </span>
  </div>
);

const WithLongLabelExample = () => (
  <div className={getClassNames('bpk-content')}>
    <span className={getClassNames('bpk-content__container')}>
      <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
        With long label
      </BpkText>

      <span className={getClassNames('bpk-content__container__bubble-wrapper')}>
        <BpkBubble>
          Nouveau
        </BpkBubble>
      </span>
    </span>
  </div>
);


const VisualTestExample = () => (
  <div>
    <SimpleExample />
    <WithLongLabelExample />
  </div>
);

export {
  SimpleExample,
  WithLongLabelExample,
  VisualTestExample,
};
