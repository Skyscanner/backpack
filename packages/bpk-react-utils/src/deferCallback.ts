/**
 * Defer a task until the browser is idle, or till the next "tick" if the
 * browser does not support the idle callback API. This is useful for deferring
 * computationally heavy, non-essential tasks to keep the UI responsive. If the
 * task has not completed within the timeout, it will be executed regardless.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
 * @param {function} callback - callback to execute, value cannot be returned.
 * You'll typically want to wrap the callback `setState` to update React state.
 * @returns {void}
 */
const deferCallback = (callback: () => void) => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(callback, { timeout: 1000 });
  } else {
    setTimeout(callback, 0);
  }
};

export default deferCallback;
