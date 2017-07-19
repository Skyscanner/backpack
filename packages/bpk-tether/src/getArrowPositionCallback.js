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

// For compat with various IE browsers who haven't implemented classList yet.
// See http://youmightnotneedjquery.com/#has_class.
const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }

  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
};

const getArrowPositionCallback = (popoverElement = {}, arrowId, classNamePrefix = 'bpk-popover-tether') => {
  let arrowElement = null;

  if (popoverElement.querySelector) {
    arrowElement = popoverElement.querySelector(`#${arrowId}`);
  }

  if (arrowElement === null) {
    return () => null;
  }

  return (props) => {
    const { top, left, targetPos } = props;

    const shouldApplyLeftOffset =
      hasClass(popoverElement, `${classNamePrefix}-element-attached-top`)
      || hasClass(popoverElement, `${classNamePrefix}-element-attached-bottom`);

    if (shouldApplyLeftOffset) {
      const leftOffset = (targetPos.left + (targetPos.width / 2)) - left;

      arrowElement.style.top = '';
      arrowElement.style.left = `${leftOffset}px`;
    } else {
      const topOffset = (targetPos.top + (targetPos.height / 2)) - top;

      arrowElement.style.top = `${topOffset}px`;
      arrowElement.style.left = '';
    }
  };
};

export default getArrowPositionCallback;
