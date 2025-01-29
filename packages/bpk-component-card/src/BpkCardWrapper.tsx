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
import { useState } from 'react';

import BpkIconChevronDown from '../../bpk-component-icon/sm/chevron-down';
import BpkIconChevronUp from '../../bpk-component-icon/sm/chevron-up';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
import { cssModules, Portal } from '../../bpk-react-utils';

import { CardContext } from './CardContext';

import STYLES from './BpkCardWrapper.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  card: ReactNode;
  className?: string | null;
  backgroundColor: string;
  header: ReactNode;
  body?: {
    text: string;
    openBtnLabel: string;
    closeBtnLabel: string;
    link?: string;
    linkText?: string;
    moreInfoBtnColor?: string;
  };
};

const BpkCardWrapper = ({
  backgroundColor,
  body,
  card,
  className = null,
  header,
}: Props) => {
  const classNames = getClassName('bpk-card-wrapper', className);

  const [isBodyOpen, setIsBodyOpen] = useState(false);
  const toggleExpand = () => setIsBodyOpen(!isBodyOpen);
  const toggleLabel = isBodyOpen ? body?.closeBtnLabel : body?.openBtnLabel;

  const moreInfoToggle = (
    <div
      style={{
        fill: body?.moreInfoBtnColor,
        color: body?.moreInfoBtnColor,
      }}
      className={getClassName('bpk-card-wrapper--body--header--toggleLabel')}
    >
      <div
        className={getClassName(
          'bpk-card-wrapper--body--header--toggleLabel--text',
        )}
      >
        <BpkText textStyle={TEXT_STYLES.caption}>{toggleLabel}</BpkText>
      </div>
      {isBodyOpen ? <BpkIconChevronUp /> : <BpkIconChevronDown />}
    </div>
  );

  const headerWithBodyDiv = body && (
    <div
      className={getClassName(
        'bpk-card-wrapper--header',
        'bpk-card-wrapper--body--header',
      )}
    >
      <div className={getClassName('bpk-card-wrapper--body--header--content')}>
        {header}
      </div>
      <div>
        <button
          type="button"
          onClick={toggleExpand}
          className={getClassName('bpk-card-wrapper--body--header--button')}
        >
          {moreInfoToggle}
        </button>
        <Portal
          isOpen={isBodyOpen}
          renderTarget={document.getElementById('body-header')}
        >
          <div className={getClassName('bpk-card-wrapper--body')}>
            <BpkText textStyle={TEXT_STYLES.caption}>{body.text}</BpkText>
            {body.link && body.linkText && (
              <a
                href={body.link}
                className={getClassName('bpk-card-wrapper--body--link-text')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BpkText textStyle={TEXT_STYLES.caption}>
                  {body.linkText}
                </BpkText>
              </a>
            )}
          </div>
        </Portal>
      </div>
    </div>
  );

  return (
    <CardContext.Provider value={{ elevated: false }}>
      <div
        className={classNames}
        style={{
          // @ts-expect-error TS is reporting this incorrectly as --background-color is valid
          '--background-color': backgroundColor,
        }}
      >
        {body ? (
          <div
            className={getClassName('bpk-card-wrapper--body--header-container')}
            id="body-header"
          >
            {headerWithBodyDiv}
          </div>
        ) : (
          <div className={getClassName('bpk-card-wrapper--header')}>
            {header}
          </div>
        )}
        <div
          className={getClassName(
            'bpk-card-wrapper--content',
            body && isBodyOpen && 'bpk-card-wrapper--content--body-open',
          )}
        >
          {card}
        </div>
      </div>
    </CardContext.Provider>
  );
};

export default BpkCardWrapper;
