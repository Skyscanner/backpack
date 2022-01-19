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

const getWindow = () => (typeof window !== 'undefined' ? window : null);

const getBodyElement = () =>
  typeof document !== 'undefined' && typeof document.body !== 'undefined'
    ? document.body
    : null;

const getScrollBarWidth = () => {
  let scrollBarWidth = 0;

  const window = getWindow();
  const body = getBodyElement();

  if (body === null && window === null) {
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

  body.style.position = 'fixed';
};

export const unfixBody = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  body.style.position = '';
};

export const lockScroll = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  const paddingRight = getScrollBarWidth();

  body.style.overflow = 'hidden';
  body.style.paddingRight = paddingRight;
};

export const unlockScroll = () => {
  const body = getBodyElement();

  if (!body) {
    return;
  }

  body.style.overflow = '';
  body.style.paddingRight = '';
};
