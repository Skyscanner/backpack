import React from 'react'
import Helmet from 'react-helmet'

import styles from './colours-page.scss'

const Colours = () => (
  <div>
    <Helmet title='Colours' />
    <section>
      <h2>Primary</h2>
      <ul className={styles.swatchList}>
        <li className={`${styles.swatch} ${styles.blue500}`}>Blue 500</li>
        <li className={`${styles.swatch} ${styles.white}`}>White</li>
      </ul>
      <h2>Secondary</h2>
      <ul className={styles.swatchList}>
        <li className={`${styles.swatch} ${styles.green500}`}>Green 500</li>
        <li className={`${styles.swatch} ${styles.yellow500}`}>Yellow 500</li>
        <li className={`${styles.swatch} ${styles.red500}`}>Red 500</li>
      </ul>
      <h2>Grays</h2>
      <ul className={styles.swatchList}>
        <li className={`${styles.swatch} ${styles.gray50}`}>Gray 50</li>
        <li className={`${styles.swatch} ${styles.gray100}`}>Gray 100</li>
        <li className={`${styles.swatch} ${styles.gray300}`}>Gray 300</li>
        <li className={`${styles.swatch} ${styles.gray500}`}>Gray 500</li>
        <li className={`${styles.swatch} ${styles.gray700}`}>Gray 700</li>
        <li className={`${styles.swatch} ${styles.gray900}`}>Gray 900</li>
      </ul>
      <h2>Tints (for hover and active states)</h2>
      <ul className={styles.swatchList}>
        <li className={`${styles.swatch} ${styles.blue300}`}>Blue 300</li>
        <li className={`${styles.swatch} ${styles.blue700}`}>Blue 700</li>
        <li className={`${styles.swatch} ${styles.green300}`}>Green 300</li>
        <li className={`${styles.swatch} ${styles.green700}`}>Green 700</li>
      </ul>
    </section>
    <section>
      <h2>Example Usage</h2>
      <pre>
        <code>{'@import "~living-styles/colours";'}</code>
      </pre>
      <p>
        Simply reference the variables as and when needed. Each variable uses the same naming convention of <em>color
        name</em> + <em>intensity</em>. the higher the intensity value, the darker the color.
      </p>
      <pre>
        <code>
          {`$ls-color-blue-500;
$ls-color-green-700;`}
        </code>
      </pre>
    </section>
    <section>
      <h2>Tinting</h2>
      <p>
        Whilst all tints from 50-900 are currently available, we have plans to deprecate these in order to enforce the
        reduced palette you see above.
      </p>
      <p>
        Please refrain from creating your own tints. Each colour in the palette has been carefully tinted to ensure
        consistent brightness and saturation levels. Green and Blue 300 and 700 tints should only be used for hover and
        active/hit states
      </p>
    </section>
  </div>
)

export default Colours
