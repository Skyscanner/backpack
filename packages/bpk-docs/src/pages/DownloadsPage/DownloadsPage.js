import React from 'react'
import Helmet from 'react-helmet'

import BpkHeading from 'bpk-component-heading'

import './downloads-page.scss'

const DownloadsPage = () => (
  <section className='bpkdocs-downloads-page__container'>
    <Helmet title='Downloads' />
    <BpkHeading level='h1'>Downloads</BpkHeading>
  </section>
)

export default DownloadsPage
