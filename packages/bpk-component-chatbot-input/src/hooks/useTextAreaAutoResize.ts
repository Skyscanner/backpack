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

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface UseTextAreaAutoResizeProps {
  ref: RefObject<HTMLTextAreaElement>;
  value: string;
  enabled?: boolean;
}

interface UseTextAreaAutoResizeReturn {
  isExpanding: boolean;
  textareaHeight: number;
  containerHeight: number;
  shouldReduceParentPadding: boolean;
  scrollToBottom: () => void;
}

export const LINE_HEIGHT = 24;
export const MIN_INPUT_HEIGHT = LINE_HEIGHT;
export const MAX_INPUT_HEIGHT_PHASE_1 = LINE_HEIGHT * 4;
export const MAX_INPUT_HEIGHT_PHASE_2 = LINE_HEIGHT * 5;
export const MIN_CONTAINER_HEIGHT = 24;
export const MAX_CONTAINER_HEIGHT = 96;
export const PARENT_PADDING_TOP = 16;

const useTextAreaAutoResize = ({
  enabled = true,
  ref,
  value,
}: UseTextAreaAutoResizeProps): UseTextAreaAutoResizeReturn => {
  const [dimensions, setDimensions] = useState({
    isExpanding: false,
    textareaHeight: MIN_INPUT_HEIGHT,
    containerHeight: MIN_CONTAINER_HEIGHT,
    shouldReduceParentPadding: false,
  });
  const [containerWidth, setContainerWidth] = useState(0);
  const measureElementRef = useRef<HTMLTextAreaElement | null>(null);
  const lineHeightRef = useRef<number>(LINE_HEIGHT);
  const previousValueRef = useRef<string>('');
  const shouldScrollRef = useRef<boolean>(false);
  const isInitialRenderRef = useRef<boolean>(true);

  const scrollToBottom = useCallback(() => {
    if (ref?.current) {
      const textarea = ref.current;
      requestAnimationFrame(() => {
        textarea.scrollTop = textarea.scrollHeight;
      });
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!enabled || !ref?.current) {
      return undefined;
    }

    const textarea = ref.current;
    const computedStyle = getComputedStyle(textarea);
    const parsedLineHeight = parseFloat(computedStyle.lineHeight);
    if (!Number.isNaN(parsedLineHeight) && parsedLineHeight > 0) {
      lineHeightRef.current = parsedLineHeight;
    }
    const tempTextarea = document.createElement('textarea');
    tempTextarea.style.position = 'absolute';
    tempTextarea.style.visibility = 'hidden';
    tempTextarea.style.height = 'auto';
    tempTextarea.style.fontSize = computedStyle.fontSize;
    tempTextarea.style.fontFamily = computedStyle.fontFamily;
    tempTextarea.style.lineHeight = computedStyle.lineHeight;
    tempTextarea.style.padding = computedStyle.padding;
    tempTextarea.style.border = computedStyle.border;
    tempTextarea.style.boxSizing = computedStyle.boxSizing;
    tempTextarea.style.whiteSpace = 'pre-wrap';
    tempTextarea.style.overflowWrap = 'break-word';
    tempTextarea.style.width = `${textarea.offsetWidth}px`;
    tempTextarea.rows = 1;

    document.body.appendChild(tempTextarea);
    measureElementRef.current = tempTextarea;

    const resizeObserver = new ResizeObserver((entries) => {
      setContainerWidth(Math.round(entries[0].contentRect.width));
    });
    resizeObserver.observe(textarea);

    return () => {
      if (measureElementRef.current) {
        measureElementRef.current.remove();
        measureElementRef.current = null;
      }
      resizeObserver.disconnect();
    };
  }, [enabled, ref]);

  useLayoutEffect(() => {
    if (!enabled || !ref?.current || !measureElementRef.current) {
      return;
    }

    const textarea = ref.current;
    const measureEl = measureElementRef.current;

    measureEl.style.width = `${textarea.offsetWidth}px`;
    measureEl.value = value || ' ';

    const { scrollHeight } = measureEl;
    const lines = Math.max(1, Math.ceil(scrollHeight / lineHeightRef.current));

    const shouldReduceParentPadding = lines >= 5;
    const maxInputHeight = shouldReduceParentPadding
      ? MAX_INPUT_HEIGHT_PHASE_2
      : MAX_INPUT_HEIGHT_PHASE_1;

    const targetInputHeight = Math.max(
      MIN_INPUT_HEIGHT,
      Math.min(scrollHeight, maxInputHeight),
    );

    const extraSpace = shouldReduceParentPadding ? PARENT_PADDING_TOP : 0;
    const targetContainerHeight = Math.max(
      MIN_CONTAINER_HEIGHT,
      Math.min(targetInputHeight - extraSpace, MAX_CONTAINER_HEIGHT),
    );

    setDimensions((prev) => {
      const isContentAdded = value.length > previousValueRef.current.length;
      const isAppending = value.startsWith(previousValueRef.current);
      const prevMaxHeight = prev.shouldReduceParentPadding
        ? MAX_INPUT_HEIGHT_PHASE_2
        : MAX_INPUT_HEIGHT_PHASE_1;

      const isInitialRender = isInitialRenderRef.current;
      const shouldScroll =
        (isContentAdded &&
          isAppending &&
          textarea.scrollHeight > prevMaxHeight) ||
        (isInitialRender && scrollHeight > maxInputHeight);

      shouldScrollRef.current = shouldScroll;

      if (isInitialRender) {
        isInitialRenderRef.current = false;
      }

      return {
        isExpanding: lines > 1,
        textareaHeight: targetInputHeight,
        containerHeight: targetContainerHeight,
        shouldReduceParentPadding,
      };
    });

    previousValueRef.current = value;
  }, [value, ref, enabled, containerWidth]);

  useLayoutEffect(() => {
    if (shouldScrollRef.current) {
      scrollToBottom();
      shouldScrollRef.current = false;
    }
  }, [dimensions, scrollToBottom]);

  return {
    ...dimensions,
    scrollToBottom,
  };
};

export default useTextAreaAutoResize;
