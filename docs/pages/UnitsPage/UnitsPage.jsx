import React from 'react'
import Helmet from 'react-helmet'

const UnitsPage = () => (
  <div>
    <Helmet title='Units' />
    <section>
      <h2>Example Usage</h2>
      <pre>
        <code>{'@import "../node_modules/living-styles/units";'}</code>
      </pre>
      <p>Simply reference the variables as and when needed e.g. for padding, margins, widths and heights.</p>
      <pre>
        <code>
          {`$ls-spacing-sixth;
$ls-spacing-quarter;
$ls-spacing-half;
$ls-spacing;
$ls-border-radius-xs;
$ls-border-radius-sm;
$ls-border-radius-lg;`}
        </code>
      </pre>
    </section>
  </div>
)

export default UnitsPage
