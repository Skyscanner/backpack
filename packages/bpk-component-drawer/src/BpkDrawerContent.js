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

/* @flow strict */

import PropTypes from 'prop-types';
import type { Node } from 'react';

import Transition from 'react-transition-group/Transition';

import { animations } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkCloseButton from '../../bpk-component-close-button';
import { BpkButtonLink } from '../../bpk-component-link';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkDrawerContent.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  dialogRef: () => mixed,
  onCloseAnimationComplete: () => mixed,
  onClose: () => mixed,
  id: string,
  title: string,
  className: ?string,
  contentClassName: ?string,
  closeLabel: string,
  closeText: ?string,
  isDrawerShown: boolean,
  hideTitle: boolean,
  closeOnScrimClick: boolean,
  isIphone: boolean,
  isIpad: boolean,
  padded: boolean,
};

const BpkDrawerContent = (props: Props) => {
  const {
    children,
    className,
    closeLabel,
    closeOnScrimClick, // Unused from withScrim scrim HOC
    closeText,
    contentClassName,
    dialogRef,
    hideTitle,
    id,
    isDrawerShown,
    isIpad, // Unused from withScrim scrim HOC
    isIphone, // Unused from withScrim scrim HOC
    onClose,
    onCloseAnimationComplete,
    padded,
    title,
    ...rest
  } = props;

  const drawerClassNames = [getClassName('bpk-drawer')];
  const headerClassNames = [getClassName('bpk-drawer__heading')];
  const contentClassNames = [getClassName('bpk-drawer__content')];

  if (className) {
    drawerClassNames.push(className);
  }

  if (hideTitle) {
    headerClassNames.push(getClassName('bpk-drawer__heading--visually-hidden'));
  }

  if (padded) {
    contentClassNames.push(getClassName('bpk-drawer__content--padded'));
  }

  if (contentClassName) {
    contentClassNames.push(contentClassName);
  }

  const headingId = `bpk-drawer-heading-${id}`;

  return (
    <Transition
      timeout={{
        enter: 0,
        exit: parseInt(animations.durationSm, 10),
      }}
      appear
      enter={false}
      exit
      in={isDrawerShown}
      onExited={onCloseAnimationComplete}
    >
      {(status) => (
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
        <section
          id={id}
          tabIndex="-1"
          role="dialog"
          key="dialog"
          aria-labelledby={headingId}
          className={[
            drawerClassNames.join(' '),
            getClassName(`bpk-drawer--${status}`),
          ].join(' ')}
          ref={dialogRef}
          {...rest}
        >
          <header className={getClassName('bpk-drawer__header')}>
            <h2 id={headingId} className={headerClassNames.join(' ')}>
              {title}
            </h2>
            &nbsp;
            {closeText ? (
              <BpkButtonLink onClick={onClose}>{closeText}</BpkButtonLink>
            ) : (
              <div className={getClassName('bpk-drawer__close-button')}>
                <BpkCloseButton label={closeLabel} onClick={onClose} />
              </div>
            )}
          </header>
          <div className={contentClassNames.join(' ')}>{children}</div>
        </section>
      )}
    </Transition>
  );
};

BpkDrawerContent.propTypes = {
  children: PropTypes.node.isRequired,
  dialogRef: PropTypes.func.isRequired,
  onCloseAnimationComplete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string,
  isDrawerShown: PropTypes.bool,
  hideTitle: PropTypes.bool,
  closeOnScrimClick: PropTypes.bool,
  isIphone: PropTypes.bool,
  isIpad: PropTypes.bool,
};

BpkDrawerContent.defaultProps = {
  className: null,
  contentClassName: null,
  closeLabel: null,
  closeText: null,
  isDrawerShown: true,
  hideTitle: false,
  closeOnScrimClick: true,
  isIphone: false,
  isIpad: false,
};

export default BpkDrawerContent;
