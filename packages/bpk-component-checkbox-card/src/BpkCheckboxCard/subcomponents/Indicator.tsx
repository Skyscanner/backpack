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

import { cssModules } from '../../../../bpk-react-utils';

import STYLES from '../BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

export type IndicatorProps = Record<string, never>;

/**
 * BpkCheckboxCard.Indicator - Visual corner indicator
 *
 * Renders a circular checkbox indicator in the top-right corner of the card.
 * Empty circle when unchecked; filled with a checkmark when checked.
 * The visual state is driven entirely by the parent Root's CSS modifier classes.
 *
 * Place this as a direct child of BpkCheckboxCard.Root, alongside Control and Content.
 *
 * @example
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Indicator />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @returns {JSX.Element} Rendered visual indicator in top-right corner.
 */

export function Indicator(_props: IndicatorProps = {}) {
  const className = getClassName('bpk-checkbox-card-indicator');
  return <div className={className} aria-hidden />;
}
