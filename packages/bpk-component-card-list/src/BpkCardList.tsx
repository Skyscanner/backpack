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

import { BpkButtonV2 } from '../../bpk-component-button';
import BpkSectionHeader from '../../bpk-component-section-header';
import { cssModules } from '../../bpk-react-utils';

import type CardListProps from './common-types';

import STYLES from './BpkCardList.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardList = (props: CardListProps) => {
  const {
    buttonHref,
    buttonText,
    description,
    onButtonClick,
    title,
  } = props;

  const button = buttonText && (
    <BpkButtonV2 onClick={onButtonClick} href={buttonHref}>{buttonText}</BpkButtonV2>
  );

  return (
    <div className={getClassName('bpk-card-list')}>
      <BpkSectionHeader
        title={title}
        description={description}
        button={button}
      />

      <div
        className={getClassName('bpk-card-list--card-list')}
        data-testid="bpk-card-list--card-list"
      >
        TODO: CARDS
      </div>
    </div>
  );
};

export default BpkCardList;
