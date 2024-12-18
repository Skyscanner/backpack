/**
 * Mock deferCallback to immediately invoke the callback. This ensures that
 * asynchronous state updates triggered by `deferCallback` run before asserting.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
 * @param {function} callback - callback to execute, value cannot be returned.
 * You'll typically want to wrap the callback `setState` to update React state.
 * @returns {void}
 */
export default function deferCallback(callback: () => void) {
  callback();
}
