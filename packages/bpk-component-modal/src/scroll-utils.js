let scrollOffset = 0;

const getWindow = () => (typeof window !== 'undefined' ? window : null);

const getBodyElement = () => (
  typeof document !== 'undefined' && typeof document.body !== 'undefined' ? document.body : null
);

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
