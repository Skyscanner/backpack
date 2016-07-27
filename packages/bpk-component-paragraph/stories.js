import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkParagraph from './index'

storiesOf('bpk-component-paragraph', module)
  .add('Example', () => (
    <div>
      <BpkParagraph>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkParagraph>
      <BpkParagraph>
        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      </BpkParagraph>
      <BpkParagraph>
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
      </BpkParagraph>
    </div>
  ))
