let scrollOffset = 0

const getWindow = () => {
  return typeof window !== 'undefined' ? window : null
}

const getBodyElement = () => {
  return typeof document !== 'undefined' && typeof document.body !== 'undefined' ? document.body : null
}

const getScrollBarWidth = () => {
  let scrollBarWidth = 0
  const window = getWindow()
  const body = getBodyElement()

  if (body !== null && window !== null) {
    const bodyIsOverflowing = body.clientWidth < window.innerWidth

    if (bodyIsOverflowing) {
      const scrollDiv = document.createElement('div')

      scrollDiv.style.position = 'absolute'
      scrollDiv.style.top = '-9999px'
      scrollDiv.style.width = '50px'
      scrollDiv.style.height = '50px'
      scrollDiv.style.overflow = 'scroll'

      body.appendChild(scrollDiv)
      scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
      body.removeChild(scrollDiv)
    }
  }

  return scrollBarWidth === 0 ? '' : `${scrollBarWidth}px`
}

const manipulateBodyScroll = ({ lock, isMobileSafari }) => {
  const window = getWindow()
  const body = getBodyElement()

  if (!body && !window) { return }

  let bodyStyle = {
    'overflow': lock ? 'hidden' : '',
    'paddingRight': lock ? getScrollBarWidth() : ''
  }

  if (isMobileSafari) {
    if (lock) {
      scrollOffset = window.pageYOffset
    }

    bodyStyle[ 'position' ] = lock ? 'fixed' : ''
    bodyStyle[ 'top' ] = lock ? `-${scrollOffset}px` : ''
    bodyStyle[ 'width' ] = lock ? '100%' : ''
    bodyStyle[ 'height' ] = lock ? '100%' : ''
  }

  Object.keys(bodyStyle).forEach((key) => {
    body.style[ key ] = bodyStyle[ key ]
  })

  if (isMobileSafari && !lock) {
    window.scrollTo(0, scrollOffset)
  }
}

export const lockScroll = ({ isMobileSafari }) => {
  manipulateBodyScroll({ lock: true, isMobileSafari })
}

export const unlockScroll = ({ isMobileSafari }) => {
  manipulateBodyScroll({ lock: false, isMobileSafari })
}
