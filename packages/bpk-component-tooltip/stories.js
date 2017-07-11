import React from 'react';
import { storiesOf } from '@storybook/react';
import BpkHeading from 'bpk-component-heading';
import { spacingSm, colorGreen500 } from 'bpk-tokens/tokens/base.es6';
import BpkTooltip from './index';

const st = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  margin: '30px',
  textAlign: 'center',
};

storiesOf('bpk-component-tooltip', module)
  .add('Default', () => (
    <div style={st}>
      <BpkTooltip
        id="my-tooltip"
        target={<BpkHeading level="h1">£295</BpkHeading>}
      >
        This is the cheapest price! 👍
      </BpkTooltip>
    </div>
  ))
  .add('On the side', () => (
    <div style={st}>
      <BpkTooltip
        id="my-tooltip"
        target={<BpkHeading level="h1">£295</BpkHeading>}
        tetherOptions={{
          attachment: 'middle left',
          constraints: [
            {
              to: 'window',
              attachment: 'together',
              pin: true,
            },
          ],
        }}
      >
        This is the cheapest price! 👍
      </BpkTooltip>
    </div>
  ))
  .add('Custom content', () => (
    <div style={{ height: '500px', margin: '30px', textAlign: 'center' }}>
      <BpkTooltip
        id="my-tooltip"
        target={<BpkHeading level="h1">£295</BpkHeading>}
        padded={false}
      >
        <div
          style={{
            borderBottomWidth: '5px',
            borderBottomColor: colorGreen500,
            borderBottomStyle: 'solid',
            padding: spacingSm,
          }}
        >
          This is the cheapest price!
        </div>
      </BpkTooltip>
    </div>
  ))
  .add('On a link', () => (
    <div style={st}>
      <BpkTooltip
        id="my-tooltip"
        target={<a href="//skyscanner.net" target="_blank" rel="noopener noreferrer">Click me!</a>}
      >
        Find cheap flights here! ✈️
      </BpkTooltip>
    </div>
  ));
