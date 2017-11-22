/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { animations } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';
import { BpkButtonLink } from 'bpk-component-link';
import BpkCloseButton from 'bpk-component-close-button';

import STYLES from './bpk-sliding-drawer-content.scss';

const getClassName = cssModules(STYLES);

const BpkSlidingDrawerContent = (props) => {
  const contentClassNames = [getClassName('bpk-sliding-drawer')];
  const headerClassNames = [getClassName('bpk-sliding-drawer__heading')];

  if (props.className) {
    contentClassNames.push(props.className);
  }

  if (props.hideTitle) {
    headerClassNames.push(getClassName('bpk-sliding-drawer__heading--visually-hidden'));
  }

  const headingId = `bpk-sliding-drawer-heading-${props.id}`;

  return (
    <Transition
      timeout={{
        enter: 0,
        exit: parseInt(animations.durationSm, 10),
      }}
      appear
      enter={false}
      exit
      in={props.show}
      onExited={props.onExited}
    >
      {status => (
        <section
          id={props.id}
          tabIndex="-1"
          role="dialog"
          key="dialog"
          aria-labelledby={headingId}
          className={[contentClassNames.join(' '), getClassName(`bpk-sliding-drawer--${status}`)].join(' ')}
          ref={props.getDialogRef}
          {...props.closeEvents}
        >
          <header className={getClassName('bpk-sliding-drawer__header')}>
            <h2 id={headingId} className={headerClassNames.join(' ')}>
              {props.title}
            </h2>
            &nbsp;
            {props.closeText
              ? <BpkButtonLink onClick={props.onClose}>{props.closeText}</BpkButtonLink>
              : <BpkCloseButton
                className={getClassName('bpk-sliding-drawer__close-button')}
                label={props.closeLabel}
                onClick={props.onClose}
              />
            }
          </header>
          <div className={getClassName('bpk-sliding-drawer__content')}>
            {props.children}
          </div>
        </section>
        )}
    </Transition>
  );
};

BpkSlidingDrawerContent.propTypes = {
  getDialogRef: PropTypes.func.isRequired,
  closeEvents: PropTypes.shape({
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseUp: PropTypes.func,
  }).isRequired,
  show: PropTypes.bool,
  onExited: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string,
  hideTitle: PropTypes.bool,
};

BpkSlidingDrawerContent.defaultProps = {
  className: null,
  closeLabel: null,
  closeText: null,
  show: true,
  hideTitle: false,
};

export default BpkSlidingDrawerContent;
