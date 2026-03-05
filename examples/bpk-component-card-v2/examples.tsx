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

import { BpkCardV2 } from '../../packages/bpk-component-card-v2';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import type {
  BpkCardV2SurfaceColor,
  BpkCardV2Variant,
  BpkCardV2PaddingSize,
} from '../../packages/bpk-component-card-v2/src/BpkCardV2/common-types';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const SURFACE_COLORS: BpkCardV2SurfaceColor[] = [
  'surfaceDefault',
  'surfaceElevated',
  'surfaceTint',
  'surfaceSubtle',
  'surfaceHero',
  'surfaceContrast',
  'surfaceLowContrast',
  'surfaceHighlight',
];

const VARIANTS: BpkCardV2Variant[] = ['default', 'outlined', 'noElevation'];

const Placeholder = ({ label }: { label: string }) => (
  <div className={getClassName('bpk-card-v2-examples__placeholder')}>
    {label}
  </div>
);

const DefaultExample = () => (
  <div className={getClassName('bpk-card-v2-examples__card-wrapper')}>
    <BpkCardV2.Root>
      <BpkCardV2.Header>
        <BpkText textStyle={TEXT_STYLES.heading4} tagName="h3">
          Card title
        </BpkText>
      </BpkCardV2.Header>
      <BpkCardV2.Body>
        <BpkText>This is the body content of a default card.</BpkText>
      </BpkCardV2.Body>
      <BpkCardV2.Footer>
        <BpkText textStyle={TEXT_STYLES.caption}>Footer content</BpkText>
      </BpkCardV2.Footer>
    </BpkCardV2.Root>
  </div>
);

const VariantsExample = () => (
  <div>
    <div className={getClassName('bpk-card-v2-examples__grid')}>
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          className={getClassName('bpk-card-v2-examples__card-wrapper')}
        >
          <BpkCardV2.Root variant={variant}>
            <BpkCardV2.Header>
              <BpkText textStyle={TEXT_STYLES.heading4} tagName="h3">
                {variant}
              </BpkText>
            </BpkCardV2.Header>
            <BpkCardV2.Body>
              <BpkText>Card with variant &quot;{variant}&quot;.</BpkText>
            </BpkCardV2.Body>
          </BpkCardV2.Root>
        </div>
      ))}
    </div>
  </div>
);

const SurfaceColorsExample = () => (
  <div className={getClassName('bpk-card-v2-examples__grid')}>
    {SURFACE_COLORS.map((color) => (
      <div
        key={color}
        className={getClassName('bpk-card-v2-examples__card-wrapper')}
      >
        <BpkCardV2.Root bgColor={color} variant="outlined">
          <BpkCardV2.Header>
            <BpkText textStyle={TEXT_STYLES.heading5} tagName="h3">
              {color}
            </BpkText>
          </BpkCardV2.Header>
          <BpkCardV2.Body>
            <BpkText>Surface color example.</BpkText>
          </BpkCardV2.Body>
        </BpkCardV2.Root>
      </div>
    ))}
  </div>
);

const SplitLayoutExample = () => (
  <div className={getClassName('bpk-card-v2-examples__wide-card-wrapper')}>
    <BpkCardV2.Root>
      <BpkCardV2.Body split splitRatio={70}>
        <BpkCardV2.Primary>
          <Placeholder label="Primary (70%)" />
        </BpkCardV2.Primary>
        <BpkCardV2.Secondary>
          <Placeholder label="Secondary (30%)" />
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
    </BpkCardV2.Root>
  </div>
);

const CustomPaddingExample = () => (
  <div className={getClassName('bpk-card-v2-examples__grid')}>
    <div className={getClassName('bpk-card-v2-examples__card-wrapper')}>
      <BpkCardV2.Root variant="outlined">
        <BpkCardV2.Header padding="lg">
          <BpkText textStyle={TEXT_STYLES.heading5} tagName="h3">
            Large padding
          </BpkText>
        </BpkCardV2.Header>
        <BpkCardV2.Body padding="sm">
          <BpkText>Small body padding.</BpkText>
        </BpkCardV2.Body>
        <BpkCardV2.Footer padding="none">
          <BpkText textStyle={TEXT_STYLES.caption}>No footer padding.</BpkText>
        </BpkCardV2.Footer>
      </BpkCardV2.Root>
    </div>
    <div className={getClassName('bpk-card-v2-examples__card-wrapper')}>
      <BpkCardV2.Root variant="outlined">
        <BpkCardV2.Header
          padding={{ vertical: 'sm', horizontal: 'xl' }}
        >
          <BpkText textStyle={TEXT_STYLES.heading5} tagName="h3">
            Mixed padding
          </BpkText>
        </BpkCardV2.Header>
        <BpkCardV2.Body
          padding={{ top: 'base', bottom: 'lg', start: 'xl', end: 'xl' }}
        >
          <BpkText>Individual side padding.</BpkText>
        </BpkCardV2.Body>
      </BpkCardV2.Root>
    </div>
  </div>
);

type InteractiveExampleProps = {
  variant?: BpkCardV2Variant;
  bgColor?: BpkCardV2SurfaceColor;
  padding?: BpkCardV2PaddingSize;
  split?: boolean;
  splitRatio?: number;
  showHeader?: boolean;
  showFooter?: boolean;
};

const InteractiveExample = ({
  bgColor = 'surfaceDefault',
  padding = 'base',
  showFooter = true,
  showHeader = true,
  split = false,
  splitRatio = 70,
  variant = 'default',
}: InteractiveExampleProps) => (
  <div className={getClassName('bpk-card-v2-examples__wide-card-wrapper')}>
    <BpkCardV2.Root variant={variant} bgColor={bgColor}>
      {showHeader && (
        <BpkCardV2.Header padding={padding}>
          <BpkText textStyle={TEXT_STYLES.heading4} tagName="h3">
            Card Header
          </BpkText>
        </BpkCardV2.Header>
      )}
      <BpkCardV2.Body split={split} splitRatio={splitRatio} padding={padding}>
        {split ? (
          <>
            <BpkCardV2.Primary>
              <Placeholder label="Primary area" />
            </BpkCardV2.Primary>
            <BpkCardV2.Secondary>
              <Placeholder label="Secondary area" />
            </BpkCardV2.Secondary>
          </>
        ) : (
          <BpkText>
            This is the card body content. Adjust the controls to see how the
            card responds to different prop combinations.
          </BpkText>
        )}
      </BpkCardV2.Body>
      {showFooter && (
        <BpkCardV2.Footer padding={padding}>
          <BpkText textStyle={TEXT_STYLES.caption}>Card Footer</BpkText>
        </BpkCardV2.Footer>
      )}
    </BpkCardV2.Root>
  </div>
);

const AllExamples = () => (
  <div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Default
      </BpkText>
      <DefaultExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Variants
      </BpkText>
      <VariantsExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Surface Colors
      </BpkText>
      <SurfaceColorsExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Split Layout
      </BpkText>
      <SplitLayoutExample />
    </div>
    <div className={getClassName('bpk-card-v2-examples__section')}>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
        Custom Padding
      </BpkText>
      <CustomPaddingExample />
    </div>
  </div>
);

export {
  DefaultExample,
  VariantsExample,
  SurfaceColorsExample,
  SplitLayoutExample,
  CustomPaddingExample,
  InteractiveExample,
  AllExamples,
};
