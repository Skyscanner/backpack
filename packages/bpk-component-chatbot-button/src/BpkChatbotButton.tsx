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

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';

import { iconSizeLg } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../bpk-component-button';
import { withAlignment } from '../../bpk-component-icon';
import AiIcon from '../../bpk-component-icon/lg/ai';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkChatbotButton.module.scss';

const getClassName = cssModules(STYLES);

const AlignedAiIcon = withAlignment(AiIcon, iconSizeLg, iconSizeLg);

const DEFAULT_ANIMATION_DURATION = 2000;
const COLLAPSE_DELAY = 250;

export type BpkChatbotButtonProps = {
  /** Text shown when expanded; used as aria-label when collapsed */
  label: string;
  /** Icon to display. Defaults to the Backpack AI icon */
  icon?: ReactNode;
  /** Controlled expanded state */
  expanded?: boolean;
  /**
   * When true, triggers an auto-expand → auto-collapse animation cycle.
   * Only applies when `expanded` is not provided (uncontrolled mode).
   */
  isAnimate?: boolean;
  /** Duration in ms to stay expanded when isAnimate is true. Default: 2000 */
  animationDuration?: number;
  /** Note: click events do not bubble — stopPropagation is called internally to prevent triggering parent click handlers. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const BpkChatbotButton = ({
  animationDuration = DEFAULT_ANIMATION_DURATION,
  disabled = false,
  expanded,
  icon,
  isAnimate = false,
  label,
  onClick,
}: BpkChatbotButtonProps) => {
  const isControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const isPageVisibleRef = useRef(
    typeof document !== 'undefined' && document.visibilityState === 'visible',
  );

  // Reset on tab switch back to page
  useEffect(() => {
    if (isControlled) {
      return undefined;
    }

    const handleVisibilityChange = () => {
      const wasHidden = !isPageVisibleRef.current;
      isPageVisibleRef.current = document.visibilityState === 'visible';

      if (wasHidden && isPageVisibleRef.current) {
        setInternalExpanded(false);
        setShowLabel(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isControlled]);

  // Auto-expand/collapse cycle driven by isAnimate
  useEffect(() => {
    if (isControlled || !isAnimate) {
      if (!isControlled) {
        setInternalExpanded(false);
        setShowLabel(false);
      }
      return undefined;
    }

    let rafId: number | null = null;
    let hideTimerId: ReturnType<typeof setTimeout> | undefined;
    let collapseTimerId: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(hideTimerId);
      clearTimeout(collapseTimerId);
    };

    if (isPageVisibleRef.current) {
      rafId = requestAnimationFrame(() => {
        setInternalExpanded(true);
        setShowLabel(true);
      });
    }

    hideTimerId = setTimeout(() => {
      setShowLabel(false);
      collapseTimerId = setTimeout(() => {
        setInternalExpanded(false);
      }, COLLAPSE_DELAY);
    }, animationDuration);

    return cleanup;
  }, [isAnimate, isControlled, animationDuration]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClick?.(e);
    },
    [onClick],
  );

  const isExpanded = isControlled ? expanded! : internalExpanded;
  // In controlled mode the label is always visible when expanded; in uncontrolled mode
  // showLabel drives the fade-out before the button collapses.
  const labelVisible = isControlled || showLabel;

  const iconEl = icon ?? <AlignedAiIcon aria-hidden />;

  return (
    <span
      className={getClassName(
        'bpk-chatbot-button',
        isExpanded && 'bpk-chatbot-button--expanded',
      )}
    >
      <BpkButton
        type={BUTTON_TYPES.featured}
        size={SIZE_TYPES.large}
        iconOnly={!isExpanded}
        disabled={disabled}
        aria-label={!isExpanded ? label : undefined}
        aria-expanded={isExpanded}
        data-testid="bpk-chatbot-button"
        onClick={handleClick}
        leadingIcon={isExpanded ? iconEl : undefined}
        {...getDataComponentAttribute('ChatbotButton')}
      >
        {isExpanded ? (
          <BpkText
            textStyle={TEXT_STYLES.label1}
            style={{ opacity: labelVisible ? 1 : 0 }}
          >
            {label}
          </BpkText>
        ) : (
          iconEl
        )}
      </BpkButton>
    </span>
  );
};

export default BpkChatbotButton;
