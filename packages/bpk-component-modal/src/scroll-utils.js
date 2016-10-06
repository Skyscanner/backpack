import './scroll-utils.scss'

const NO_SCROLL_CLASS = 'bpk-no-scroll'
const SCROLL_BAR_MEASURE_CLASS = 'bpk-scroll-bar-measure'

const getWindow = () => typeof window !== 'undefined' ? window : null

const getBodyElement = () => typeof document !== 'undefined' ? document.body : null

const addClass = (element, className) => {
  if (!element) { return }

  if (element.classList) {
    element.classList.add(className)
  } else {
    element.className += ` ${className}`
  }
}

const removeClass = (element, className) => {
  if (!element) { return }

  if (element.classList) {
    element.classList.remove(className)
  } else {
    const regExp = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi')
    element.className = element.className.replace(regExp, ' ')
  }
}

const getScrollBarWidth = () => {
  let scrollBarWidth = 0
  const window = getWindow()
  const body = getBodyElement()

  if (body !== null && window !== null) {
    const bodyIsOverflowing = body.clientWidth < window.innerWidth

    if (bodyIsOverflowing) {
      const scrollDiv = document.createElement('div')
      scrollDiv.className = SCROLL_BAR_MEASURE_CLASS
      body.appendChild(scrollDiv)
      scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
      body.removeChild(scrollDiv)
    }
  }

  return scrollBarWidth
}

const rightPadBody = (paddingRight) => {
  const body = getBodyElement()

  if (body) {
    body.style.paddingRight = paddingRight === 0 ? '' : `${paddingRight}px`
  }
}

const lockScroll = () => {
  rightPadBody(getScrollBarWidth())
  addClass(getBodyElement(), NO_SCROLL_CLASS)
}

const unlockScroll = () => {
  removeClass(getBodyElement(), NO_SCROLL_CLASS)
  rightPadBody(0)
}

export { lockScroll, unlockScroll }
