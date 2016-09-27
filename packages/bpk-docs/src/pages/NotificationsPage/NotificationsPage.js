import React from 'react'

import DocsPageBuilder from './../../components/DocsPageBuilder'

const components = [
  {
    id: 'banner-alerts',
    title: 'Banner alerts',
    blurb: 'These are displayed to the user to provide feedback when an action has been performed. They are available in three styles to indicate success, warning or error and can be configured to display further information to user in the form of a collapsible panel.',
    examples: [
      'TODO'
    ]
  },
  {
    id: 'toasts',
    title: 'Toasts',
    blurb: 'Coming soon',
    examples: []
  }
]

const NotificationsPage = () => <DocsPageBuilder
  title='Notifications'
  blurb='Backpack supports a number of different types of notification styles, which can be used in different scenarios to provide messaging to the user.'
  components={components}
  readme={'TODO'}
  sassdocId='TODO'
/>

export default NotificationsPage
