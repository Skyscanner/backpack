import React from 'react'
import Helmet from 'react-helmet'

import styles from './colours-page.scss'

const coloursMap = {
  'Blue': [
    { alias: '50', hexCode: '#e1f4f8' },
    { alias: '100', hexCode: '#cbeef5' },
    { alias: '200', hexCode: '#b0e4ee' },
    { alias: '300', hexCode: '#7fd7e8' },
    { alias: '400', hexCode: '#40c4df' },
    { alias: '500', hexCode: '#00b2d6' },
    { alias: '600', hexCode: '#009dbd' },
    { alias: '700', hexCode: '#008ca8' },
    { alias: '800', hexCode: '#00758c' },
    { alias: '900', hexCode: '#005567' }
  ],
  'Green': [
    { alias: '50', hexCode: '#dff7ec' },
    { alias: '100', hexCode: '#cbf5e2' },
    { alias: '200', hexCode: '#afedd1' },
    { alias: '300', hexCode: '#80e8b9' },
    { alias: '400', hexCode: '#40de97' },
    { alias: '500', hexCode: '#00d775' },
    { alias: '600', hexCode: '#00bd68' },
    { alias: '700', hexCode: '#00a85d' },
    { alias: '800', hexCode: '#008c4d' },
    { alias: '900', hexCode: '#006638' }
  ],
  'Yellow': [
    { alias: '50', hexCode: '#faf4e1' },
    { alias: '100', hexCode: '#fcf1ca' },
    { alias: '200', hexCode: '#ffedb3' },
    { alias: '300', hexCode: '#ffe694' },
    { alias: '400', hexCode: '#ffde72' },
    { alias: '500', hexCode: '#ffd445' },
    { alias: '600', hexCode: '#f6c62b' },
    { alias: '700', hexCode: '#e8b81c' },
    { alias: '800', hexCode: '#cfa211' },
    { alias: '900', hexCode: '#a88100' }
  ],
  'Red': [
    { alias: '50', hexCode: '#fce9e8' },
    { alias: '100', hexCode: '#ffd6d5' },
    { alias: '200', hexCode: '#ffbbba' },
    { alias: '300', hexCode: '#ff9694' },
    { alias: '400', hexCode: '#fe7471' },
    { alias: '500', hexCode: '#ff5452' },
    { alias: '600', hexCode: '#eb423f' },
    { alias: '700', hexCode: '#de322f' },
    { alias: '800', hexCode: '#cc1f1d' },
    { alias: '900', hexCode: '#a80300' }
  ],
  'Gray': [
    { alias: '50', hexCode: '#f6f5f7' },
    { alias: '100', hexCode: '#dfdce3' },
    { alias: '200', hexCode: '#b6b1bd' },
    { alias: '300', hexCode: '#898294' },
    { alias: '400', hexCode: '#6f667d' },
    { alias: '500', hexCode: '#544c63' },
    { alias: '600', hexCode: '#453d54' },
    { alias: '700', hexCode: '#372f45' },
    { alias: '800', hexCode: '#272133' },
    { alias: '900', hexCode: '#1b1524' }
  ]
}

const Colours = () => (
  <div>
    <Helmet title='Colours' />
    <section>
      <h2>Primary, Tints and Shades</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.keys(coloursMap).map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {coloursMap[ Object.keys(coloursMap)[ 0 ] ].map((value, index) => (
            <tr key={index}>
              {Object.keys(coloursMap).map((name) => (
                <td key={`${index}-${name}`} style={{backgroundColor: coloursMap[ name ][index].hexCode}}
                  className={styles.tableCell}>
                  <p>{coloursMap[ name ][ index ].alias}</p>
                  <code>{coloursMap[ name ][ index ].hexCode}</code>
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
    <section>
      <h2>Example Usage</h2>
      <pre>
        <code>{'@import "~/living-styles/colours";'}</code>
      </pre>
      <p>
        Simply reference the variables as and when needed. Each variable uses the same naming convention of <em>color
        name</em> + <em>intensity</em>. the higher the intensity value, the darker the color.
      </p>
      <pre>
        <code>
          {`$ls-color-blue-500;
$ls-color-yellow-700;`}
        </code>
      </pre>
    </section>
    <section>
      <h2>Notes</h2>
      <p>
        Whilst all tints from 50-900 are currently available, we have plans to deprecate these in order to enforce the
        reduced palette you see above.
      </p>
      <h3>Tinting</h3>
      <p>
        Please refrain from creating your own tints. Each colour in the palette has been carefully tinted to ensure
        consistent brightness and saturation levels. Green and Blue 300 and 700 tints should only be used for hover and
        active/hit states
      </p>
    </section>
  </div>
)

export default Colours
