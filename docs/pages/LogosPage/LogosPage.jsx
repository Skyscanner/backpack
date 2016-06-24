import React from 'react'
import Helmet from 'react-helmet'

import styles from './logos-page.scss'

const LogosPage = () => (
  <div>
    <Helmet title='Logos' />
    <section>
      <h2>Inline</h2>
      <span className={styles.inlineLogo}></span>
      <h2>Stacked</h2>
      <span className={styles.stackedLogo}></span>
      <h2>Cloud only</h2>
      <span className={styles.cloudLogo}></span>
      <h2>Tianxun</h2>
      <span className={styles.tianxunLogo}></span>
    </section>
    <section>
      <h2>Example Usage</h2>
      <pre>
        <code>{'@import "~living-styles/logos";'}</code>
      </pre>
      <p>Logos are available in the 4 formats above You can use these like so...</p>
      <pre>
        <code>{`$ls-logo-inline-blue-500;
$ls-logo-stacked-gray-700;
$ls-logo-cloud-blue-500;
$ls-logo-tianxun-white;`}</code>
      </pre>
    </section>
    <section>
      <h2>Notes</h2>
      <p>
        Whilst you <em>technically can</em> create logos in any colour, we'd prefer if you stuck to those mentioned in
        our Brand Guidelines. Please also see our Brand Guidelines for further info on logo usage.
      </p>
    </section>
  </div>
)

export default LogosPage
