import { calendarDaySize, calendarDaySpacing } from 'bpk-tokens/tokens/base.es6';

const remToPx = (value) => {
  let parsed = null;

  if (/rem$/.test(value)) {
    parsed = parseFloat(value.replace(/rem/, '')) * 16;
  }

  return parsed || null;
};

export const getCalendarGridWidth = () => 7 * (
  remToPx(calendarDaySize) + remToPx(calendarDaySpacing)
);

export const getTransformStyles = (transformValue) => {
  const transform = `translateX(${transformValue}px)`;
  return {
    transform,
    msTransform: transform,
    MozTransform: transform,
    WebkitTransform: transform,
  };
};

export const getScriptDirection = () => {
  const html = document.querySelector('html');
  return window.getComputedStyle(html, null).getPropertyValue('direction');
};

export const isTransitionEndSupported = () => !!(typeof window !== 'undefined' && 'TransitionEvent' in window);
