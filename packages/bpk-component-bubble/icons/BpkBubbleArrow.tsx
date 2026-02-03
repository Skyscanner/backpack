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
type Props = {
  styles?: string;
};

const BpkBubbleArrow = ({ styles }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="5"
    viewBox="0 0 23 5"
    fill="none"
    aria-hidden="true"
    className={styles}
  >
    <path
      d="M22.4116 0C21.4371 0.0363497 20.4853 0.288304 19.639 0.740739L13.1471 4.20667C12.6461 4.47294 12.0775 4.6127 11.4996 4.6127C10.9219 4.61263 10.354 4.47288 9.8531 4.20667L3.36122 0.740739C2.51489 0.28829 1.56307 0.0363716 0.588623 0H22.4116Z"
      fill="currentColor"
    />
  </svg>
);

export default BpkBubbleArrow;
