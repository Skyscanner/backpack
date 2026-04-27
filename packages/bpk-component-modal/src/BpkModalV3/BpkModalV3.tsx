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

import BpkModalV3Body from './BpkModalV3Body/BpkModalV3Body';
import BpkModalV3CloseTrigger from './BpkModalV3CloseTrigger/BpkModalV3CloseTrigger';
import BpkModalV3Content from './BpkModalV3Content/BpkModalV3Content';
import BpkModalV3Description from './BpkModalV3Description/BpkModalV3Description';
import BpkModalV3Header from './BpkModalV3Header/BpkModalV3Header';
import BpkModalV3HeroImage from './BpkModalV3HeroImage/BpkModalV3HeroImage';
import BpkModalV3Portal from './BpkModalV3Portal/BpkModalV3Portal';
import BpkModalV3Root from './BpkModalV3Root/BpkModalV3Root';
import BpkModalV3Scrim from './BpkModalV3Scrim/BpkModalV3Scrim';
import BpkModalV3Title from './BpkModalV3Title/BpkModalV3Title';
import BpkModalV3Trigger from './BpkModalV3Trigger/BpkModalV3Trigger';

// BpkModalV3 is a composable namespace for building accessible modal dialogs using the Ark UI Dialog primitive.
// Compose Root, Trigger, Portal, Scrim, Content, Header, Title, Description, Body, HeroImage, and CloseTrigger sub-components to construct the desired modal layout.
const BpkModalV3 = {
  Root: BpkModalV3Root,
  Trigger: BpkModalV3Trigger,
  Portal: BpkModalV3Portal,
  Scrim: BpkModalV3Scrim,
  Content: BpkModalV3Content,
  Header: BpkModalV3Header,
  Title: BpkModalV3Title,
  Description: BpkModalV3Description,
  Body: BpkModalV3Body,
  HeroImage: BpkModalV3HeroImage,
  CloseTrigger: BpkModalV3CloseTrigger,
};

export default BpkModalV3;
