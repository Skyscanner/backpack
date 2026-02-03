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
import BpkBreadcrumb, {
  BpkBreadcrumbItem,
} from '../../packages/bpk-component-breadcrumb';

const DefaultExample = () => (
  <BpkBreadcrumb label="Default breadcrumb">
    <BpkBreadcrumbItem href="/">Home</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-1">Page 1</BpkBreadcrumbItem>
    <BpkBreadcrumbItem active>Page 2</BpkBreadcrumbItem>
  </BpkBreadcrumb>
);

const ExtremeExample = () => (
  <BpkBreadcrumb label="Extreme breadcrumb">
    <BpkBreadcrumbItem href="/">Home</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-1" id="123" linkProps={{ target: '_blank' }}>
      Page 1
    </BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-2">Page 2</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-3">Page 3</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-4">Page 4</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-5">Page 5</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-6">Page 6</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-7">Page 7</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-8">Page 8</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-9">Page 9</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-10">Page 10</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-11">Page 11</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-12">Page 12</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-13">Page 13</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-14">Page 14</BpkBreadcrumbItem>
    <BpkBreadcrumbItem href="/page-15">Page 15</BpkBreadcrumbItem>
    <BpkBreadcrumbItem active>Page 16</BpkBreadcrumbItem>
  </BpkBreadcrumb>
);

export { DefaultExample, ExtremeExample };