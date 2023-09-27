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

import { cssModules } from '../../bpk-react-utils';
import BpkSectionHeader from '../../bpk-component-section-header';

import STYLES from './BpkCardList.module.scss';

const getClassName = cssModules(STYLES);

export type layoutDesktopProps = 'row' | 'grid';
export type layoutMobileProps = 'rail' | 'stack';
type Props = {
  // accessory?: 'expand' | 'button' | 'pagination';
  // buttonText?: string;
  cardList: any[];
  description?: string;
  // expandText?: string;
  initiallyShownCards?: number;
  layoutDesktop: layoutDesktopProps;
  layoutMobile: layoutMobileProps;
  // onButtonClick?: Function;
  title: string;
};

const MAX_ITEMS = 12; // MAX should be 12 for Desktop Grid and Mobile Stack
const DEFAULT_ITEMS = 3;

const BpkCardList = (props: Props) => {
  const {
    cardList,
    description,
    initiallyShownCards = 3,
    layoutDesktop,
    layoutMobile,
    title,
  } = props;
  const classNames = getClassName('bpk-component-card-list');

  return (
    <div className={classNames}>
      <div className={getClassName('bpk-component-card-list__header')}>
        <BpkSectionHeader title={title} description={description} />
      </div>

      <div>CARD LIST</div>
    </div>
  );
};

export default BpkCardList;
