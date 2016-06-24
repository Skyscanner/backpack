import React from 'react'
import Helmet from 'react-helmet'

const BaseStylesheetPage = () => (
  <div>
    <Helmet title='Base Stylesheet' />
    <section>
      <p>
        <strong>
          Note: The scaffolding still uses an different, older base stylesheet. Please refer to this
          <a href='https://www.pre-prod.skyscanner.local/?OverrideConfig=EnableBackpackBase:true'>blog
          post</a> for more info and this <a href='#'>JIRA card</a> for updates.
        </strong>
      </p>
      <h2>Example Usage</h2>
      <p>
        Consumer's of the website scaffolding should expect this base stylesheet to be on the page already.
        If you need to emulate this base in your component's local test harness, the compiled css is available for you
        to import in your test harness:
      </p>
      <pre>
        <code>
          {'<link rel="stylesheet" href="/node_modules/living-styles/base.css">'}
        </code>
      </pre>
      <p>
        Alternatively you could import using sass:
      </p>
      <pre>
        <code>
          {'@import "~living-styles/base";'}
        </code>
      </pre>
      <h3>What's in it?</h3>
      <ul>
        <li>A minimal, relatively un-opinionated base stylesheet</li>
        <li>
          For improved cross-browser rendering, we use <a href='http://necolas.github.io/normalize.css/' target='__blank'>normalize.css</a> to correct small
          inconsistencies across browsers and devices.
        </li>
        <li>
          The <code>box-sizing</code> is globally set on every element—including <code>*:before</code> and
          <code>*:after</code>, to <code>border-box</code>. This ensures that the declared width of element is never
          exceeded due to padding or border.
        </li>
        <li>
          The default <code>font-family</code>, <code>font-size</code> & <code>line-height</code>.
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
