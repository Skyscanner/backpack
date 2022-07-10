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

import React, { useState, Node } from 'react';

import BpkFloatingNotification, {
  TYPE,
} from '../../packages/bpk-component-floating-notification';
import BpkIconHeart from '../../packages/bpk-component-icon/sm/heart';
import BpkIconInformationCircle from '../../packages/bpk-component-icon/sm/information-circle';
import BpkButton from '../../packages/bpk-component-button';

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
          setTimeout(() => {
            setShowAlert(false);
          }, 4800);
        }}
      >
        Trigger alert
      </BpkButton>
      {showAlert && children}
    </>
  );
};

const DefaultExample = () => (
  <AlertContainer>
    <BpkFloatingNotification text="Saved" />
  </AlertContainer>
);

const IconExample = () => (
  <BpkFloatingNotification icon={BpkIconHeart} text="Saved" />
);

const CtaExample = () => (
  <BpkFloatingNotification ctaText="View" text="Saved" />
);

const CtaIconLongTextExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    icon={BpkIconHeart}
    text="Killer Combo saved to New York and Miami 🎉"
  />
);

const CtaIconLongTextDarkModeExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    type={TYPE.dark}
    icon={BpkIconInformationCircle}
    text="Killer Combo saved to New York and Miami 🎉"
  />
);

const VisualTestExample = () => (
  <BpkFloatingNotification
    animateOnEnter
    animateOnExit
    ctaText="View"
    hideAfter={5000}
    icon={BpkIconInformationCircle}
    text="Killer Combo saved to New York and Miami 🎉"
    type={TYPE.dark}
  />
);

export {
  CtaIconLongTextExample,
  CtaIconLongTextDarkModeExample,
  CtaExample,
  DefaultExample,
  IconExample,
  VisualTestExample,
};
