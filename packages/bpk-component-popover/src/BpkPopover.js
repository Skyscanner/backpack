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
import React, { type Node } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { BpkButtonLink } from '../../bpk-component-link';
import BpkCloseButton from '../../bpk-component-close-button';
import { TransitionInitialMount, cssModules } from '../../bpk-react-utils';

import STYLES from './BpkPopover.module.scss';
import { ARROW_ID } from './constants';

const getClassName = cssModules(STYLES);

const EVENT_SOURCES = {
  CLOSE_BUTTON: 'CLOSE_BUTTON',
  CLOSE_LINK: 'CLOSE_LINK',
};

const bindEventSource = (source, callback) => (event) => {
  if (event.persist) {
    event.persist();
  }

  callback(event, { source });
};

export type Props = {
  children: Node,
  closeButtonIcon: boolean,
  closeButtonText: string,
  id: string,
  label: string,
  labelAsTitle: boolean,
  onClose: (
    event: SyntheticEvent<>,
    props: { source: $Values<typeof EVENT_SOURCES> },
  ) => mixed,
  padded: boolean,
  className: ?string,
  closeButtonProps: ?Object,
};

const BpkPopover = (props: Props) => {
  const {
    children,
    className,
    closeButtonIcon,
    closeButtonProps,
    closeButtonText,
    id,
    label,
    labelAsTitle,
    onClose,
    padded,
    ...rest
  } = props;

  const classNames = [getClassName('bpk-popover')];
  const bodyClassNames = [];

  // outer classNames
  if (className) {
    classNames.push(className);
  }

  // inner classNames
  if (padded) {
    bodyClassNames.push(getClassName('bpk-popover__body--padded'));
  }

  const labelId = `bpk-popover-label-${id}`;

  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-popover--appear')}
      appearActiveClassName={getClassName('bpk-popover--appear-active')}
      transitionTimeout={200}
    >
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <section
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={labelId}
        className={classNames.join(' ')}
        {...rest}
      >
        <span
          id={ARROW_ID}
          className={getClassName('bpk-popover__arrow')}
          role="presentation"
          data-popper-arrow
        />
        {labelAsTitle ? (
          <header className={getClassName('bpk-popover__header')}>
            <BpkText tagName="h2" id={labelId} textStyle={TEXT_STYLES.label1}>
              {label}
            </BpkText>
            &nbsp;
            {closeButtonIcon ? (
              <BpkCloseButton
                className={getClassName('bpk-popover__close-button')}
                label={closeButtonText}
                onClick={bindEventSource(
                  EVENT_SOURCES.CLOSE_BUTTON,
                  props.onClose,
                )}
                {...closeButtonProps}
              />
            ) : (
              <BpkButtonLink
                onClick={bindEventSource(
                  EVENT_SOURCES.CLOSE_LINK,
                  props.onClose,
                )}
                {...closeButtonProps}
              >
                {closeButtonText}
              </BpkButtonLink>
            )}
          </header>
        ) : (
          <span id={labelId} className={getClassName('bpk-popover__label')}>
            {label}
          </span>
        )}
        <div className={bodyClassNames.join(' ')}>{children}</div>
        {!labelAsTitle && (
          <footer className={getClassName('bpk-popover__footer')}>
            <BpkButtonLink
              onClick={bindEventSource(EVENT_SOURCES.CLOSE_LINK, props.onClose)}
              {...closeButtonProps}
            >
              {closeButtonText}
            </BpkButtonLink>
          </footer>
        )}
      </section>
    </TransitionInitialMount>
  );
};

export const propTypes = {
  children: PropTypes.node.isRequired,
  closeButtonText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  closeButtonIcon: PropTypes.bool,
  closeButtonProps: PropTypes.object,
  labelAsTitle: PropTypes.bool,
  padded: PropTypes.bool,
};

export const defaultProps = {
  className: null,
  closeButtonIcon: true,
  closeButtonProps: null,
  labelAsTitle: false,
  padded: true,
};

BpkPopover.propTypes = { ...propTypes };
BpkPopover.defaultProps = { ...defaultProps };

export default BpkPopover;
