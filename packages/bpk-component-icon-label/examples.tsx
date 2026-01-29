/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import ExclamationCircleIcon from '../bpk-component-icon/sm/exclamation-circle';
import InformationCircleIcon from '../bpk-component-icon/sm/information-circle';
import TickCircleIcon from '../bpk-component-icon/sm/tick-circle';
import BpkLink from '../bpk-component-link';

import BpkIconLabel, { LABEL_STYLE } from './src/BpkIconLabel';

const Examples = () => (
  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
    {/* Example 1: Basic Usage */}
    <div>
      <h2>Basic Usage</h2>
      <BpkIconLabel.Root>
        <BpkIconLabel.Icon>
          <InformationCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>This is a basic information message</BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>

    {/* Example 2: With Inline Link */}
    <div>
      <h2>With Inline Link</h2>
      <BpkIconLabel.Root>
        <BpkIconLabel.Icon>
          <InformationCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          Learn more about our{' '}
          <BpkLink href="https://www.skyscanner.net/privacy">
            privacy policy
          </BpkLink>{' '}
          and how we handle your data.
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>

    {/* Example 3: Text Only (No Icon) */}
    <div>
      <h2>Text Only (No Icon)</h2>
      <BpkIconLabel.Root>
        <BpkIconLabel.Text>
          This message appears without an icon for simpler layouts
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>

    {/* Example 4: Success Message */}
    <div>
      <h2>Success Message</h2>
      <BpkIconLabel.Root type={LABEL_STYLE.label1}>
        <BpkIconLabel.Icon>
          <TickCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>Your booking was successful!</BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>

    {/* Example 5: Warning/Alert Message */}
    <div>
      <h2>Warning Message</h2>
      <BpkIconLabel.Root>
        <BpkIconLabel.Icon>
          <ExclamationCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          Please check your flight details before proceeding
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>

    {/* Example 6: Typography Variants */}
    <div>
      <h2>Typography Variants</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BpkIconLabel.Root type={LABEL_STYLE.body}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Body typography (16px regular) - Default style for most content
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>

        <BpkIconLabel.Root type={LABEL_STYLE.label1}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Label 1 typography (16px bold) - Emphasized content
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>

        <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Footnote typography (14px regular) - Secondary information
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>
      </div>
    </div>

    {/* Example 7: Long Text Wrapping */}
    <div>
      <h2>Long Text Wrapping</h2>
      <div style={{ maxWidth: '400px' }}>
        <BpkIconLabel.Root>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            This is a longer information message that demonstrates how the
            component handles text wrapping. The icon stays aligned to the first
            line while the text wraps naturally across multiple lines, maintaining
            proper spacing and readability throughout the entire message.
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>
      </div>
    </div>

    {/* Example 8: On Dark Background */}
    <div style={{ backgroundColor: '#161616', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: 'white', marginTop: 0 }}>On Dark Background</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BpkIconLabel.Root onDark>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            This message appears on a dark background
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>

        <BpkIconLabel.Root onDark>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Visit our{' '}
            <BpkLink href="https://www.skyscanner.net">website</BpkLink> to
            learn more
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>
      </div>
    </div>

    {/* Example 9: Multiple Messages in a List */}
    <div>
      <h2>Multiple Messages</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Free cancellation available up to 24 hours before departure
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>

        <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Baggage allowance: 1 carry-on bag and 1 personal item
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>

        <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Check-in opens 24 hours before your flight
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>
      </div>
    </div>

    {/* Example 10: Custom Styling */}
    <div>
      <h2>With Custom Container Styling</h2>
      <BpkIconLabel.Root
        className="custom-icon-label"
        style={{
          backgroundColor: '#f0f0f0',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      >
        <BpkIconLabel.Icon>
          <InformationCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          This message has custom container styling applied
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>
  </div>
);

export default Examples;
