import React from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import ReactDOMServer from 'react-dom/server'
import { Router, RouterContext, match, browserHistory, createMemoryHistory } from 'react-router'

import Routes from './routes'
import template from './template.js'

if (typeof document !== 'undefined') {
  const root = document.getElementById('react-mount')

  ReactDOM.render(<Router history={browserHistory} routes={Routes} />, root)
}

export default (locals, callback) => {
  const history = createMemoryHistory()
  const location = history.createLocation(locals.path)

  match({ routes: Routes, location, history }, (error, redirectLocation, props) => {
    if (error) { return callback(error) }

    const head = Helmet.rewind()
    const html = ReactDOMServer.renderToStaticMarkup(<RouterContext {...props} />)
    const assets = locals.assets

    callback(error, template({ head, html, assets: assets }))
  })
}
