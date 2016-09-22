import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import BpkRtlToggle from 'bpk-component-rtl-toggle'
import BpkGridToggle from 'bpk-component-grid-toggle'
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid'

import './default-layout.scss'
import Header from '../../components/Header'

const DefaultLayout = ({ children }) => (
  <div>
    <Helmet titleTemplate='%s | Backpack' />
    <Header />
    <main>{children}</main>
    <BpkGridContainer padded={false}>
      <div className='bpkdocs-default-layout__footer-container'>
        <BpkGridRow>
          <BpkGridColumn width={6} mobileWidth={12}>
            <small className='bpkdocs-default-layout__footer-copy'>
              &copy; Skyscanner {new Date().getFullYear()}
            </small>
          </BpkGridColumn>
          <BpkGridColumn width={6} mobileWidth={12}>
            <small className='bpkdocs-default-layout__footer-copy bpkdocs-default-layout__footer-copy--align-right'>
              <BpkGridToggle /> | <BpkRtlToggle />
            </small>
          </BpkGridColumn>
        </BpkGridRow>
      </div>
    </BpkGridContainer>
  </div>
)

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default DefaultLayout
