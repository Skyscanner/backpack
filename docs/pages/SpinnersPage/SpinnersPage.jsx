import React from 'react'
import Helmet from 'react-helmet'

import styles from './spinners-page.scss'

const SpinnersPage = () => (
  <div>
    <Helmet title='Spinners' />
    <section>
      <h2>Spinner Small (16px)</h2>
      <span className={styles.smallSpinner}></span>
      <h2>Spinner Large (24px)</h2>
      <span className={styles.largeSpinner}></span>
      <h2>Spinner Extra Large (48px)</h2>
      <span className={styles.extraLargeSpinner}></span>
    </section>
    <section>
      <h2>Usage</h2>
      <pre>
        <code>{'@import "~living-styles/spinners";'}</code>
      </pre>
      <p>Spinners are available in the 3 sizes above and can be coloured just like icons.</p>
      <pre>
        <code>{`@include ls-spinner-sm(ls-spinner-gray-700);
@include ls-spinner-lg(ls-spinner-blue-500);
@include ls-spinner-xl(ls-spinner-white);`}</code>
      </pre>
    </section>
    <section>
      <h2>Notes</h2>
      <p>
        Whilst you <em>technically can</em> use these spinners in any colour, we'd recommend sticking to
        Gray/Blue/White.
      </p>
    </section>
  </div>
)

export default SpinnersPage
