import React from 'react'
import Helmet from 'react-helmet'

import styles from './icons-page.scss'

const iconNames = [
  'accessibility',
  'account',
  'adult',
  'aircon',
  'airline',
  'airports',
  'award',
  'baggage',
  'bar',
  'beer',
  'bus',
  'business',
  'cafe',
  'calendar',
  'camera',
  'cars',
  'chart',
  'chauffeur',
  'child',
  'city',
  'close',
  'currency',
  'depart',
  'duration',
  'edit',
  'estimated',
  'expand',
  'flag',
  'flight',
  'food',
  'globe',
  'heart',
  'help',
  'hotels',
  'infant',
  'information',
  'key',
  'language',
  'leisure',
  'lightning',
  'list',
  'location',
  'lock',
  'lounge',
  'luggageall',
  'mail',
  'map',
  'media',
  'menu',
  'minus',
  'mobile',
  'money',
  'music',
  'navigation',
  'news',
  'night',
  'paperclip',
  'parking',
  'passport',
  'petrol',
  'picture',
  'plus',
  'policy',
  'refresh',
  'return',
  'room',
  'scales',
  'search',
  'services',
  'settings',
  'share',
  'star',
  'stops',
  'swap',
  'taxi',
  'tick',
  'ticket',
  'time',
  'train',
  'trash',
  'trend',
  'trips',
  'upgrade',
  'view',
  'weather',
  'wifi'
]

const IconsPage = () => (
  <div>
    <Helmet title='Icons' />
    <section>
      <h2>Large (24px)</h2>
      <ol className={styles.iconList}>
        {iconNames.map((name) => (
          <li key={name} className={styles.iconListItem}>
            <i className={styles[`${name}-lg`]}></i>
          </li>
        ))}
      </ol>
      <h2>Small (16px)</h2>
      <ol className={styles.iconList}>
        {iconNames.map((name) => (
          <li key={name} className={styles.iconListItem}>
            <i className={styles[`${name}-sm`]}></i>
          </li>
        ))}
      </ol>
    </section>
    <section>
      <h2>Example Usage</h2>
      <code>{'@import "../node_modules/living-styles/icons";'}</code>
      <p>
        Icons are available in two sizes, small @ 16px and large @ 24px. These are available in any colour using the
        following mixins.
      </p>
      <pre>
        <code>
          {`@include ls-icon-lg(ls-icon-account-blue-600);
@include ls-icon-sm(ls-icon-account-blue-600);`}
        </code>
      </pre>
    </section>
    <section>
      <h2>Notes</h2>
      <p>
        We have created a grid system to ensure all icons are drawn in a consistent way – You can download this
        template below.
      </p>
      <p>
        Each icon should be intended to convey information quickly and accurately, and therefore should not be overly
        decorative or detailed. In general they should echo the style of the icons above making use of
        bold shapes and thick strokes. <em>Please ensure all strokes are no less than 2px.</em>
      </p>
      <h3>Formats and sizes</h3>
      <p>
        Icons should be created (and optmised for display) at <em>16px</em> and <em>24px</em>. Please
        ensure all shapes and lines are pixel-snapped to ensure crispness and readablity at these sizes.
        Icons should be saved in both <abbr title='Adobe Illustrator'><em>.AI</em></abbr> and
        <abbr title='Scalable Vector Graphic'><em>.SVG</em></abbr> formats.
      </p>
      <h3>Storing icons</h3>
      <p>
        As well as adding to the living styles repository, all icons should also be saved to the Brand Assets folder on
        the N drive.
      </p>
      <pre>
        <code>{'N:\\Design\\Brand Assets\\Icons\\Skycons\\'}</code>
      </pre>
    </section>
  </div>
)

export default IconsPage
