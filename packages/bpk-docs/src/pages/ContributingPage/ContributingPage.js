import React from 'react'
import Helmet from 'react-helmet'

import './contributing-page.scss'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import BpkContentContainer from 'bpk-component-content-container'
import { BpkList, BpkListItem } from 'bpk-component-list'

const ContributingPage = () => (
  <section>
    <Helmet title='Contributing' />
    <BpkContentContainer>
      <BpkHeading level='h1'>Contributing</BpkHeading>
      <BpkParagraph>
        Backpack follows best practises from the open source model and actively encourages contributions from others.
        Whether you're creating something new or building upon an existing component, we welcome you on board.
      </BpkParagraph>
      <BpkParagraph>
        We’ve pulled together this simple process map to help both designers and engineers understand how to contribute
        at any stage of a component’s lifecycle.
      </BpkParagraph>
      <span className='bpkdocs-contributing-page__process-map' dangerouslySetInnerHTML={{ __html: `${require('raw!./../../static/backpack-process-map.svg')}` }} />
      <BpkList ordered>
        <BpkListItem>
          Look at Backpack website or Craft Library (on Dropbox)
        </BpkListItem>
        <BpkListItem>
          Check <strong>Design for Backpack</strong> and <strong>Ready for Backpack</strong> folders
          (on Dropbox)
        </BpkListItem>
        <BpkListItem>
          When happy, get a peer review with a Designer from Glue or Backpack
        </BpkListItem>
        <BpkListItem>
          Create a JIRA Task in the Backpack Squad and then move Sketch files to the <strong>Ready for
          Backpack folder</strong> with your name and JIRA ticket number.
        </BpkListItem>
      </BpkList>
    </BpkContentContainer>
  </section>
)

export default ContributingPage
