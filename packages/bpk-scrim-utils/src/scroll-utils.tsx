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

let scrollOffset = 0;
let previousTouchAction = '';
let previousOverscrollBehavior = '';

const getWindow = () => (typeof window !== 'undefined' ? window : null);

const getBodyElement = () =>
  typeof document !== 'undefined' && typeof document.body !== 'undefined'
    ? document.body
    : null;

const getScrollBarWidth = () => {
  let scrollBarWidth = 0;

  const window = getWindow();
  const body = getBodyElement();

  if (body === null || window === null) {
    return '';
  }

  const bodyIsOverflowing = body.clientWidth < window.innerWidth;

  if (bodyIsOverflowing) {
    const scrollDiv = document.createElement('div');

    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';

    body.appendChild(scrollDiv);
    scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    body.removeChild(scrollDiv);
  }

  return scrollBarWidth === 0 ? '' : `${scrollBarWidth}px`;
};

export const storeScroll = () => {
  const window = getWindow();

  if (window) {
    scrollOffset = window.pageYOffset;
  }
};

export const restoreScroll = () => {
  const window = getWindow();

  if (window) {
    window.scrollTo(0, scrollOffset);
  }
};

export const fixBody = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  // Set top before position:fixed so the browser doesn't jump to scrollY=0.
  // scrollOffset is captured by storeScroll() immediately before this call.
  body.style.top = `-${scrollOffset}px`;
  body.style.width = '100%';
  body.style.position = 'fixed';
};

export const unfixBody = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  body.style.position = '';
  body.style.top = '';
  body.style.width = '';
};

// Locks background scroll on the body. Safe to call on all platforms.
//
// Sets `overflow: hidden` to prevent the page behind a modal from scrolling,
// compensates for the hidden scrollbar with `padding-right`, and applies
// `overscroll-behavior: contain` to stop scroll chaining from modal content to
// the viewport. None of these block user touch gestures.
export const lockScroll = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  const paddingRight = getScrollBarWidth();

  previousOverscrollBehavior = body.style.overscrollBehavior;

  body.style.overflow = 'hidden';
  body.style.paddingRight = paddingRight;
  body.style.overscrollBehavior = 'contain';
};

export const unlockScroll = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  body.style.overflow = '';
  body.style.paddingRight = '';
  body.style.overscrollBehavior = previousOverscrollBehavior;
};

// Blocks touch gestures on the body via `touch-action: none`. iOS-only.
//
// On iOS Safari, `overflow: hidden` alone does not stop touch-scroll or
// rubber-band overscroll on the body — `touch-action: none` is needed. Do NOT
// call this on non-iOS platforms: `touch-action` combines with descendants'
// effective touch-action, so setting `none` on body blocks touch scrolling in
// any modal content that doesn't explicitly declare its own `touch-action`.
export const lockTouchAction = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  previousTouchAction = body.style.touchAction;
  body.style.touchAction = 'none';
};

export const unlockTouchAction = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  body.style.touchAction = previousTouchAction;
};
