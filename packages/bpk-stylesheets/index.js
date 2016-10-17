import './index.scss'

(() => {
  if (typeof document === 'undefined') {
    return
  }

  const classNames = []

  // touch support
  classNames.push(
    (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) // eslint-disable-line
      ? 'touch-support'
      : 'no-touch-support'
  )

  // add more feature tests here...

  document.documentElement.className += ` ${classNames.map(className => `bpk-${className}`).join(' ')}`
})()
