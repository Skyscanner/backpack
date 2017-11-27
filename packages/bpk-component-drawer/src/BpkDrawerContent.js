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

import STYLES from './bpk-drawer-content.scss';

const getClassName = cssModules(STYLES);

const BpkDrawerContent = (props) => {
  const drawerClassNames = [getClassName('bpk-drawer')];
  const headerClassNames = [getClassName('bpk-drawer__heading')];
  const contentClassNames = [getClassName('bpk-drawer__content')];

  if (props.className) {
    drawerClassNames.push(props.className);
  }

  if (props.hideTitle) {
    headerClassNames.push(getClassName('bpk-drawer__heading--visually-hidden'));
  }

  if (props.contentClassName) {
    contentClassNames.push(props.contentClassName);
  }

  const headingId = `bpk-drawer-heading-${props.id}`;

  return (
    <Transition
      timeout={{
        enter: 0,
        exit: parseInt(animations.durationSm, 10),
      }}
      appear
      enter={false}
      exit
      in={props.isDrawerShown}
      onExited={props.onCloseAnimationComplete}
    >
      {status => (
        <section
          id={props.id}
          tabIndex="-1"
          role="dialog"
          key="dialog"
          aria-labelledby={headingId}
          className={[drawerClassNames.join(' '), getClassName(`bpk-drawer--${status}`)].join(' ')}
          ref={props.getDialogRef}
          {...props.closeEvents}
        >
          <header className={getClassName('bpk-drawer__header')}>
            <h2 id={headingId} className={headerClassNames.join(' ')}>
              {props.title}
            </h2>
            &nbsp;
            {props.closeText
              ? <BpkButtonLink onClick={props.onClose}>{props.closeText}</BpkButtonLink>
              : <BpkCloseButton
                className={getClassName('bpk-drawer__close-button')}
                label={props.closeLabel}
                onClick={props.onClose}
              />
            }
          </header>
          <div className={contentClassNames.join(' ')}>
            {props.children}
          </div>
        </section>
        )}
    </Transition>
  );
};

BpkDrawerContent.propTypes = {
  getDialogRef: PropTypes.func.isRequired,
  closeEvents: PropTypes.shape({
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseUp: PropTypes.func,
  }).isRequired,
  isDrawerShown: PropTypes.bool,
  onCloseAnimationComplete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string,
  hideTitle: PropTypes.bool,
};

BpkDrawerContent.defaultProps = {
  className: null,
  contentClassName: null,
  closeLabel: null,
  closeText: null,
  isDrawerShown: true,
  hideTitle: false,
};

export default BpkDrawerContent;
