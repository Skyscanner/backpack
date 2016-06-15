import React from 'react'
import Helmet from 'react-helmet'

const HomePage = () => (
  <section>
    <Helmet title='Living Styles' />
    <h1>Living Styles is an up-to-date library of sass mixin's for use on Skyscanner's web products.</h1>
    <h2>Installation</h2>
    <p>Install the module using the git url like so:</p>
    <pre>
      <code>
        npm install git+http://git.prod.skyscanner.local/design/living-styles.git#v1.0.0 --save-dev
      </code>
    </pre>
    <p>For more installation instructions please refer to the readme on <a
      href='http://git.prod.skyscanner.local/design/living-styles'>GitLab</a>.</p>
  </section>
)

export default HomePage
