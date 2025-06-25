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

import type { ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import { CardContext } from './CardContext';

import STYLES from './BpkCardWrapper.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  card: ReactNode;
  className?: string | null;
  backgroundColor: string;
  header: ReactNode;
};

const BpkCardWrapper = ({
  backgroundColor,
  card,
  className = null,
  header,
}: Props) => {
  const classNames = getClassName('bpk-card-wrapper', className);

  return (
    <CardContext.Provider value={{ elevated: false }}>
      <div
        className={classNames}
        style={{
          // @ts-expect-error TS(2322) FIXME: Type '{ '--background-color': string; }' is not as... Remove this comment to see the full error message
          '--background-color': backgroundColor,
        }}
      >
        <div className={getClassName('bpk-card-wrapper--header')}>{header}</div>
        <div className={getClassName('bpk-card-wrapper--content')}>{card}</div>
      </div>
    </CardContext.Provider>
  );
};

export default BpkCardWrapper;
