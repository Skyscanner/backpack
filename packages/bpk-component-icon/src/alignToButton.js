import React from 'react'

import './bpk-icon.scss'

export default (ComposedComponent) => (props) => <ComposedComponent className='bpk-icon--align-to-button' {...props} />
