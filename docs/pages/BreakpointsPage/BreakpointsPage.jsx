import React from 'react'
import Helmet from 'react-helmet'

const BreakpointsPage = () => (
  <div>
    <Helmet title='Breakpoints' />
    <section>

      <h2>Mobile (500px)</h2>
      <pre>
        <code>{'$ls-breakpoint-mobile;'}</code>
      </pre>
      <h2>Tablet (768px)</h2>
      <pre>
        <code>{'$ls-breakpoint-tablet;'}</code>
      </pre>
      <h2>Desktop (1090px)</h2>
      <pre>
        <code>{'$ls-breakpoint-desktop;'}</code>
      </pre>
      <h2>Container</h2>
      <p>For outer container elements and overall page layout, use the following mixin:</p>
      <pre>
        <code>{'@include ls-container();'}</code>
      </pre>
      <h2>Usage</h2>
      <pre>
        <code>{'@import "~/living-styles/breakpoints";'}</code>
      </pre>
      <p>The following mixins are exposed to work with these breakpoints:</p>
      <pre>
        <code>
          {`@include ls-breakpoint-mobile-only { /* your scss goes here */ }
@include ls-breakpoint-above-mobile { /* your scss goes here */ }
@include ls-breakpoint-tablet-only { /* your scss goes here */ }
@include ls-breakpoint-below-tablet { /* your scss goes here */ }
@include ls-breakpoint-above-tablet { /* your scss goes here */ }
@include ls-breakpoint-desktop-only { /* your scss goes here */ }
@include ls-breakpoint-below-desktop { /* your scss goes here */ }
@include ls-breakpoint-above-desktop { /* your scss goes here */ }`}
        </code>
      </pre>
    </section>
  </div>
)

export default BreakpointsPage
