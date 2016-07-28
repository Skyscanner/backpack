import { configure } from '@kadira/storybook'

import './../packages/bpk-stylesheets/base.scss'

configure(() => {
  require('./../packages/bpk-component-button/stories')
  require('./../packages/bpk-component-heading/stories')
  require('./../packages/bpk-component-icon/stories')
  require('./../packages/bpk-component-link/stories')
  require('./../packages/bpk-component-list/stories')
  require('./../packages/bpk-component-logo/stories')
  require('./../packages/bpk-component-paragraph/stories')
  require('./../packages/bpk-component-table/stories')
}, module)
