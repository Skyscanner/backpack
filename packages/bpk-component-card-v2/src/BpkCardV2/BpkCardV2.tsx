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
import Divider from './subcomponents/Divider';
import Footer from './subcomponents/Footer';
import Header from './subcomponents/Header';
import Root from './subcomponents/Root';
import Section from './subcomponents/Section';

import type { BpkCardV2Namespace } from './common-types';

/**
 * BpkCardV2 is a composable, responsive card component namespace for Backpack.
 *
 * It provides subcomponents for explicit multi-section composition (Root, Header, Body, Footer),
 * flexible multi-column layouts (Section/Divider), and customizable surface colors.
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
 * // Multi-column layout (70/30 on desktop, stacked on mobile)
 * <BpkCardV2.Root bgColor="surfaceElevated">
 *   <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '7fr auto 3fr' }}>
 *     <BpkCardV2.Section>Main content</BpkCardV2.Section>
 *     <BpkCardV2.Divider />
 *     <BpkCardV2.Section>Sidebar</BpkCardV2.Section>
 *   </BpkCardV2.Body>
 * </BpkCardV2.Root>
 */
const BpkCardV2: BpkCardV2Namespace = {
  Root,
  Header,
  Body,
  Section,
  Divider,
  Footer,
};

export default BpkCardV2;
