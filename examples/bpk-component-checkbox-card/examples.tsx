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

import { Component } from 'react';
import type { ComponentProps } from 'react';

import LandmarkIconSm from '../../packages/bpk-component-icon/sm/landmark';
import BpkCheckboxCard, {
  CHECKBOX_CARD_VARIANTS,
  CHECKBOX_CARD_RADIUS,
} from '../../packages/bpk-component-checkbox-card';

type CheckboxCardProps = ComponentProps<typeof BpkCheckboxCard>;

type Props = Omit<CheckboxCardProps, 'checked' | 'onChange'> & {
  isChecked?: boolean;
};

type State = {
  isChecked: boolean;
};

class StatefulCheckboxCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isChecked: props.isChecked ?? false,
    };
  }

  handleChange = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
  };

  render() {
    const { isChecked: _, ...rest } = this.props;
    return (
      <BpkCheckboxCard
        {...rest}
        checked={this.state.isChecked}
        onChange={this.handleChange}
      />
    );
  }
}

export const DefaultExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4 style={{ marginBottom: '12px' }}>On Canvas Default</h4>
      <StatefulCheckboxCard
        ariaLabel="On Canvas Default"
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
      />
    </div>

    <div>
      <h4 style={{ marginBottom: '12px' }}>On Canvas Contrast</h4>
      <StatefulCheckboxCard
        ariaLabel="On Canvas Contrast"
        variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
      />
    </div>

    <div>
      <h4 style={{ marginBottom: '12px', color: 'white' }}>On Surface Contrast</h4>
      <div style={{ backgroundColor: '#05203C', padding: '24px', borderRadius: '8px', display: 'inline-block' }}>
        <StatefulCheckboxCard
          ariaLabel="On Surface Contrast"
          variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
        />
      </div>
    </div>
  </div>
);

export const WithIconExample = () => (
  <StatefulCheckboxCard
    label="City Centre"
    icon={<LandmarkIconSm />}
    price="£85"
  />
);

export const WithImageExample = () => (
  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '14px', marginBottom: '12px', color: '#666', fontWeight: 500 }}>Default</p>
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Car type"
        price="from £74"
        image="https://images.kiwi.com/photos/600x600/toyota-aygo.png"
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        radius={CHECKBOX_CARD_RADIUS.rounded}
      />
    </div>
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '14px', marginBottom: '12px', color: '#666', fontWeight: 500 }}>Hover</p>
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Car type"
        price="from £74"
        image="https://images.kiwi.com/photos/600x600/toyota-aygo.png"
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        radius={CHECKBOX_CARD_RADIUS.rounded}
      />
    </div>
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '14px', marginBottom: '12px', color: '#666', fontWeight: 500 }}>Selected</p>
      <BpkCheckboxCard
        checked
        onChange={() => {}}
        label="Car type"
        price="from £74"
        image="https://images.kiwi.com/photos/600x600/toyota-aygo.png"
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        radius={CHECKBOX_CARD_RADIUS.rounded}
      />
    </div>
  </div>
);

export const OnCanvasDefaultVariant = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#F7F9FB', borderRadius: '4px' }}>
      <strong>onCanvasDefault</strong>: For white/default backgrounds
      <br />
      <span style={{ fontSize: '14px', color: '#666' }}>
        Default state has border • Hover changes background to light grey • No shadow
      </span>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>Rounded</h4>
      <div style={{ display: 'flex', gap: '12px' }}>
        <StatefulCheckboxCard
          ariaLabel="Default"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          radius={CHECKBOX_CARD_RADIUS.rounded}
        />
        <StatefulCheckboxCard
          ariaLabel="Checked"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          radius={CHECKBOX_CARD_RADIUS.rounded}
          isChecked
        />
      </div>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>Square</h4>
      <div style={{ display: 'flex', gap: '12px' }}>
        <StatefulCheckboxCard
          ariaLabel="Default"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          radius={CHECKBOX_CARD_RADIUS.square}
        />
        <StatefulCheckboxCard
          ariaLabel="Checked"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          radius={CHECKBOX_CARD_RADIUS.square}
          isChecked
        />
      </div>
    </div>
  </div>
);

export const OnCanvasContrastVariant = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#F7F9FB', borderRadius: '4px' }}>
      <strong>onCanvasContrast</strong>: For colored/contrast backgrounds
      <br />
      <span style={{ fontSize: '14px', color: '#666' }}>
        Default state has no border • Hover adds border • No shadow
      </span>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>Rounded</h4>
      <div style={{ display: 'flex', gap: '12px' }}>
        <StatefulCheckboxCard
          ariaLabel="Default"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
          radius={CHECKBOX_CARD_RADIUS.rounded}
        />
        <StatefulCheckboxCard
          ariaLabel="Checked"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
          radius={CHECKBOX_CARD_RADIUS.rounded}
          isChecked
        />
      </div>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>Square</h4>
      <div style={{ display: 'flex', gap: '12px' }}>
        <StatefulCheckboxCard
          ariaLabel="Default"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
          radius={CHECKBOX_CARD_RADIUS.square}
        />
        <StatefulCheckboxCard
          ariaLabel="Checked"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
          radius={CHECKBOX_CARD_RADIUS.square}
          isChecked
        />
      </div>
    </div>
  </div>
);

export const OnSurfaceContrastVariant = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#F7F9FB', borderRadius: '4px' }}>
      <strong>onSurfaceContrast</strong>: For dark backgrounds
      <br />
      <span style={{ fontSize: '14px', color: '#666' }}>
        Default state has no border • Hover changes background to darker • White text • No shadow
      </span>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px', color: 'white' }}>Rounded</h4>
      <div style={{ backgroundColor: '#05203C', padding: '24px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <StatefulCheckboxCard
            ariaLabel="Default"
            variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
            radius={CHECKBOX_CARD_RADIUS.rounded}
          />
          <StatefulCheckboxCard
            ariaLabel="Checked"
            variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
            radius={CHECKBOX_CARD_RADIUS.rounded}
            isChecked
          />
        </div>
      </div>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px', color: 'white' }}>Square</h4>
      <div style={{ backgroundColor: '#05203C', padding: '24px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <StatefulCheckboxCard
            ariaLabel="Default"
            variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
            radius={CHECKBOX_CARD_RADIUS.square}
          />
          <StatefulCheckboxCard
            ariaLabel="Checked"
            variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
            radius={CHECKBOX_CARD_RADIUS.square}
            isChecked
          />
        </div>
      </div>
    </div>
  </div>
);

export const DisabledExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <BpkCheckboxCard
      checked={false}
      onChange={() => {}}
      label="Disabled"
      price="£100"
      disabled
    />
    <BpkCheckboxCard
      checked
      onChange={() => {}}
      label="Disabled Checked"
      price="£100"
      disabled
    />
  </div>
);

type MultiCardState = {
  selectedId: string | null;
};

class SingleSelectionContainer extends Component<{}, MultiCardState> {
  state = {
    selectedId: null,
  };

  render() {
    const options = [
      { id: 'opt1', label: 'City Centre', price: '£85' },
      { id: 'opt2', label: 'Bloomsbury', price: '£103' },
      { id: 'opt3', label: 'Kensington', price: '£122' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((opt) => (
          <BpkCheckboxCard
            key={opt.id}
            name="location"
            value={opt.id}
            checked={this.state.selectedId === opt.id}
            onChange={() => this.setState({ selectedId: opt.id })}
            label={opt.label}
            price={opt.price}
          />
        ))}
      </div>
    );
  }
}

export const SingleSelectionExample = () => <SingleSelectionContainer />;

export const LongTextExample = () => (
  <StatefulCheckboxCard
    label="This is an extremely long label that will exceed the maximum line count"
    description="This is a very long description that should be truncated"
    price="£9,999"
  />
);

export const AllStatesExample = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
    <div>
      <h4>Default</h4>
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Default"
        price="£100"
      />
    </div>
    <div>
      <h4>Checked</h4>
      <BpkCheckboxCard
        checked
        onChange={() => {}}
        label="Selected"
        price="£100"
      />
    </div>
    <div>
      <h4>Disabled</h4>
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Disabled"
        price="£100"
        disabled
      />
    </div>
    <div>
      <h4>Disabled + Checked</h4>
      <BpkCheckboxCard
        checked
        onChange={() => {}}
        label="Disabled Selected"
        price="£100"
        disabled
      />
    </div>
  </div>
);

export const MixedExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <BpkCheckboxCard
      checked={false}
      onChange={() => {}}
      label="City Centre"
      icon={<LandmarkIconSm />}
      price="£85"
    />
    <BpkCheckboxCard
      checked
      onChange={() => {}}
      label="Bloomsbury"
      price="£103"
    />
    <BpkCheckboxCard
      checked={false}
      onChange={() => {}}
      label="Disabled"
      price="£100"
      disabled
    />
  </div>
);

export const AllVariantsExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3 style={{ marginBottom: '12px' }}>Default State</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Square + On Canvas Default</p>
          <BpkCheckboxCard
            checked={false}
            onChange={() => {}}
            ariaLabel="Square On Canvas Default"
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            radius={CHECKBOX_CARD_RADIUS.square}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Rounded + On Canvas Default</p>
          <BpkCheckboxCard
            checked={false}
            onChange={() => {}}
            ariaLabel="Rounded On Canvas Default"
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            radius={CHECKBOX_CARD_RADIUS.rounded}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Square + On Canvas Contrast</p>
          <BpkCheckboxCard
            checked={false}
            onChange={() => {}}
            ariaLabel="Square On Canvas Contrast"
            variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
            radius={CHECKBOX_CARD_RADIUS.square}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Rounded + On Canvas Contrast</p>
          <BpkCheckboxCard
            checked={false}
            onChange={() => {}}
            ariaLabel="Rounded On Canvas Contrast"
            variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
            radius={CHECKBOX_CARD_RADIUS.rounded}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px', color: 'white' }}>Square + On Surface Contrast</p>
          <div style={{ backgroundColor: '#05203C', padding: '16px', borderRadius: '8px', display: 'inline-block' }}>
            <BpkCheckboxCard
              checked={false}
              onChange={() => {}}
              ariaLabel="Square On Surface Contrast"
              variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
              radius={CHECKBOX_CARD_RADIUS.square}
            />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px', color: 'white' }}>Rounded + On Surface Contrast</p>
          <div style={{ backgroundColor: '#05203C', padding: '16px', borderRadius: '8px', display: 'inline-block' }}>
            <BpkCheckboxCard
              checked={false}
              onChange={() => {}}
              ariaLabel="Rounded On Surface Contrast"
              variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
              radius={CHECKBOX_CARD_RADIUS.rounded}
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 style={{ marginBottom: '12px' }}>Selected State</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Square + On Canvas Default</p>
          <BpkCheckboxCard
            checked
            onChange={() => {}}
            ariaLabel="Square On Canvas Default Selected"
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            radius={CHECKBOX_CARD_RADIUS.square}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Rounded + On Canvas Default</p>
          <BpkCheckboxCard
            checked
            onChange={() => {}}
            ariaLabel="Rounded On Canvas Default Selected"
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            radius={CHECKBOX_CARD_RADIUS.rounded}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Square + On Canvas Contrast</p>
          <BpkCheckboxCard
            checked
            onChange={() => {}}
            ariaLabel="Square On Canvas Contrast Selected"
            variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
            radius={CHECKBOX_CARD_RADIUS.square}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>Rounded + On Canvas Contrast</p>
          <BpkCheckboxCard
            checked
            onChange={() => {}}
            ariaLabel="Rounded On Canvas Contrast Selected"
            variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
            radius={CHECKBOX_CARD_RADIUS.rounded}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px', color: 'white' }}>Square + On Surface Contrast</p>
          <div style={{ backgroundColor: '#05203C', padding: '16px', borderRadius: '8px', display: 'inline-block' }}>
            <BpkCheckboxCard
              checked
              onChange={() => {}}
              ariaLabel="Square On Surface Contrast Selected"
              variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
              radius={CHECKBOX_CARD_RADIUS.square}
            />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', marginBottom: '8px', color: 'white' }}>Rounded + On Surface Contrast</p>
          <div style={{ backgroundColor: '#05203C', padding: '16px', borderRadius: '8px', display: 'inline-block' }}>
            <BpkCheckboxCard
              checked
              onChange={() => {}}
              ariaLabel="Rounded On Surface Contrast Selected"
              variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
              radius={CHECKBOX_CARD_RADIUS.rounded}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ComposableAPIExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ marginBottom: '16px' }}>Composable API - With Image</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.Image src="https://images.kiwi.com/photos/600x600/toyota-aygo.png" />
          <BpkCheckboxCard.Text>
            <BpkCheckboxCard.Label>Car type</BpkCheckboxCard.Label>
          </BpkCheckboxCard.Text>
          <BpkCheckboxCard.Price>from £74</BpkCheckboxCard.Price>
        </BpkCheckboxCard>

        <BpkCheckboxCard
          checked
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.Image src="https://images.kiwi.com/photos/600x600/toyota-aygo.png" />
          <BpkCheckboxCard.Text>
            <BpkCheckboxCard.Label>Car type</BpkCheckboxCard.Label>
          </BpkCheckboxCard.Text>
          <BpkCheckboxCard.Price>from £74</BpkCheckboxCard.Price>
        </BpkCheckboxCard>
      </div>
    </div>

    <div>
      <h3 style={{ marginBottom: '16px' }}>Composable API - With Icon</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.Icon>
            <LandmarkIconSm />
          </BpkCheckboxCard.Icon>
          <BpkCheckboxCard.Text>
            <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
          </BpkCheckboxCard.Text>
          <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
        </BpkCheckboxCard>

        <BpkCheckboxCard
          checked
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.Text>
            <BpkCheckboxCard.Label>Bloomsbury</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Description>Central location</BpkCheckboxCard.Description>
          </BpkCheckboxCard.Text>
          <BpkCheckboxCard.Price>£103</BpkCheckboxCard.Price>
        </BpkCheckboxCard>
      </div>
    </div>

    <div>
      <h3 style={{ marginBottom: '16px', color: 'white' }}>Composable API - On Surface Contrast</h3>
      <div style={{ backgroundColor: '#05203C', padding: '24px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <BpkCheckboxCard
            checked={false}
            onChange={() => {}}
            variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
          >
            <BpkCheckboxCard.Text>
              <BpkCheckboxCard.Label>Standard</BpkCheckboxCard.Label>
            </BpkCheckboxCard.Text>
            <BpkCheckboxCard.Price>£75</BpkCheckboxCard.Price>
          </BpkCheckboxCard>

          <BpkCheckboxCard
            checked
            onChange={() => {}}
            variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
          >
            <BpkCheckboxCard.Text>
              <BpkCheckboxCard.Label>Deluxe</BpkCheckboxCard.Label>
            </BpkCheckboxCard.Text>
            <BpkCheckboxCard.Price>£150</BpkCheckboxCard.Price>
          </BpkCheckboxCard>
        </div>
      </div>
    </div>
  </div>
);

// New examples for layout primitives
export const StackLayoutExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ marginBottom: '16px' }}>Stack - Vertical Layout with Different Spacing</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.Stack space="sm" alignItems="center">
            <BpkCheckboxCard.Image src="https://images.kiwi.com/photos/600x600/toyota-aygo.png" />
            <BpkCheckboxCard.Label>Small Gap</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Price>£74</BpkCheckboxCard.Price>
          </BpkCheckboxCard.Stack>
        </BpkCheckboxCard>

        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.Stack space="md" alignItems="center">
            <BpkCheckboxCard.Image src="https://images.kiwi.com/photos/600x600/toyota-aygo.png" />
            <BpkCheckboxCard.Label>Medium Gap</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
          </BpkCheckboxCard.Stack>
        </BpkCheckboxCard>

        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.Stack space="lg" alignItems="center">
            <BpkCheckboxCard.Image src="https://images.kiwi.com/photos/600x600/toyota-aygo.png" />
            <BpkCheckboxCard.Label>Large Gap</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Price>£95</BpkCheckboxCard.Price>
          </BpkCheckboxCard.Stack>
        </BpkCheckboxCard>
      </div>
    </div>
  </div>
);

export const InlineLayoutExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ marginBottom: '16px' }}>Inline - Horizontal Layout with Custom Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          width="auto"
          height="auto"
          layout="horizontal"
        >
          <BpkCheckboxCard.Inline space="md" alignItems="center">
            <BpkCheckboxCard.Icon>
              <LandmarkIconSm />
            </BpkCheckboxCard.Icon>
            <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
          </BpkCheckboxCard.Inline>
        </BpkCheckboxCard>

        <BpkCheckboxCard
          checked
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
          width="auto"
          height="auto"
          layout="horizontal"
        >
          <BpkCheckboxCard.Inline space="md" alignItems="center">
            <BpkCheckboxCard.Icon>
              <LandmarkIconSm />
            </BpkCheckboxCard.Icon>
            <BpkCheckboxCard.Label>Bloomsbury</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Price>£103</BpkCheckboxCard.Price>
          </BpkCheckboxCard.Inline>
        </BpkCheckboxCard>
      </div>
    </div>
  </div>
);

export const CustomNestedLayoutExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ marginBottom: '16px' }}>Custom Layout - Nested Stack and Inline</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          width={200}
          layout="custom"
        >
          <BpkCheckboxCard.Inline space="sm" alignItems="flex-start">
            <BpkCheckboxCard.Icon>
              <LandmarkIconSm />
            </BpkCheckboxCard.Icon>
            <BpkCheckboxCard.Stack space="sm" alignItems="flex-start">
              <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
              <BpkCheckboxCard.Description>Central location near attractions</BpkCheckboxCard.Description>
              <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
            </BpkCheckboxCard.Stack>
          </BpkCheckboxCard.Inline>
        </BpkCheckboxCard>

        <BpkCheckboxCard
          checked
          onChange={() => {}}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          width="250px"
          layout="custom"
        >
          <BpkCheckboxCard.Inline space="md" alignItems="flex-start">
            <BpkCheckboxCard.Image src="https://images.kiwi.com/photos/600x600/toyota-aygo.png" />
            <BpkCheckboxCard.Stack space="sm" alignItems="flex-start">
              <BpkCheckboxCard.Label>Car Hire</BpkCheckboxCard.Label>
              <BpkCheckboxCard.Description>Compact vehicle</BpkCheckboxCard.Description>
              <BpkCheckboxCard.Price>from £74/day</BpkCheckboxCard.Price>
            </BpkCheckboxCard.Stack>
          </BpkCheckboxCard.Inline>
        </BpkCheckboxCard>
      </div>
    </div>
  </div>
);

export const CustomSizeExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ marginBottom: '16px' }}>Custom Sizing - Fixed, Percentage, Auto</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <p style={{ fontSize: '14px', marginBottom: '8px', color: '#666' }}>Fixed Size (200px × 150px)</p>
          <BpkCheckboxCard
            checked={false}
            onChange={() => {}}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            width={200}
            height={150}
            layout="custom"
          >
            <BpkCheckboxCard.Stack space="md" alignItems="center">
              <BpkCheckboxCard.Label>Fixed Size</BpkCheckboxCard.Label>
              <BpkCheckboxCard.Price>£100</BpkCheckboxCard.Price>
            </BpkCheckboxCard.Stack>
          </BpkCheckboxCard>
        </div>

        <div style={{ width: '50%' }}>
          <p style={{ fontSize: '14px', marginBottom: '8px', color: '#666' }}>Percentage Width (100% of container)</p>
          <BpkCheckboxCard
            checked={false}
            onChange={() => {}}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
            width="100%"
            height="auto"
            layout="horizontal"
          >
            <BpkCheckboxCard.Inline space="md" alignItems="center">
              <BpkCheckboxCard.Label>Full Width</BpkCheckboxCard.Label>
              <BpkCheckboxCard.Price>£120</BpkCheckboxCard.Price>
            </BpkCheckboxCard.Inline>
          </BpkCheckboxCard>
        </div>

        <div>
          <p style={{ fontSize: '14px', marginBottom: '8px', color: '#666' }}>Auto Size (fits content)</p>
          <BpkCheckboxCard
            checked
            onChange={() => {}}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            width="auto"
            height="auto"
            layout="horizontal"
          >
            <BpkCheckboxCard.Inline space="lg" alignItems="center">
              <BpkCheckboxCard.Icon>
                <LandmarkIconSm />
              </BpkCheckboxCard.Icon>
              <BpkCheckboxCard.Label>Auto Sized Card</BpkCheckboxCard.Label>
              <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
            </BpkCheckboxCard.Inline>
          </BpkCheckboxCard>
        </div>
      </div>
    </div>
  </div>
);
