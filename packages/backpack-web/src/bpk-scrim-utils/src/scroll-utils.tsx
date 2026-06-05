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

// Module-level state is intentional: the <body> element is a global singleton,
// so nested scrims must coordinate through a shared counter. Each lock/unlock
// pair maintains its own depth counter so the "save original value, apply
// locked value" logic only runs on the 0↔1 transition. Inner nested calls are
// no-ops that simply bump the counter. This prevents the inner scrim from
// overwriting the outer scrim's saved "pre-lock" value — see the Nested story
// in BpkModal.stories.tsx.
let scrollOffset = 0;
let savedTouchAction = '';
let savedOverscrollBehavior = '';
let fixBodyDepth = 0;
let lockScrollDepth = 0;
let lockTouchActionDepth = 0;

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
  // Skip while an outer scrim already fixed the body: pageYOffset reads 0 once
  // the body is position:fixed, so capturing it would clobber the outer
  // scroll position and cause restoreScroll to jump back to the top on close.
  if (fixBodyDepth > 0) {
    return;
  }

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

  if (fixBodyDepth === 0) {
    // Set top before position:fixed so the browser doesn't jump to scrollY=0.
    // scrollOffset is captured by storeScroll() immediately before this call.
    body.style.top = `-${scrollOffset}px`;
    body.style.width = '100%';
    body.style.position = 'fixed';
  }
  fixBodyDepth += 1;
};

export const unfixBody = () => {
  const body = getBodyElement();

  if (!body || fixBodyDepth === 0) {
    return;
  }

  fixBodyDepth -= 1;
  if (fixBodyDepth === 0) {
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
  }
};

// Locks background scroll on the body. Safe to call on all platforms.
// None of these block user touch gestures.
export const lockScroll = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  if (lockScrollDepth === 0) {
    savedOverscrollBehavior = body.style.overscrollBehavior;
    body.style.overflow = 'hidden';
    body.style.paddingRight = getScrollBarWidth();
    body.style.overscrollBehavior = 'contain';
  }
  lockScrollDepth += 1;
};

export const unlockScroll = () => {
  const body = getBodyElement();

  if (!body || lockScrollDepth === 0) {
    return;
  }

  lockScrollDepth -= 1;
  if (lockScrollDepth === 0) {
    body.style.overflow = '';
    body.style.paddingRight = '';
    body.style.overscrollBehavior = savedOverscrollBehavior;
  }
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

  if (lockTouchActionDepth === 0) {
    savedTouchAction = body.style.touchAction;
    body.style.touchAction = 'none';
  }
  lockTouchActionDepth += 1;
};

export const unlockTouchAction = () => {
  const body = getBodyElement();

  if (!body || lockTouchActionDepth === 0) {
    return;
  }

  lockTouchActionDepth -= 1;
  if (lockTouchActionDepth === 0) {
    body.style.touchAction = savedTouchAction;
  }
};
