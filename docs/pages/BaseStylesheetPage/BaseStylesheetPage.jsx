import React from 'react'
import Helmet from 'react-helmet'

const BaseStylesheetPage = () => (
  <div>
    <Helmet title='Base Stylesheet' />
    <section>
      <h2>Example Usage</h2>
      <pre>
        <code>
          {'@import "~/living-styles/base";'}
        </code>
      </pre>
      <ul>
        <li>A minimal, relatively un-opinionated base stylesheet</li>
        <li>
          For improved cross-browser rendering, we use <a href='http://necolas.github.io/normalize.css/'
            target='__blank'>normalize.css</a> to correct small inconsistencies across browsers and devices.
        </li>
        <li>
          The <code>box-sizing</code> is globally set on every element—including <code>*:before</code> and
          <code>*:after</code>, to <code>border-box</code>. This ensures that the declared width of element is never
          exceeded due to padding or border.
        </li>
        <li>
          Utility classes based on the utils mixins above, including: <code>.hidden</code>, <code>.visuallyhidden</code>,
          <code>.visuallyhidden.focusable</code>, <code>.invisible</code> and <code>.clearfix</code>.
        </li>
        <li>That's it!</li>
      </ul>
    </section>
  </div>
)

export default BaseStylesheetPage
