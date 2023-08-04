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

/* @flow strict */

import { surfaceContrastDay,
  // lineHeightBase, iconSizeSm
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import {
  BpkAccordion,
  BpkAccordionItem,
  withSingleItemAccordionState,
} from '../../packages/bpk-component-accordion';
// import { withAlignment } from '../../packages/bpk-component-icon';
// import StopsIcon from '../../packages/bpk-component-icon/sm/stops';
import { Default as BpkCheckbox } from '../bpk-component-checkbox/stories';
// import { Default as BpkText } from '../bpk-component-text/stories';

const SingleItemAccordion = withSingleItemAccordionState(BpkAccordion);
// const MultipleAccordionItem = withAccordionItemState(BpkAccordionItem);

// const AlignedStopsIcon = withAlignment(StopsIcon, lineHeightBase, iconSizeSm);

export default {
  title: 'bpk-component-accordion',
  component: BpkAccordion,
};

const SingleItemAccordionTemplate = {
  render: ({ Content = BpkCheckbox, accordionItems, divider = true, fontSize = '16px', onDark = false }) => {
    document.documentElement.style.fontSize = fontSize;
    return (
      <div style={onDark ? {background: surfaceContrastDay, padding: '1rem'} : null}>
      <SingleItemAccordion onDark={onDark} divider={divider}>
        {accordionItems.map((item) => (
          <BpkAccordionItem {...item}>
            <Content />
          </BpkAccordionItem>
        ))}
      </SingleItemAccordion>
      </div>
    );
  },
};

// const MultiItemAccordionTemplate = {
//   render: ({ accordionItems, Content = BpkCheckbox, onDark = false, divider = true, fontSize = '16px' }) => {
//     document.documentElement.style.fontSize = fontSize;
//     return (
//       <div style={onDark ? {background: surfaceContrastDay, padding: '1rem'} : null}>
//       <BpkAccordion onDark={onDark} divider={divider}>
//         {accordionItems.map((item) => (
//           <MultipleAccordionItem {...item}>
//             <Content />
//           </MultipleAccordionItem>
//         ))}
//       </BpkAccordion>
//       </div>
//     );
//   },
// };

export const SingleItemAccordionDefaultExample = {
  ...SingleItemAccordionTemplate,
  args: {
    accordionItems: [{
      id: 1,
      title: 'bla',
      initiallyExpanded: true
    },
    {
      id: 2,
      title: 'blabla',
    }]
  }
}

// export const SingleItemOnlySecondItemInitiallyExpanded = {
//   ...SingleItemAccordionTemplate,
//   args: {
//     accordionItems: [{
//       id: 1,
//       title: 'bla',
//     },
//     {
//       id: 2,
//       title: 'blabla',
//       initiallyExpanded: true
//     }]
//   }
// }

// export const CustomTitleTextStyle = {
//   ...SingleItemAccordionTemplate,
//   args: {
//     accordionItems: [{
//       id: 1,
//       title: 'bla',
//       textStyle: 'heading-2'
//     },
//     {
//       id: 2,
//       title: 'blabla',
//       initiallyExpanded: true
//     }]
//   }
// }

export const WithDarkBackground = {
  ...SingleItemAccordionTemplate,
  args: {
    accordionItems: [{
      id: 1,
      title: 'bla',
      initiallyExpanded: true
    },
    {
      id: 2,
      title: 'blabla',
    }],
    onDark: true
  },
}

// export const WithContent = {
//   ...SingleItemAccordionTemplate,
//   args: {
//     accordionItems: [{
//       id: 1,
//       title: 'bla',
//       initiallyExpanded: true
//     },
//     {
//       id: 2,
//       title: 'blabla',
//     }],
//     Content: BpkText
//   },
// }

// export const WithIcons = {
//   ...SingleItemAccordionTemplate,
//   args: {
//     accordionItems: [{
//       id: 1,
//       title: 'bla',
//       icon: <AlignedStopsIcon fill={'red'} />
//     },
//     {
//       id: 2,
//       title: 'blabla',
//       initiallyExpanded: true
//     }]
//   }
// }

// export const WithoutDivider = {
//   ...SingleItemAccordionTemplate,
//   args: {
//     accordionItems: [{
//       id: 1,
//       title: 'bla',
//       initiallyExpanded: true
//     },
//     {
//       id: 2,
//       title: 'blabla',
//     }],
//     divider: false
//   }
// }

// export const MultipleItemsOpen = {
//   ...MultiItemAccordionTemplate,
//   args: {
//     accordionItems: [{
//       id: 1,
//       title: 'bla',
//       icon: <AlignedStopsIcon fill={'red'} />
//     },
//     {
//       id: 2,
//       title: 'blabla',
//     }]
//   }
// }

// export const MultipleItemsOpenSecondThirdItemsInitiallyExpanded = {
//   ...MultiItemAccordionTemplate,
//   args: {
//     accordionItems: [{
//       id: 1,
//       title: 'bla',
//       initiallyExpanded: true
//     },
//     {
//       id: 2,
//       title: 'blabla',
//       initiallyExpanded: true
//     }]
//   }
// }

export const WithZoomEnabled = {
  ...SingleItemAccordionTemplate,
  args: {
    accordionItems: [{
      id: 1,
      title: 'bla',
      initiallyExpanded: true
    },
    {
      id: 2,
      title: 'blabla',
    }],
    fontSize: '32px'
  },
}


export const VisualTest = SingleItemAccordionDefaultExample;
VisualTest.parameters = {
  percy: {
    name: 'Visual Test',
    additionalSnapshots: [
      { suffix: ' on Dark', args: { onDark: true }},
      { suffix: ' with Zoom Enabled', args: { fontSize: '32px' }}
    ]
  }
}
// export const VisualTestOnDark = WithDarkBackground;
// export const VisualTestZoomEnabled = WithZoomEnabled;
