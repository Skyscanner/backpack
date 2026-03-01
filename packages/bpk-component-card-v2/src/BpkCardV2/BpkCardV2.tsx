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

import Body from './subcomponents/Body';
import Footer from './subcomponents/Footer';
import Header from './subcomponents/Header';
import Primary from './subcomponents/Primary';
import Root from './subcomponents/Root';
import Secondary from './subcomponents/Secondary';

import type { BpkCardV2Namespace } from './common-types';

/**
 * BpkCardV2 is a composable, responsive card component namespace for Backpack.
 *
 * It provides subcomponents for explicit multi-section composition (Root, Header, Body, Footer),
 * flexible split layouts (Primary/Secondary), and customizable surface colors.
 *
 * @example
 * // Basic card
 * <BpkCardV2.Root>
 *   <BpkCardV2.Header>Title</BpkCardV2.Header>
 *   <BpkCardV2.Body>Content</BpkCardV2.Body>
 *   <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
 * </BpkCardV2.Root>
 *
 * @example
 * // Split layout (70/30 on desktop, stacked on mobile)
 * <BpkCardV2.Root bgColor="surfaceElevated">
 *   <BpkCardV2.Body split splitRatio={70}>
 *     <BpkCardV2.Primary>Main content</BpkCardV2.Primary>
 *     <BpkCardV2.Secondary>Sidebar</BpkCardV2.Secondary>
 *   </BpkCardV2.Body>
 * </BpkCardV2.Root>
 */
const BpkCardV2: BpkCardV2Namespace = {
  Root,
  Header,
  Body,
  Primary,
  Secondary,
  Footer,
};

export default BpkCardV2;
