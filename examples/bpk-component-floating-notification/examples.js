/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import { cloneElement, useState, Node } from 'react';

import BpkButton from '../../packages/bpk-component-button';
import BpkFloatingNotification from '../../packages/bpk-component-floating-notification';
import BpkIconHeart from '../../packages/bpk-component-icon/sm/heart';
import BpkIconInformationCircle from '../../packages/bpk-component-icon/sm/information-circle';

type Props = {
  children: Node,
};

const AlertContainer = ({ children }: Props): Node => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <BpkButton
        onClick={() => {
          setShowAlert(true);
        }}
      >
        Trigger alert
      </BpkButton>
      {showAlert &&
        cloneElement(children, { onExit: () => setShowAlert(false) })}
    </>
  );
};

const DefaultExample = () => (
  <AlertContainer>
    <BpkFloatingNotification text="Saved" />
  </AlertContainer>
);

const IconExample = () => (
  <AlertContainer>
    <BpkFloatingNotification icon={BpkIconHeart} text="Saved" />
  </AlertContainer>
);

const CtaExample = () => (
  <AlertContainer>
    <BpkFloatingNotification ctaText="View" text="Saved" />
  </AlertContainer>
);

const CtaIconLongTextExample = () => (
  <AlertContainer>
    <BpkFloatingNotification
      ctaText="View"
      icon={BpkIconHeart}
      text="Killer Combo saved to New York and Miami 🎉"
    />
  </AlertContainer>
);

const VisualTestExample = () => (
  <AlertContainer>
    <BpkFloatingNotification
      animateOnEnter
      animateOnExit
      ctaText="View"
      hideAfter={5000}
      icon={BpkIconInformationCircle}
      text="Killer Combo saved to New York and Miami 🎉"
    />
  </AlertContainer>
);

export {
  CtaIconLongTextExample,
  CtaExample,
  DefaultExample,
  IconExample,
  VisualTestExample,
};
