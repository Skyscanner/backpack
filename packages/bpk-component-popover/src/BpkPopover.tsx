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

import type { SyntheticEvent, ReactNode, ReactElement } from 'react';
import {
  useState,
  useEffect,
  useRef,
  cloneElement,
  isValidElement,
} from 'react';

import {
  useFloating,
  autoUpdate,
  offset,
  useClick,
  useDismiss,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
  arrow,
  FloatingArrow,
  shift,
  useHover,
  safePolygon,
} from '@floating-ui/react';

import { surfaceHighlightDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
import BpkLink from '../../bpk-component-link';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { TransitionInitialMount, cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { ARROW_ID } from './constants';

import type { Placement } from '@floating-ui/react';

import STYLES from './BpkPopover.module.scss';

const getClassName = cssModules(STYLES);

const EVENT_SOURCES = {
  CLOSE_BUTTON: 'CLOSE_BUTTON',
  CLOSE_LINK: 'CLOSE_LINK',
  CLOSE_OUTSIDE: 'CLOSE_OUTSIDE',
};

// The stroke width is used to set the border width of the arrow.
const strokeWidth = 0.0625;

const bindEventSource = (
  source: string,
  callback: any,
  event: SyntheticEvent<HTMLButtonElement>,
) => {
  if (event.persist) {
    event.persist();
  }

  callback(event, { source });
};

type CloseButtonProps =
  | {
      /**
       * @deprecated close button text is deprecated. Instead, please use `closeButtonIcon`, or you may opt not to render a close button at all.
       */
      closeButtonText: string;
    }
  | {
      closeButtonText?: never;
    };

export type Props = CloseButtonProps & {
  children: ReactNode;
  id: string;
  label: string;
  onClose: (
    event: SyntheticEvent<HTMLButtonElement> | null,
    props: { source: (typeof EVENT_SOURCES)[keyof typeof EVENT_SOURCES] },
  ) => void;
  className?: string | null;
  closeButtonIcon?: boolean;
  closeButtonProps?: Object;
  hoverable?: boolean;
  isOpen?: boolean;
  labelAsTitle?: boolean;
  padded?: boolean;
  placement?: Placement;
  showArrow?: Boolean;
  target: ReactElement<any>;
  closeButtonLabel?: string;
  actionText?: string;
  zIndexValue?: number;
  onAction?: () => void;
  renderTarget?: () => HTMLElement | HTMLElement | undefined;
  [rest: string]: any;
};

const BpkPopover = ({
  actionText,
  children,
  className = null,
  closeButtonIcon = true,
  closeButtonLabel,
  closeButtonProps = {},
  closeButtonText,
  hoverable = false,
  id,
  isOpen = false,
  label,
  labelAsTitle = false,
  onAction,
  onClose,
  padded = true,
  placement = 'bottom',
  renderTarget = () => undefined,
  showArrow = true,
  target,
  zIndexValue = 900,
  ...rest
}: Props) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setIsOpenState(false);
    }
  }, [isOpen]);

  const arrowRef = useRef(null);

  const onFloatingChange = (isFloatingOpen: boolean) => {
    setIsOpenState(isFloatingOpen);
    if (!isFloatingOpen && onClose) {
      onClose(null, { source: EVENT_SOURCES.CLOSE_OUTSIDE});
    }
  }

  const { context, floatingStyles, refs } = useFloating({
    open: isOpenState,
    onOpenChange: onFloatingChange,
    placement,
    middleware: [
      showArrow && offset(17),
      shift(),
      showArrow && arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const hover = useHover(context, {
    enabled: hoverable,
    mouseOnly: true,
    handleClose: safePolygon({
      requireIntent: false,
    }),
  });

  // Merge all the interactions into prop getters
  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss, hover]);

  const targetClick = target?.props?.onClick;
  const referenceProps = targetClick ? getReferenceProps({
    onClick: event => {
      if (targetClick) {
        event.stopPropagation();
        targetClick(event);
      }
    }
}) : getReferenceProps();

  const targetElement = isValidElement(target) ? (
    cloneElement(target, {
      ...referenceProps,
      // @ts-ignore - we're adding a popover ref to the target element so we can position the popover relative to it
      ref: refs.setReference,
    })
  ) : (
    <div ref={refs.setReference} {...referenceProps}>
      {target}
    </div>
  );

  const classNames = getClassName('bpk-popover', className);
  const bodyClassNames = getClassName(padded && 'bpk-popover__body--padded');

  const labelId = `bpk-popover-label-${id}`;
  const renderElement = typeof renderTarget === 'function' ? renderTarget() : renderTarget;

  return (
    <>
      {targetElement}
      {isOpenState && (
        <FloatingPortal root={renderElement}>
          <FloatingFocusManager context={context}>
            <div
              className={getClassName('bpk-popover--container')}
              ref={refs.setFloating}
              {...getFloatingProps()}
              style={{ ...floatingStyles, zIndex: zIndexValue }}
            >
              <TransitionInitialMount
                appearClassName={getClassName('bpk-popover--appear')}
                appearActiveClassName={getClassName(
                  'bpk-popover--appear-active',
                )}
                transitionTimeout={200}
              >
                <section
                  id={id}
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby={labelId}
                  className={classNames} {...getDataComponentAttribute('Popover')}
                  {...rest}
                >
                  {showArrow && (
                    <FloatingArrow
                      ref={arrowRef}
                      context={context}
                      id={ARROW_ID}
                      className={getClassName('bpk-popover__arrow')}
                      role="presentation"
                      stroke={surfaceHighlightDay}
                      strokeWidth={strokeWidth}
                    />
                  )}
                  {labelAsTitle ? (
                    <header className={getClassName('bpk-popover__header')}>
                      <BpkText
                        tagName="h2"
                        id={labelId}
                        textStyle={TEXT_STYLES.label1}
                      >
                        {label}
                      </BpkText>
                      &nbsp;
                      {closeButtonIcon ? (
                        <BpkCloseButton
                          label={closeButtonText || closeButtonLabel}
                          onClick={(
                            event: SyntheticEvent<HTMLButtonElement>,
                          ) => {
                            bindEventSource(
                              EVENT_SOURCES.CLOSE_BUTTON,
                              onClose,
                              event,
                            );
                            setIsOpenState(false);
                          }}
                          {...closeButtonProps}
                        />
                      ) : (
                        closeButtonText && (
                          <BpkLink
                            as="button"
                            onClick={(
                              event: SyntheticEvent<HTMLButtonElement>,
                            ) => {
                              bindEventSource(
                                EVENT_SOURCES.CLOSE_LINK,
                                onClose,
                                event,
                              );
                              setIsOpenState(false);
                            }}
                            {...closeButtonProps}
                          >
                            {closeButtonText}
                          </BpkLink>
                        )
                      )}
                    </header>
                  ) : (
                    <span
                      id={labelId}
                      className={getClassName('bpk-popover__label')}
                    >
                      {label}
                    </span>
                  )}
                  <div className={bodyClassNames}>{children}</div>
                  {actionText && onAction && (
                    <div className={getClassName('bpk-popover__action')}>
                      <BpkLink as="button" onClick={onAction}>
                        {actionText}
                      </BpkLink>
                    </div>
                  )}
                  {!labelAsTitle && closeButtonText && (
                    <footer className={getClassName('bpk-popover__footer')}>
                      <BpkLink
                        as="button"
                        onClick={(event: SyntheticEvent<HTMLButtonElement>) => {
                          bindEventSource(
                            EVENT_SOURCES.CLOSE_LINK,
                            onClose,
                            event,
                          );
                          setIsOpenState(false);
                        }}
                        {...closeButtonProps}
                      >
                        {closeButtonText}
                      </BpkLink>
                    </footer>
                  )}
                </section>
              </TransitionInitialMount>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
export default BpkPopover;