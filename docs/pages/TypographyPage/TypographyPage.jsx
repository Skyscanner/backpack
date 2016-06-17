import React from 'react'
import Helmet from 'react-helmet'

import Heading from './../../components/Heading'
import P from './../../components/P'

const TypographyPage = () => (
  <section>
    <Helmet title='Typography'/>
    <Heading headingLevel='h1'>Typography</Heading>
    <P>Headings, paragraphs, blockquotes, lists and more.</P>
    <Heading headingLevel='h2'>Contents</Heading>
  </section>
)

export default TypographyPage
